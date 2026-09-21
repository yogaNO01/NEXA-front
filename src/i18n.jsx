import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import platformEnglishCopy from './data/platformCopy.en.js';
import { unwrapApiText } from './api/apiText.js';

const STORAGE_KEY = 'nexa-locale';

// Keep display strings in one place. Dynamic content from the CMS deliberately
// stays untouched: it is authored content and must be translated before publish.
const messages = {
  zh: {
    '首页': '首页', '平台': '平台', '解决方案': '解决方案', '开发者': '开发者', '服务与支持': '服务与支持', '关于我们': '关于我们',
    '合作咨询': '合作咨询', '立即了解': '立即了解', '查看平台能力': '查看平台能力', '预约方案沟通': '预约方案沟通',
    '产品开发': '产品开发', 'App 开发': 'App 开发', '云开发': '云开发', 'AI 能力': 'AI 能力',
    '新闻中心': '新闻中心', '帮助中心': '帮助中心', '联系我们': '联系我们', '提交合作需求': '提交合作需求',
    '提交技术工单': '提交技术工单', '返回解决方案': '返回解决方案', '联系方案专家': '联系方案专家',
    '了解更多 →': '了解更多 →', '查看方案 →': '查看方案 →', '查看全部 →': '查看全部 →', '查看详情 →': '查看详情 →',
    '正在读取内容…': '正在读取内容…', '暂无已发布内容。': '暂无已发布内容。', '暂无已发布新闻。': '暂无已发布新闻。',
    '暂无已发布案例。': '暂无已发布案例。', '确认': '确认', '关闭提示': '关闭提示', '公司名称': '公司名称', '联系人': '联系人',
    '联系方式': '联系方式', '项目需求': '项目需求', '提交咨询': '提交咨询', '正在提交…': '正在提交…',
  },
  en: {
    ...platformEnglishCopy,
    '首页': 'Home', '平台': 'Platform', '解决方案': 'Solutions', '开发者': 'Developers', '服务与支持': 'Support', '关于我们': 'About',
    '合作咨询': 'Talk to us', '立即了解': 'Explore now', '查看平台能力': 'Explore platform', '预约方案沟通': 'Book a consultation',
    '产品开发': 'Product Development', 'App 开发': 'App Development', '云开发': 'Cloud Development', 'AI 能力': 'AI Capabilities',
    '新闻中心': 'Newsroom', '帮助中心': 'Help Center', '联系我们': 'Contact us', '提交合作需求': 'Submit an enquiry',
    '提交技术工单': 'Submit a support ticket', '返回解决方案': 'Back to solutions', '联系方案专家': 'Talk to a solutions expert',
    '了解更多 →': 'Learn more →', '查看方案 →': 'View solution →', '查看全部 →': 'View all →', '查看详情 →': 'View details →',
    '正在读取内容…': 'Loading content…', '暂无已发布内容。': 'No published content yet.', '暂无已发布新闻。': 'No published news yet.',
    '暂无已发布案例。': 'No published case studies yet.', '确认': 'Confirm', '关闭提示': 'Close notification', '公司名称': 'Company name', '联系人': 'Contact name',
    '联系方式': 'Phone or email', '项目需求': 'Project requirements', '提交咨询': 'Submit enquiry', '正在提交…': 'Submitting…',
    '连接现场设备': 'Connect real-world devices', '驱动真实业务': 'Power real business',
    '面向智能硬件、商业空间与制造现场，提供设备接入、边缘网关、云平台、移动应用和 AI 服务。从产品研发到项目交付，以统一技术底座支撑规模化运营。': 'For smart hardware, commercial spaces, and industrial sites, we provide device connectivity, edge gateways, cloud platforms, mobile apps, and AI services. A unified technology foundation supports every stage, from product development to project delivery.',
    '一套完整的智能化技术底座': 'One complete intelligent technology foundation',
    '从设备端、移动端到云端和运营层，提供可按需组合的模块化能力。': 'Modular capabilities spanning devices, mobile, cloud, and operations—composed to fit your needs.',
    '面向不同业务场景构建专属方案': 'Purpose-built solutions for every business scenario',
    '每个行业都有独立的软件产品、架构、场景能力与服务模式。': 'Every industry has its own software products, architecture, scenarios, and service model.',
    '面向开发者的完整工程体系': 'A complete engineering system for developers',
    '项目现场与行业实践': 'Projects in the field', '最新动态': 'Latest updates',
    '选择您的行业': 'Choose your industry', '浏览行业方案': 'Browse industry solutions',
    '联系解决方案专家': 'Talk to a solutions expert', '已发布方案': 'Published solutions', '业务组件': 'Business components', '统一架构': 'Unified architecture',
    '平台全部能力': 'All platform capabilities', '开始产品开发': 'Start product development', '开发者文档': 'Developer documentation',
    '一套完整的': 'A complete', '智能化技术体系': 'intelligent technology system',
    '覆盖产品开发、App 开发、云开发、AI、运营与增值服务，从设备端到云端与业务应用按需组合。': 'Covering product, app, cloud, AI, operations, and value-added services—from devices to cloud and business applications.',
    '16 个独立页面，覆盖从产品定义到持续运营的完整路径。': 'Sixteen focused pages cover the complete journey from product definition to continuous operations.',
    '完整接入与交付能力': 'Complete connectivity and delivery capabilities', '覆盖完整的开发、连接、管理与运营链路。': 'Covering the full development, connectivity, management, and operations lifecycle.',
    '分层技术架构': 'Layered technical architecture', '典型应用场景': 'Typical use cases', '标准交付流程': 'Standard delivery process',
    '能力与服务明细': 'Capabilities and service details', '可持续追踪的业务指标': 'Business metrics for continuous tracking',
    '选择适合的能力组合，开始下一步项目沟通。': 'Choose the right combination of capabilities and start the next project conversation.',
    '核心产品能力': 'Core product capabilities', '技术架构': 'Technical architecture', '应用场景': 'Use cases', '交付流程': 'Delivery process', '服务明细': 'Service details',
    '核心运营指标': 'Core operating metrics', '产品与能力': 'Products and capabilities', '方案优势': 'Solution advantages', '核心业务场景': 'Core business scenarios',
    '项目流程': 'Project process', '常见问题': 'Frequently asked questions',
    '服务状态': 'Service status', '正常运行': 'Operational', '认证服务': 'Certification services', '热门操作指南': 'Popular guides',
    '搜索': 'Search', '搜索帮助内容': 'Search help content', '仍需技术支持': 'Need technical support?',
    '快速找到产品使用': 'Find answers for product use', '与项目交付答案': 'and project delivery',
    '返回平台': 'Back to platform', '查看帮助中心': 'Visit Help Center', '继续浏览': 'Keep exploring',
    '页面不存在': 'Page not found', '请从导航继续浏览。': 'Please continue from the navigation.',
    '提交需求': 'Submit request', '提交工单': 'Submit ticket', '正在读取新闻…': 'Loading news…',
    '需求提交成功！': 'Enquiry submitted successfully!', '我们已收到你的合作需求，会尽快与你联系。': 'We have received your enquiry and will be in touch soon.',
    '隐私政策 · 服务条款 · 安全与合规': 'Privacy · Terms · Security & compliance',
    'NEXA 智联科技': 'NEXA Intelligence Technology', '平台服务可用性目标': 'Platform availability target', '标准设备与业务组件': 'Standard device and business components',
    '生产项目技术保障': 'Production project technical support', '主流边缘与工业协议': 'Mainstream edge and industrial protocols',
    '查看完整方案 ↗': 'View full solution ↗', '行业解决方案': 'Industry solution', '客户案例': 'Customer case study', '新闻动态': 'News',
    '内容由运营后台发布后自动同步至此。': 'Content published in the operations console is automatically synchronized here.',
    '内容由运营后台设置为热门后自动同步至此。': 'Content marked as popular in the operations console is synchronized here automatically.',
    '从业务应用到设备连接，形成清晰、可扩展的能力边界。': 'From business applications to device connectivity, establish clear and scalable capability boundaries.',
    '将产品能力放进真实业务流程，形成可复用的交付路径。': 'Apply product capabilities to real workflows and create reusable delivery paths.',
    '通过明确的阶段目标和交付物，确保方案可验证、可上线、可运维。': 'Clear phase goals and deliverables keep the solution verifiable, launch-ready, and maintainable.',
    '按实际业务需求选择并组合相应能力。': 'Select and combine capabilities according to your business needs.',
    '以统一指标观察产品、设备和用户的持续价值。': 'Use consistent metrics to understand the ongoing value of products, devices, and users.',
    '每个行业均采用统一内容模型和独立业务配置。': 'Each industry uses a shared content model with its own business configuration.',
    '支撑从研发、连接到持续运营的完整工程能力。': 'Complete engineering capabilities from development and connectivity through ongoing operations.',
    '展示所有已发布解决方案。': 'Browse all published solutions.', '以真实项目沉淀行业实践与可复用的运营路径。': 'Real projects inform reusable industry practices and operating paths.',
    '持续发布产品能力更新、行业实践与技术工程经验。': 'Continuous updates on product capabilities, industry practice, and engineering expertise.',
    '为企业研发、项目交付和持续运营提供清晰的标准能力入口。': 'Clear, standardized capabilities for enterprise R&D, delivery, and ongoing operations.',
    '围绕真实业务场景组织产品能力、工程实践和服务流程。': 'Organize product capabilities, engineering practice, and services around real business scenarios.',
    '以标准模块连接行业现场和真实业务流程。': 'Connect industry sites and real business workflows with standard modules.',
    '围绕业务实际需求形成可度量、可扩展的交付结果。': 'Create measurable and scalable delivery outcomes around real business needs.',
    '让设备、人员与运营流程形成闭环。': 'Create a closed loop across devices, people, and operations.',
    '明确阶段目标与交付物，确保方案可落地。': 'Define phase goals and deliverables to ensure a deployable solution.',
    '明确阶段目标与交付物，形成可持续运营的实施路径。': 'Define phase goals and deliverables to establish a sustainable implementation path.',
    '行业现场 · 设备接入 · 运营管理': 'Industry sites · Device connectivity · Operations management', '业务场景 · 系统联动': 'Business scenarios · System orchestration',
    '快速接入': 'Fast onboarding', '实时状态': 'Real-time status', '自动联动': 'Automated orchestration', '持续运营': 'Ongoing operations',
    '标准能力': 'Standard capabilities', '开放接口': 'Open APIs', '安全治理': 'Security governance',
    '提供标准化接入、配置与运营支持。': 'Provides standardized onboarding, configuration, and operations support.',
    '研发、项目交付与持续服务': 'R&D, project delivery, and ongoing services',
    '从产品测试到市场准入': 'From product testing to market access', '缩短认证与上市周期': 'Shorten certification and time to market',
    '申请认证评估': 'Request a certification assessment', '查看认证范围': 'View certification scope', '认证服务矩阵': 'Certification service matrix',
    '主流认证覆盖': 'Main certification coverage', '从评估到取证的完整流程': 'Complete process from assessment to certification',
    '服务响应分级': 'Service response levels', '服务状态': 'Service status', '展示核心平台服务运行情况与计划维护窗口。': 'View core platform service health and scheduled maintenance windows.',
    '设备连接服务': 'Device connectivity', '消息队列': 'Message queue', 'App 推送服务': 'App push service', '设备日志服务': 'Device log service', '实时音视频': 'Real-time audio and video',
    '中国大陆 / 亚太 / 欧洲 / 北美': 'Mainland China / APAC / Europe / North America', '全球多区域': 'Global multi-region', '全球': 'Global',
    '暂无热门帮助文章。': 'No popular help articles yet.', '没有匹配的帮助文章。': 'No matching help articles.', '正在读取帮助内容…': 'Loading help content…',
    '搜索：设备离线、配网失败、API 权限、固件升级…': 'Search: offline devices, setup failures, API permissions, firmware updates…',
    '新项目快速开始': 'Quick start for a new project', '查看专题 →': 'View topic →', '帮助文章': 'Help article',
    '合作类型': 'Cooperation type', '需求类型': 'Request type', '问题级别': 'Issue severity', '手机 / 邮箱': 'Phone / email',
    '请描述问题现象、影响范围和复现步骤': 'Describe the issue, impact, and steps to reproduce it.', '请描述项目背景、预计规模与计划时间': 'Describe the project background, expected scope, and timeline.',
    '提交失败，请稍后重试。': 'Submission failed. Please try again later.', 'P3 一般问题': 'P3 General issue', 'P2 关键功能异常': 'P2 Key feature issue', 'P1 生产故障': 'P1 Production incident',
    '智能产品开发': 'Smart product development', '设备操作系统': 'Device operating system', 'MCU 标准协议接入': 'MCU standard protocol integration',
    '网关与子设备接入': 'Gateway and sub-device integration', '智能小程序': 'Smart mini program', '设备面板开发': 'Device panel development',
    '设备日志服务': 'Device log service', '数据分析服务': 'Data analytics service', 'SaaS 开发框架': 'SaaS development framework',
    '运营增长': 'Growth operations', '增值服务': 'Value-added services', 'NEXA Core': 'NEXA Core',
    '零代码、MCU、设备 OS 与网关接入，覆盖从产品定义到量产。': 'No-code, MCU, device OS, and gateway connectivity—from product definition through mass production.',
    '跨芯片、组件化、可裁剪的 NEXA 设备开发框架。': 'A cross-chip, modular, and configurable NEXA device development framework.',
    '保留既有主控，通过标准协议快速完成设备联网。': 'Keep your existing controller and connect devices quickly with standard protocols.',
    '多协议接入、本地自动化和边缘协同管理。': 'Multi-protocol connectivity, local automation, and coordinated edge management.',
    '通过品牌 App、SDK、业务组件与小程序服务终端用户。': 'Serve end users through branded apps, SDKs, business components, and mini programs.',
    '账号、家庭、设备、场景与消息能力的移动端集成方案。': 'A mobile integration solution for accounts, homes, devices, scenarios, and messaging.',
    '扫码即用的设备控制、服务与轻量业务入口。': 'Scan-to-use device control, service access, and lightweight business entry points.',
    '可视化构建设备控制页面，并完成 DP 绑定与真机预览。': 'Visually build device control pages with DP binding and real-device preview.',
    '以开放 API、设备连接和数据服务构建行业应用。': 'Build industry applications with open APIs, device connectivity, and data services.',
    '设备身份、消息、控制、影子和事件通知的核心服务。': 'Core services for device identity, messaging, control, shadows, and event notifications.',
    '采集、检索与聚合关键链路，支持远程问题诊断。': 'Collect, search, and aggregate key traces to support remote diagnostics.',
    '指标、趋势、漏斗和分群，帮助持续优化产品运营。': 'Metrics, trends, funnels, and segmentation for continuously improving operations.',
    '将大模型、语音、视觉和智能体接入设备与行业应用。': 'Bring LLMs, voice, vision, and agents into devices and industry applications.',
    '组织、权限、设备、告警、工单和数据看板基础组件。': 'Foundation components for organizations, permissions, devices, alerts, tickets, and dashboards.',
    '以用户、设备、内容和商业化工具支撑持续增长。': 'Use users, devices, content, and commercialization tools to support continuous growth.',
    '认证、语音、云存储、消息与商业化服务能力。': 'Certification, voice, cloud storage, messaging, and commercialization capabilities.',
    '平台能力': 'Platform capabilities', '从设备接入、边缘协同到云端应用，提供可组合的 NEXA 技术底座。': 'A composable NEXA technology foundation from device onboarding and edge coordination to cloud applications.',
    '文档、SDK、工具和示例工程，帮助团队加速交付。': 'Documentation, SDKs, tools, and sample projects to help teams deliver faster.',
    '从产品创建到设备、App 和云服务开发的完整文档体系。': 'Complete documentation from product creation through device, app, and cloud-service development.',
    '从设备工程、调试到云 API 测试的完整工具链。': 'A complete toolchain from device engineering and debugging to cloud API testing.',
    '技术交流、案例、文章和开发实践。': 'Technical discussions, case studies, articles, and development practices.',
    '面向设备、App 和云服务提供可运行示例。': 'Runnable examples for devices, apps, and cloud services.',
    '帮助中心、技术支持、认证服务与生态合作入口。': 'Entry points for help, technical support, certification, and ecosystem partnerships.',
    '覆盖产品监管、生态接入和互联互通认证，支持从评估到取证的完整流程。': 'Product regulation, ecosystem integration, and interoperability certification—from assessment to certification.',
    '连接硬件厂商、方案商、软件开发者和服务商，共同交付行业智能化项目。': 'Connect hardware vendors, solution providers, developers, and service providers to deliver intelligent industry projects.',
    '连接设备、空间与业务，让智能化可持续运营。': 'Connect devices, spaces, and business so intelligence can operate sustainably.',
    '让连接、云和 AI 能力成为企业构建智能产品的基础设施。': 'Make connectivity, cloud, and AI the infrastructure for building smart products.',
    '寻找热爱设备、云平台、AI 和行业数字化的研发与业务人才。': 'We are looking for R&D and business talent passionate about devices, cloud platforms, AI, and industry digitalization.',
    '围绕账号、设备接入、App、云服务和认证量产整理操作指南。': 'Guides for accounts, device onboarding, apps, cloud services, certification, and mass production.',
    '安全、合规、隐私与稳定性构成企业级平台的底线。': 'Security, compliance, privacy, and reliability form the baseline for an enterprise platform.',
    '从设备身份、固件、传输、云端访问控制到安全运营构建多层防护。': 'Build multi-layer protection from device identity, firmware, and transport to cloud access control and security operations.',
    '围绕数据区域、隐私法规、信息安全和产品合规建立持续治理体系。': 'Establish continuous governance for data regions, privacy regulations, information security, and product compliance.',
    '通过数据最小化、授权、隔离、访问控制和生命周期管理保护用户和企业数据。': 'Protect user and enterprise data through minimization, authorization, isolation, access control, and lifecycle management.',
    '从真实业务需求开始一次沟通。': 'Start with a conversation about your real business needs.', '问题有记录、过程可追踪、结论可复盘。': 'Issues are recorded, progress is traceable, and conclusions are reviewable.',
    '让我们从真实业务需求\n开始一次沟通': 'Let’s start with your real\nbusiness needs', '从问题定位到上线保障\n覆盖项目全生命周期': 'From issue diagnosis to launch assurance\nacross the project lifecycle',
    '模块化能力体系': 'Modular capability system', '面向研发、项目交付与持续运营，提供清晰可用的标准能力入口。': 'Clear, usable standard capability entry points for R&D, delivery, and ongoing operations.',
    '业务合作': 'Business partnerships', '技术服务': 'Technical services', '工作日 09:00–18:00': 'Weekdays 09:00–18:00',
    '产品智能化': 'Product intelligence', '行业方案': 'Industry solutions', '生态合作': 'Ecosystem partnerships', '媒体合作': 'Media partnerships',
    '设备开发': 'Device development', '云服务': 'Cloud services', '账号与权限': 'Accounts and permissions',
    '零代码开发': 'No-code development', 'MCU 低代码开发': 'MCU low-code development', '设备 OS 开发': 'Device OS development', '网关/子设备开发': 'Gateway / sub-device development',
    '创建产品': 'Create product', '功能定义': 'Define features', '硬件开发': 'Hardware development', '配置与量产': 'Configure and manufacture',
    '电工照明': 'Electrical and lighting', '大小家电': 'Large and small appliances', '安防传感': 'Security and sensing', '节能能源': 'Energy efficiency',
    '体验开发': 'Try development', '跨平台': 'Cross-platform', '可裁剪': 'Configurable', '低代码': 'Low-code', '安全合规': 'Security and compliance',
    '业务子系统': 'Business subsystems', 'NEXA 中间件': 'NEXA middleware', '系统抽象层': 'System abstraction layer', '芯片与连接': 'Chips and connectivity',
    '联网单品': 'Connected devices', '网关中控': 'Gateway control center', '开始接入': 'Start integration',
    '主控负责产品业务，联网模组负责网络、云连接和安全能力；双方通过标准串口协议通信。': 'The main controller handles product logic while the connectivity module provides network, cloud, and security functions; they communicate over a standard serial protocol.',
    '产品信息': 'Product information', 'DP 数据': 'DP data', '网络状态': 'Network status', '时间服务': 'Time service', '产测': 'Production testing',
    '定义功能': 'Define functions', '生成协议': 'Generate protocol', '联调开发': 'Integration development', '测试量产': 'Test and manufacture',
    '开始网关开发': 'Start gateway development', '多模网关': 'Multi-mode gateway', 'Matter 网关': 'Matter gateway', '中控主机': 'Central controller', '低功耗子设备': 'Low-power sub-device',
    '业务应用': 'Business application', '云平台': 'Cloud platform', '边缘网关': 'Edge gateway', '子设备': 'Sub-device', '本地自动化': 'Local automation', '协议桥接': 'Protocol bridging', '批量运维': 'Batch operations',
    '开始 App 开发': 'Start app development', '自研品牌 App': 'Custom branded app', 'UI 业务包': 'UI business package', '品牌应用层': 'Brand application layer',
    '业务组件层': 'Business component layer', 'SDK 能力层': 'SDK capability layer', '云与设备': 'Cloud and devices', '设备连接': 'Device connectivity', '智能场景': 'Smart scenes', '用户运营': 'User operations', '安全与全球化': 'Security and globalization',
    '查看开发文档': 'View developer documentation', '低门槛集成': 'Low-barrier integration', '组件化开发': 'Component-based development', '功能覆盖完整': 'Complete feature coverage', '全球服务': 'Global service',
    '行业 SDK': 'Industry SDK', '基础 SDK': 'Core SDK', '通信与云': 'Connectivity and cloud', '账号与家庭': 'Accounts and homes', '设备管理': 'Device management', '场景自动化': 'Scene automation', '垂直品类': 'Vertical categories',
    '开始小程序开发': 'Start mini-program development', '扫码即用': 'Scan and use', '轻量控制': 'Lightweight control', '服务触达': 'Service reach', '品牌轻应用': 'Branded lightweight app',
    '小程序页面': 'Mini-program pages', '业务服务': 'Business services', '开放 SDK': 'Open SDK', 'NEXA 云与设备': 'NEXA cloud and devices', '设备快捷控制': 'Quick device control', '售后服务': 'After-sales service', '门店与展厅': 'Stores and showrooms', '临时授权': 'Temporary authorization',
    '开始设备面板开发': 'Start device panel development', '模板化开发': 'Template-based development', '可视化搭建': 'Visual building', '自定义开发': 'Custom development', '多端适配': 'Multi-platform adaptation',
    '选择模板': 'Choose template', '绑定功能': 'Bind features', '预览调试': 'Preview and debug', '发布运营': 'Publish and operate', '标准品类控制': 'Standard category control', '复杂设备交互': 'Complex device interaction', '视频与安防': 'Video and security', '服务入口': 'Service entry point',
    '进入云开发': 'Enter cloud development', '开放能力': 'Open capabilities', 'NEXA 平台': 'NEXA platform', '设备与边缘': 'Devices and edge', '设备运营平台': 'Device operations platform', '行业 SaaS': 'Industry SaaS', '数据服务': 'Data services', '系统集成': 'System integration',
    '查看 API': 'View API', '设备身份': 'Device identity', '消息通道': 'Messaging channel', '设备影子': 'Device shadow', '事件通知': 'Event notification', '业务系统': 'Business systems', '设备 API': 'Device API', '产品模型': 'Product model', '物理设备': 'Physical device',
    '设备上报': 'Device reporting', '云端解析': 'Cloud processing', '状态存储': 'State storage', '业务分发': 'Business distribution',
    '体验日志服务': 'Try log service', '多条件检索': 'Multi-condition search', '链路追踪': 'Trace tracking', '错误聚合': 'Error aggregation', '日志导出': 'Log export', '激活与配网': 'Activation and provisioning', '在线与心跳': 'Online and heartbeat', 'DP 通信': 'DP communication',
    '确定设备与时间': 'Identify device and time', '筛选关键链路': 'Filter key traces', '关联版本与区域': 'Associate versions and regions', '形成结论': 'Form conclusion',
    '查看数据能力': 'View data capabilities', '在线率': 'Online rate', '留存': 'Retention', '转化': 'Conversion', '趋势分析': 'Trend analysis', '漏斗分析': 'Funnel analysis', '用户分群': 'User segmentation', '留存分析': 'Retention analysis', '产品迭代': 'Product iteration', '设备运营': 'Device operations',
    '开始 AI 开发': 'Start AI development', '大模型对话': 'LLM conversation', '语音交互': 'Voice interaction', '视觉理解': 'Visual understanding', '设备智能体': 'Device agent', '智能应用': 'Intelligent application', '智能体层': 'Agent layer', '模型层': 'Model layer', 'NEXA 层': 'NEXA layer',
    'AI 家居助手': 'AI home assistant', 'AI 看护': 'AI care', 'AI 客服': 'AI customer service', '行业 Copilot': 'Industry copilot', '选择 AI 能力': 'Choose AI capabilities', '绑定设备工具': 'Bind device tools', '配置知识与安全': 'Configure knowledge and security', '联调与评估': 'Integration and evaluation',
    '开始 SaaS 开发': 'Start SaaS development', '行业应用': 'Industry application', '业务微应用': 'Business micro-app', '平台基础': 'Platform foundation', '组织与权限': 'Organization and permissions', '设备中心': 'Device center', '告警中心': 'Alert center', '工单中心': 'Ticket center', '公有云 SaaS': 'Public-cloud SaaS', '专属实例': 'Dedicated instance', '私有化部署': 'Private deployment',
    '咨询运营方案': 'Discuss an operations solution', '数据智能运营': 'Data-driven operations', '消息触达': 'Messaging outreach', 'App 商城': 'App marketplace', '内容运营': 'Content operations', '首次激活': 'First activation', '持续使用': 'Continued use', '服务运营': 'Service operations', '召回与增长': 'Re-engagement and growth', '激活率': 'Activation rate',
    '咨询服务': 'Consult services', '互联认证': 'Interoperability certification', '语音技能': 'Voice skills', '云存储': 'Cloud storage', '商业化服务': 'Commercialization services', '智能门铃': 'Smart doorbell', '智能家电': 'Smart appliances', '能源设备': 'Energy equipment', '品牌 App': 'Branded app',
    '产品监管认证': 'Product regulatory certification', '根据销售区域和无线能力梳理适用标准。': 'Identify applicable standards based on sales regions and wireless capabilities.', 'RoHS / REACH 等环保要求': 'Environmental requirements such as RoHS / REACH', '样品、资料与整改建议': 'Samples, documentation, and corrective-action recommendations',
    '生态接入认证': 'Ecosystem integration certification', '验证跨品牌、跨生态互联体验。': 'Validate cross-brand and cross-ecosystem interoperability.', 'Matter 互联互通测试': 'Matter interoperability testing', '语音助手生态接入': 'Voice-assistant ecosystem integration', '协议一致性与兼容性': 'Protocol consistency and compatibility', '功能体验与异常场景验证': 'Feature experience and exception-scenario validation',
    '平台能力认证': 'Platform capability certification', '验证接入稳定性、安全基线和用户体验。': 'Validate integration stability, security baselines, and user experience.', '配网成功率与重连能力': 'Provisioning success rate and reconnection capability', '控制、场景与 OTA 稳定性': 'Control, scene, and OTA stability', '安全配置与日志完整性': 'Security configuration and log completeness', '认证标识与交付报告': 'Certification marks and delivery reports',
    '提交认证申请': 'Submit certification application', '填写产品信息、目标市场、无线规格与计划上市时间。': 'Provide product information, target markets, wireless specifications, and planned launch date.', '方案评估与送样': 'Solution assessment and sample submission', '确认认证项目、测试实验室和样品/模组准备要求。': 'Confirm certification items, testing labs, and sample/module preparation requirements.', '启动测试': 'Start testing', '完成法规、协议、功能与兼容性测试并闭环问题。': 'Complete regulatory, protocol, functional, and compatibility testing and close issues.', '证书与标识': 'Certificates and marks', '测试通过后交付证书、报告或互联标识使用说明。': 'After passing tests, deliver certificates, reports, or interoperability-mark usage guidance.',
    '操作主题': 'Operational topics', '排障路径': 'Troubleshooting paths', '内容更新': 'Content updates', '入': 'Start', '设': 'Setup', '云': 'Cloud', '运': 'Operate',
    '01 创建产品': '01 Create a product', '选择品类、协议与开发方式。': 'Choose a category, protocol, and development method.', '02 完成设备接入': '02 Complete device integration', '联调 DP、配网、状态上报与控制。': 'Integrate DPs, provisioning, status reporting, and control.', '03 构建用户端': '03 Build the user experience', '通过 App SDK、面板或小程序完成交互。': 'Complete interaction through the App SDK, panel, or mini program.', '04 上线与运维': '04 Launch and operate', '接入日志、告警、OTA 与服务监控。': 'Add logs, alerts, OTA, and service monitoring.',
    '平台': 'Platform', '从产品定义到规模交付': 'From product definition to scaled delivery', '覆盖设备、应用、云与 AI 的完整技术底座。': 'A complete technology foundation spanning devices, applications, cloud, and AI.', '选择您的行业方案': 'Choose your industry solution', '从设备连接到运营应用，建立可落地的业务闭环。': 'Build a practical business loop from device connectivity to operations applications.',
    '开发资源': 'Developer resources', '文档': 'Documentation', '快速入门、SDK、API 与最佳实践。': 'Quick starts, SDKs, APIs, and best practices.', 'IDE、调试助手与 API Explorer。': 'IDE, debugging assistant, and API Explorer.', '开发者社区': 'Developer community', '问答、案例与技术文章。': 'Q&A, case studies, and technical articles.', '示例工程': 'Sample projects', '快速体验典型开发流程。': 'Quickly experience a typical development workflow.', '完整工程体系': 'Complete engineering system', '帮助团队快速完成产品原型与商业化上线。': 'Help teams rapidly complete product prototypes and commercial launches.',
    '支持': 'Support', '常见操作指南与排障文章。': 'Common operating guides and troubleshooting articles.', '技术支持': 'Technical support', '开发问题与线上故障快速响应。': 'Fast response for development issues and production incidents.', '产品认证、测试与量产支持。': 'Product certification, testing, and manufacturing support.', '核心平台服务运行状态。': 'Core platform service status.', '信任与生态': 'Trust and ecosystem', '信任中心': 'Trust center', '安全、合规、隐私与稳定性。': 'Security, compliance, privacy, and reliability.', '安全体系': 'Security system', '设备到云端的多层安全。': 'Multi-layer security from devices to the cloud.', '全球合规': 'Global compliance', '区域法规与治理体系。': 'Regional regulations and governance.', '生态合作': 'Ecosystem partnerships', '服务商与方案伙伴。': 'Service and solution partners.', '7×24 技术支持': '24/7 technical support', '项目全生命周期的客户服务与技术保障。': 'Customer service and technical assurance across the project lifecycle.',
    '了解 NEXA': 'About NEXA', '使命与愿景': 'Mission and vision', '连接设备、空间与真实业务。': 'Connect devices, spaces, and real business.', '产品、技术和生态动态。': 'Product, technology, and ecosystem updates.', '商务、技术和媒体入口。': 'Business, technical, and media contacts.', '加入我们': 'Join us', '与团队共同构建智能化未来。': 'Build an intelligent future with our team.', '连接现场，驱动业务': 'Connect the field, power the business', '了解 NEXA 的产品、团队与实践。': 'Learn about NEXA products, team, and practice.',
    '从零代码、MCU 接入到设备操作系统': 'From no-code and MCU integration to device operating systems', 'App SDK、设备面板与智能小程序': 'App SDK, device panels, and smart mini programs', 'NEXA Core、开放 API、数据与音视频': 'NEXA Core, open APIs, data, and audio/video', '酒店、楼宇、办公、零售、校园、工业等': 'Hospitality, buildings, offices, retail, campuses, industry, and more',
    '文档中心': 'Documentation center', '问答、案例、技术文章与活动': 'Q&A, case studies, technical articles, and events', '技术工单': 'Technical tickets', '公司介绍': 'Company overview', '智能制造现场': 'Smart manufacturing site',
    '发布时间待补充': 'Publication date to be confirmed', '01 创建产品|选择品类、协议与开发方式。': '01 Create a product|Choose a category, protocol, and development method.', '02 完成设备接入|联调 DP、配网、状态上报与控制。': '02 Complete device integration|Integrate DPs, provisioning, status reporting, and control.', '03 构建用户端|通过 App SDK、面板或小程序完成交互。': '03 Build the user experience|Complete interaction through the App SDK, panel, or mini program.', '04 上线与运维|接入日志、告警、OTA 与服务监控。': '04 Launch and operate|Add logs, alerts, OTA, and service monitoring.',
    '开放 API': 'Open API', '亚太 / 欧洲 / 北美': 'APAC / Europe / North America', '产品能力': 'Product capabilities', '系统架构': 'System architecture', '核心场景': 'Core scenarios', '开发工具': 'Developer tools', '快速入门': 'Quick start', '设备开发 IDE': 'Device development IDE', '模组调试助手': 'Module debugging assistant', '设备日志': 'Device logs', '设备 OS 最小工程': 'Device OS starter project', 'App SDK 快速开始': 'App SDK quick start', '云 API 示例': 'Cloud API example', '设备智能体 Demo': 'Device agent demo',
    'NEXA Connected 认证': 'NEXA Connected certification', '认证流程咨询': 'Certification process consultation', '硬件伙伴': 'Hardware partners', '软件伙伴': 'Software partners', '方案伙伴': 'Solution partners', '服务伙伴': 'Service partners', '开放': 'Open', '可信': 'Trusted', '高效': 'Efficient', '全球化': 'Global', '前端工程师': 'Frontend engineer', '后端工程师': 'Backend engineer', '平台产品经理': 'Platform product manager', '解决方案顾问': 'Solutions consultant', '产品动态': 'Product updates', '行业实践': 'Industry practice', '技术洞察': 'Technical insights', '设备接入': 'Device integration', '数据隐私': 'Data privacy', '服务连续性': 'Service continuity', '应用安全': 'Application security', '云安全': 'Cloud security', '通信安全': 'Communication security', '设备安全': 'Device security', '隐私法规': 'Privacy regulations', '信息安全': 'Information security', '数据区域': 'Data regions', '产品法规': 'Product regulations', '数据最小化': 'Data minimization', '明确授权': 'Explicit authorization', '租户隔离': 'Tenant isolation', '访问控制': 'Access control',
    '1 个入口 · 多团队协同': 'One entry point · Multi-team collaboration', 'P1 · 15 分钟|生产系统不可用、大面积设备离线等重大故障。': 'P1 · 15 minutes|Critical incidents such as production-system unavailability or widespread device outages.', 'P2 · 2 小时|关键功能异常并影响核心业务流程。': 'P2 · 2 hours|Key feature issues affecting core business workflows.', 'P3 · 8 小时|一般功能问题、开发联调和配置问题。': 'P3 · 8 hours|General functionality, integration, and configuration issues.',
    '零代码、MCU 标准协议、设备操作系统和网关接入能力。': 'No-code, MCU standard protocol, device OS, and gateway connectivity capabilities.', 'App SDK、设备面板与智能小程序。': 'App SDK, device panels, and smart mini programs.', 'NEXA Core、开放 API、消息、日志、数据分析与实时音视频。': 'NEXA Core, open APIs, messaging, logs, data analytics, and real-time audio/video.', '大模型、语音、视觉与智能体能力接入智能硬件。': 'Bring LLM, voice, vision, and agent capabilities to smart hardware.',
    '产品开发总览': 'Product development overview', 'MCU 标准协议': 'MCU standard protocol', '网关与子设备': 'Gateway and sub-devices', 'App 开发总览': 'App development overview', '设备面板': 'Device panels', '云开发总览': 'Cloud development overview', '数据分析': 'Data analytics', 'AI 与增长': 'AI and growth', 'SaaS 框架': 'SaaS framework', '查看相关平台能力与应用场景。': 'Explore related platform capabilities and use cases.',
    '社': 'Community', '样': 'Samples', '帮': 'Help', '技': 'Tech', '认': 'Cert', '稳': 'Status', '信': 'Trust', '安': 'Security', '规': 'Compliance', '生': 'Partners', '使': 'Mission', '新': 'News', '联': 'Contact', '招': 'Careers', '切换为中文': 'Switch to Chinese', '快速入门、SDK、API 与最佳实践': 'Quick starts, SDKs, APIs, and best practices', 'IDE、调试助手、API Explorer': 'IDE, debugging assistant, and API Explorer', '开发问题与线上故障快速响应': 'Fast response for development issues and production incidents', '4 类': '4 types', '云 API': 'Cloud API', '核心能力': 'Core capabilities',
    '面向智能硬件、商业空间与制造现场，提供设备接入、边缘网关、云平台、移动应用和 AI 服务。': 'For smart hardware, commercial spaces, and industrial sites, we provide device onboarding, edge gateways, cloud platforms, mobile apps, and AI services.', '最新发布': 'Latest releases', '这篇新闻暂时无法查看': 'This news article is unavailable', '返回新闻中心': 'Back to newsroom', '← 新闻中心': '← Newsroom', '暂无正文内容。': 'No article body yet.',
    '让智能化真正进入': 'Bring intelligence to', '每一种业务现场': 'every business setting', '围绕空间、能源与工业场景，将设备连接、边缘协同、云端平台和业务应用组合为可落地的行业方案。': 'Combine device connectivity, edge coordination, cloud platforms, and business applications into deployable solutions for spaces, energy, and industry.', '首页 / 服务与支持 / 帮助中心': 'Home / Support / Help Center', '围绕账号、设备接入、App、云服务、服务订阅和认证量产整理操作指南、排障文章与最佳实践。': 'Guides, troubleshooting articles, and best practices for accounts, device onboarding, apps, cloud services, subscriptions, certification, and manufacturing.', '6 大知识域': '6 knowledge domains', '从快速入门到生产运维，以任务场景组织帮助内容。': 'Help content is organized by task scenario, from quick start to production operations.', '持续': 'Continuous', '从创建产品、定义功能到设备配网、App 控制与云端联调，按照标准路径完成第一个可运行原型。': 'Follow a standard path from product creation and feature definition to provisioning, app control, and cloud integration to complete your first working prototype.',
    '首页 / 信任中心 / 服务状态': 'Home / Trust Center / Service Status', '● 正常运行': '● Operational', '首页 / 服务与支持 / 认证服务': 'Home / Support / Certification Services', '面向无线与智能硬件提供监管认证、生态互联认证和平台能力验证支持，协助梳理目标市场要求、准备样品并闭环测试问题。': 'Regulatory certification, ecosystem interoperability certification, and platform validation for wireless and smart hardware—supporting target-market assessment, sample preparation, and issue closure.', '12+ 认证方向': '12+ certification tracks', '按照产品市场、无线能力和生态接入方式组合认证路径。': 'Combine certification paths according to product markets, wireless capabilities, and ecosystem integration.', '法规': 'Regulatory', '市场准入': 'Market access', '生态': 'Ecosystem', '能力验证': 'Capability validation', '从法规、生态到平台体验，覆盖智能产品上市前关键验证环节。': 'From regulation and ecosystem to platform experience, cover the key validation stages before product launch.', '实际项目根据产品形态、无线规格和目标市场评估认证清单。': 'Certification lists are assessed per project based on product form, wireless specification, and target market.',
    '首页 / NEXA': 'Home / NEXA', '端': 'Device', '设备与 OS': 'Devices and OS', '边': 'Edge', '网关与场景': 'Gateways and scenes', '平台与应用': 'Platform and applications', '产品智能化、行业方案与项目合作': 'Product intelligence, industry solutions, and project partnerships', '开发联调、生产问题与技术工单': 'Development integration, production issues, and technical tickets', '面向智能设备、商业空间与工业现场提供 NEXA 云平台、边缘接入、应用开发与行业解决方案。': 'NEXA cloud platforms, edge connectivity, application development, and industry solutions for smart devices, commercial spaces, and industrial sites.', '服务支持': 'Service support', '项目设备接入': 'Project device integrations', '行业交付模板': 'Industry delivery templates', '技术保障': 'Technical assurance', '提供文档、SDK、IDE、API Explorer、设备调试、日志诊断和示例工程，让开发团队快速完成产品原型与商业化上线。': 'Documentation, SDKs, IDE, API Explorer, device debugging, log diagnostics, and sample projects help teams quickly complete product prototypes and commercial launches.',
    '首页 / 解决方案': 'Home / Solutions', '围绕真实运营场景，将设备连接、边缘协同、云端平台和业务应用组合为可落地的行业方案。': 'Combine device connectivity, edge coordination, cloud platforms, and business applications into deployable solutions around real operating scenarios.', '端边云': 'Device · Edge · Cloud', '暂无已发布解决方案。': 'No published solutions yet.', '以标准化组件连接设备、云端和业务流程，支持按项目需求灵活组合与持续扩展。': 'Use standard components to connect devices, cloud services, and business processes with flexible composition and continuous expansion.', '完成本阶段的关键配置、验证与协同工作，进入下一阶段。': 'Complete key configuration, verification, and coordination work before moving to the next stage.', '围绕业务实际需求，形成可度量、可扩展的交付结果。': 'Create measurable and scalable delivery outcomes around real business needs.', '能力': 'Capability', '说明': 'Description', '适用场景': 'Applicable scenarios', '设备 · 云端 · 应用协同': 'Devices · Cloud · Applications working together', '首页 / 平台': 'Home / Platform', '了解更多': 'Learn more',
    '无需重构现有主控程序，通过标准串口协议与联网模组交互，快速完成传统设备联网升级。': 'Upgrade existing devices with cloud connectivity through standard serial communication—without rewriting the MCU application.', '概览': 'Overview', '协议能力': 'Protocol capabilities', '开发流程': 'Development process', '调试工具': 'Debugging tools',
    '保留原有 MCU，快速获得云端能力': 'Keep your existing MCU and quickly gain cloud capabilities.', '主控负责产品业务，联网模组负责网络、云连接和安全能力，双方通过标准串口协议通信。': 'The MCU handles product logic, while the connectivity module provides network, cloud, and security capabilities through standard serial communication.',
    '改动小': 'Minimal changes', '保留原主控架构，仅增加协议交互层。': 'Keep the existing MCU architecture and add only the protocol integration layer.', '周期短': 'Short delivery cycle', '成熟协议和调试工具降低联网开发成本。': 'Mature protocols and debugging tools reduce connectivity development costs.', '品类广': 'Broad product coverage', '适用于家电、电工、照明、健康、能源等。': 'Applicable to appliances, electrical products, lighting, health, energy, and more.', '量产稳定': 'Production ready', '提供产测、固件和量产工具支持。': 'Includes production testing, firmware, and manufacturing tools.',
    '标准协议能力': 'Standard protocol capabilities', '典型 MCU 与联网模组交互指令。': 'Typical commands exchanged between an MCU and connectivity module.', '产品信息': 'Product information', '上报 PID、版本和能力': 'Report PID, version, and capabilities', 'MCU → 模组': 'MCU → module', 'DP 数据': 'DP data', '属性上报与控制下发': 'Property reporting and control delivery', '双向': 'Bidirectional', '网络状态': 'Network status', '同步配网与云端连接状态': 'Synchronize provisioning and cloud-connection status', '模组 → MCU': 'Module → MCU', '协同完成 MCU 固件升级': 'Coordinate MCU firmware upgrades', '时间服务': 'Time service', '获取本地时间和时区': 'Get local time and time zone', '产测': 'Production testing', '进入产测和信号测试模式': 'Enter production and signal test modes', '方向': 'Direction',
    '接入流程': 'Integration process', '标准化四步完成联网。': 'Connect devices in four standardized steps.', '定义功能': 'Define features', '在平台创建产品并定义 DP。': 'Create a product and define DPs on the platform.', '生成协议': 'Generate protocol', '下载 MCU SDK 和协议文档。': 'Download the MCU SDK and protocol documentation.', '联调开发': 'Integration development', '集成 SDK 并通过调试助手验证。': 'Integrate the SDK and validate it with the debugging assistant.', '测试量产': 'Test and manufacture', '完成整机测试、产测和固件发布。': 'Complete device testing, production testing, and firmware release.',
    'MCU 开发工具': 'MCU development tools', '降低串口协议调试成本。': 'Reduce serial-protocol debugging costs.', '模组调试助手': 'Module debugging assistant', '模拟模组与 MCU 交互，检查 DP 与协议帧。': 'Simulate module-to-MCU communication and inspect DPs and protocol frames.', '提供 C 语言参考实现和接口封装。': 'Provides C reference implementations and API wrappers.', '串口日志': 'Serial logs', '检查协议时序、异常帧和联网状态。': 'Inspect protocol timing, malformed frames, and connection status.', '产测工具': 'Production testing tools', '批量验证联网、射频与关键产品功能。': 'Validate connectivity, radio performance, and core product functions at scale.', '开始 MCU 接入': 'Start MCU integration', '让现有产品用最少改动获得智能连接能力。': 'Give existing products intelligent connectivity with minimal changes.',
  },
};

const sourceByEnglishText = new Map(Object.entries(messages.en).map(([source, translated]) => [translated, source]));
const apiTextNodes = new WeakSet();
const apiTextAttributes = new WeakMap();

function rememberApiAttribute(element, attribute) {
  const attributes = apiTextAttributes.get(element) ?? new Set();
  attributes.add(attribute);
  apiTextAttributes.set(element, attributes);
}

function translateRenderedText(value, locale) {
  const source = locale === 'en' ? value : sourceByEnglishText.get(value) ?? value;
  return messages[locale][source] ?? source;
}

function translateRenderedNode(node, locale) {
  const apiText = unwrapApiText(node.nodeValue);
  if (apiText !== null) {
    apiTextNodes.add(node);
    node.nodeValue = apiText;
    return;
  }
  // React may later restore an API value on a text node we already handled.
  // Always unwrap the marker first; only then skip translation for its clean text.
  if (apiTextNodes.has(node)) return;
  if (node.parentElement?.closest('script, style, [data-i18n-skip]')) return;
  const translated = translateRenderedText(node.nodeValue, locale);
  if (translated !== node.nodeValue) node.nodeValue = translated;
}

const translatedAttributes = ['alt', 'aria-label', 'placeholder', 'title'];

function translateRenderedAttributes(element, locale) {
  translatedAttributes.forEach((attribute) => {
    const value = element.getAttribute(attribute);
    const apiText = unwrapApiText(value);
    if (apiText !== null) {
      rememberApiAttribute(element, attribute);
      element.setAttribute(attribute, apiText);
    }
  });
  if (element.closest?.('script, style, [data-i18n-skip]')) return;
  translatedAttributes.forEach((attribute) => {
    if (apiTextAttributes.get(element)?.has(attribute)) return;
    const value = element.getAttribute(attribute);
    if (value == null) return;
    const translated = translateRenderedText(value, locale);
    if (translated !== value) element.setAttribute(attribute, translated);
  });
}

function translateRenderedTree(root, locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => translateRenderedNode(node, locale));

  // Text rendered in form controls and accessibility attributes is not part of
  // the text-node tree. Translate it here as well so an English page does not
  // retain Chinese placeholders, labels, tooltips, or image descriptions.
  root.querySelectorAll?.('*').forEach((element) => {
    translateRenderedAttributes(element, locale);
  });
}

const I18nContext = createContext(null);

function initialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') return saved;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(initialLocale);
  const t = useCallback((value) => messages[locale][value] ?? value, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title = t('NEXA 智联科技｜企业级 NEXA 与空间智能平台');
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, t]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used within I18nProvider');
  return value;
}

export function LocalizedContent({ children }) {
  const { locale } = useI18n();

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const update = (node) => {
      if (node.nodeType === Node.TEXT_NODE) translateRenderedNode(node, locale);
      else if (node.nodeType === Node.ELEMENT_NODE) translateRenderedTree(node, locale);
    };

    translateRenderedTree(root, locale);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'characterData') update(record.target);
        if (record.type === 'attributes') translateRenderedAttributes(record.target, locale);
        record.addedNodes.forEach(update);
      });
    });
    observer.observe(root, { childList: true, characterData: true, attributes: true, attributeFilter: ['alt', 'aria-label', 'placeholder', 'title'], subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  return children;
}
