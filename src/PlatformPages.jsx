import { useState } from 'react';
import platformReference from './data/platformReference.js';
import { useI18n } from './i18n.jsx';

const href = (path) => `#${path}`;
// The reference project's images are shipped with the site.  Keeping platform
// pages on local assets avoids a third-party image host becoming a page-level
// dependency (and works on the intranet too).
const image = (id) => `/reference-images/${id}.jpg`;
const translateContent = (value, t) => {
  if (typeof value === 'string') return t(value);
  if (Array.isArray(value)) return value.map((item) => translateContent(item, t));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateContent(item, t)]));
  return value;
};

const platformItems = [
  ['product', 'PRODUCT', '智能产品开发', '零代码、MCU、设备 OS 与网关接入，覆盖从产品定义到量产。', '1518770660439-4636190af475'],
  ['os', 'OS', '设备操作系统', '跨芯片、组件化、可裁剪的 NEXA 设备开发框架。', '1550751827-4bd374c3f58b'],
  ['mcu', 'MCU', 'MCU 标准协议接入', '保留既有主控，通过标准协议快速完成设备联网。', '1516321165247-4aa89a48be28'],
  ['gateway', 'GW', '网关与子设备接入', '多协议接入、本地自动化和边缘协同管理。', '1558494949-ef010cbdcc31'],
  ['app', 'APP', 'App 开发', '通过品牌 App、SDK、业务组件与小程序服务终端用户。', '1512941937669-90a1b58e7e9c'],
  ['app-sdk', 'SDK', 'App SDK', '账号、家庭、设备、场景与消息能力的移动端集成方案。', '1551650975-87deedd944c3'],
  ['miniapp', 'MINI', '智能小程序', '扫码即用的设备控制、服务与轻量业务入口。', '1558655146-9f40138edfeb'],
  ['panel', 'UI', '设备面板开发', '可视化构建设备控制页面，并完成 DP 绑定与真机预览。', '1558655146-9f40138edfeb'],
  ['cloud', 'CLOUD', '云开发', '以开放 API、设备连接和数据服务构建行业应用。', '1451187580459-43490279c0fa'],
  ['iot-core', 'CORE', 'NEXA Core', '设备身份、消息、控制、影子和事件通知的核心服务。', '1558494949-ef010cbdcc31'],
  ['log-service', 'LOG', '设备日志服务', '采集、检索与聚合关键链路，支持远程问题诊断。', '1551288049-bebda4e38f71'],
  ['data', 'DATA', '数据分析服务', '指标、趋势、漏斗和分群，帮助持续优化产品运营。', '1551288049-bebda4e38f71'],
  ['ai', 'AI', 'AI 能力', '将大模型、语音、视觉和智能体接入设备与行业应用。', '1677442136019-21780ecad995'],
  ['saas', 'SAAS', 'SaaS 开发框架', '组织、权限、设备、告警、工单和数据看板基础组件。', '1460925895917-afdab827c52f'],
  ['growth', 'GROWTH', '运营增长', '以用户、设备、内容和商业化工具支撑持续增长。', '1552664730-d307ca884978'],
  ['value-added', 'VALUE', '增值服务', '认证、语音、云存储、消息与商业化服务能力。', '1551434678-e076c223a692'],
].map(([slug, short, title, description, imageId]) => ({ slug, short, title, description, image: image(imageId) }));

const bySlug = new Map(platformItems.map((item) => [item.slug, item]));
const scenarioImages = {
  product:['1565814329452-e1efa11c5b89','1556911220-bff31c812dba','1558002038-1055907df827','1508514177221-188b1cf16e9d'],
  os:['1558089687-f282ffcbc126','1558494949-ef010cbdcc31','1516035069371-29a1b244cc32','1558346490-a72e53ae2d4f'],
  gateway:['1558002038-1055907df827','1518770660439-4636190af475','1550751827-4bd374c3f58b'],
  app:['1558346490-a72e53ae2d4f','1558002038-1055907df827','1556157382-97eda2d62296','1563013544-824ae1b704d3'],
  'app-sdk':['1600585154340-be6161a56a0c','1558002038-1055907df827','1558346490-a72e53ae2d4f','1516035069371-29a1b244cc32'],
  miniapp:['1516321318423-f06f85e504b3','1558002038-1055907df827','1581092918056-0c4c3acd3789','1556742049-0cfed4f6a45d'],
  panel:['1558002038-1055907df827','1551288049-bebda4e38f71','1516321318423-f06f85e504b3','1556742049-0cfed4f6a45d'],
  cloud:['1551288049-bebda4e38f71','1460925895917-afdab827c52f','1551288049-bebda4e38f71','1558494949-ef010cbdcc31'],
  data:['1551288049-bebda4e38f71','1556157382-97eda2d62296','1518770660439-4636190af475'],
  ai:['1558002038-1055907df827','1516035069371-29a1b244cc32','1556761175-b413da4baf72','1565043666747-69f6646db940'],
  saas:['1451187580459-43490279c0fa','1558494949-ef010cbdcc31','1518770660439-4636190af475'],
};

const details = {
  product: { action: '开始产品开发', cards: ['零代码开发', 'MCU 低代码开发', '设备 OS 开发', '网关/子设备开发'], flow: ['创建产品', '功能定义', '硬件开发', '配置与量产'], scenarios: ['电工照明', '大小家电', '安防传感', '节能能源'] },
  os: { action: '体验开发', cards: ['跨平台', '可裁剪', '低代码', '安全合规'], layers: ['业务子系统', 'NEXA 中间件', '系统抽象层', '芯片与连接'], scenarios: ['联网单品', '网关中控', 'IPC', 'Matter'] },
  mcu: { action: '开始接入', intro: '主控负责产品业务，联网模组负责网络、云连接和安全能力；双方通过标准串口协议通信。', table: ['产品信息', 'DP 数据', '网络状态', 'OTA', '时间服务', '产测'], flow: ['定义功能', '生成协议', '联调开发', '测试量产'] },
  gateway: { action: '开始网关开发', cards: ['多模网关', 'Matter 网关', '中控主机', '低功耗子设备'], layers: ['业务应用', '云平台', '边缘网关', '子设备'], scenarios: ['本地自动化', '协议桥接', '批量运维'] },
  app: { action: '开始 App 开发', cards: ['自研品牌 App', 'App SDK', 'UI 业务包', '智能小程序'], layers: ['品牌应用层', '业务组件层', 'SDK 能力层', '云与设备'], scenarios: ['设备连接', '智能场景', '用户运营', '安全与全球化'] },
  'app-sdk': { action: '查看开发文档', cards: ['低门槛集成', '组件化开发', '功能覆盖完整', '全球服务'], layers: ['App UI', '行业 SDK', '基础 SDK', '通信与云'], scenarios: ['账号与家庭', '设备管理', '场景自动化', '垂直品类'] },
  miniapp: { action: '开始小程序开发', cards: ['扫码即用', '轻量控制', '服务触达', '品牌轻应用'], layers: ['小程序页面', '业务服务', '开放 SDK', 'NEXA 云与设备'], scenarios: ['设备快捷控制', '售后服务', '门店与展厅', '临时授权'] },
  panel: { action: '开始设备面板开发', cards: ['模板化开发', '可视化搭建', '自定义开发', '多端适配'], flow: ['选择模板', '绑定功能', '预览调试', '发布运营'], scenarios: ['标准品类控制', '复杂设备交互', '视频与安防', '服务入口'] },
  cloud: { action: '进入云开发', cards: ['NEXA Core', '设备日志', '数据分析', '实时音视频'], layers: ['业务应用', '开放能力', 'NEXA 平台', '设备与边缘'], scenarios: ['设备运营平台', '行业 SaaS', '数据服务', '系统集成'] },
  'iot-core': { action: '查看 API', cards: ['设备身份', '消息通道', '设备影子', '事件通知'], layers: ['业务系统', '设备 API', '产品模型', '物理设备'], flow: ['设备上报', '云端解析', '状态存储', '业务分发'], table: ['/devices', '/devices/{id}/commands', '/devices/{id}/status', '/events/subscriptions'] },
  'log-service': { action: '体验日志服务', cards: ['多条件检索', '链路追踪', '错误聚合', '日志导出'], table: ['激活与配网', '在线与心跳', 'DP 通信', 'OTA', '云 API'], flow: ['确定设备与时间', '筛选关键链路', '关联版本与区域', '形成结论'] },
  data: { action: '查看数据能力', metrics: ['DAU', '在线率', '留存', '转化'], cards: ['趋势分析', '漏斗分析', '用户分群', '留存分析'], scenarios: ['产品迭代', '用户运营', '设备运营'] },
  ai: { action: '开始 AI 开发', cards: ['大模型对话', '语音交互', '视觉理解', '设备智能体'], layers: ['智能应用', '智能体层', '模型层', 'NEXA 层'], scenarios: ['AI 家居助手', 'AI 看护', 'AI 客服', '行业 Copilot'], flow: ['选择 AI 能力', '绑定设备工具', '配置知识与安全', '联调与评估'] },
  saas: { action: '开始 SaaS 开发', layers: ['行业应用', '业务微应用', '平台基础', '云平台'], cards: ['组织与权限', '设备中心', '告警中心', '工单中心'], scenarios: ['公有云 SaaS', '专属实例', '私有化部署'] },
  growth: { action: '咨询运营方案', cards: ['数据智能运营', '消息触达', 'App 商城', '内容运营'], flow: ['首次激活', '持续使用', '服务运营', '召回与增长'], metrics: ['激活率', 'DAU', '留存', 'ARPU'] },
  'value-added': { action: '咨询服务', cards: ['互联认证', '语音技能', '云存储', '商业化服务'], table: ['智能门铃', '智能家电', '能源设备', '品牌 App'] },
};

const SectionHeading = ({ eyebrow, title, text }) => <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><p>{text}</p></div>;

function Cards({ items }) { return <div className="cards platform-rich-cards">{items.map((title, index) => <article className="card" key={title}><div className="cap-top"><div className="ico">{String(index + 1).padStart(2, '0')}</div><span className="cap-index">0{index + 1}</span></div><h3>{title}</h3><p>以标准化组件连接设备、云端和业务流程，支持按项目需求灵活组合与持续扩展。</p><span className="cap-accent"/></article>)}</div> }

function Architecture({ layers, item }) { return <section className="section alt"><div className="wrap"><SectionHeading eyebrow="ARCHITECTURE" title="分层技术架构" text="从业务应用到设备连接，形成清晰、可扩展的能力边界。"/><div className="arch media-arch" style={{ '--arch-bg': `url(${item.image})` }}><div className="arch-layers">{layers.map((layer, index) => <div className="layer" key={layer}><span className="layer-no">0{index + 1}</span><b>{layer}</b><div className="chips"><span className="chip">标准能力</span><span className="chip">开放接口</span><span className="chip">安全治理</span></div></div>)}</div></div></div></section> }

function Scenarios({ items, imageUrl, imageUrls }) { const [active, setActive] = useState(0); const current = items[active]; const currentImage = imageUrls?.[active] ? image(imageUrls[active]) : imageUrl; return <section className="section alt"><div className="wrap"><SectionHeading eyebrow="SCENARIOS" title="典型应用场景" text="将产品能力放进真实业务流程，形成可复用的交付路径。"/><div className="scenario-tabs">{items.map((name, index) => <button className={index === active ? 'active' : ''} onClick={() => setActive(index)} key={name}>{name}</button>)}</div><div className="scenario-panel"><div className="scenario-copy"><span className="scene-kicker">SCENE 0{active + 1}</span><h3>{current}</h3><p>围绕 {current} 场景打通设备连接、数据流转、业务协同和持续运营，满足从验证到规模化落地的需求。</p><div className="bullet-grid">{['快速接入', '实时状态', '自动联动', '持续运营'].map((feature) => <div className="bullet" key={feature}><b>{feature}</b></div>)}</div></div><div className="scenario-art solution-scenario"><img src={currentImage} alt={current}/><div className="scene-photo-caption"><small>PLATFORM SCENARIO</small><b>{current}</b></div></div></div></div></section> }

function Flow({ items }) { return <section className="section"><div className="wrap"><SectionHeading eyebrow="PROCESS" title="标准交付流程" text="通过明确的阶段目标和交付物，确保方案可验证、可上线、可运维。"/><div className="flow">{items.map((title, index) => <article className="flow-step" key={title}><i>0{index + 1}</i><h4>{title}</h4><p>完成本阶段的关键配置、验证与协同工作，进入下一阶段。</p></article>)}</div></div></section> }

function Table({ items }) { return <section className="section alt"><div className="wrap"><SectionHeading eyebrow="DETAILS" title="能力与服务明细" text="按实际业务需求选择并组合相应能力。"/><div className="table-wrap"><table><thead><tr><th>能力</th><th>说明</th><th>适用场景</th></tr></thead><tbody>{items.map((name) => <tr key={name}><td>{name}</td><td>提供标准化接入、配置与运营支持。</td><td>研发、项目交付与持续服务</td></tr>)}</tbody></table></div></div></section> }

function Metrics({ items }) { return <section className="section"><div className="wrap"><SectionHeading eyebrow="METRICS" title="核心运营指标" text="以统一指标观察产品、设备和用户的持续价值。"/><div className="metric-grid">{items.map((value) => <div className="metric" key={value}><strong>{value}</strong><span>可持续追踪的业务指标</span></div>)}</div></div></section> }

function ReferenceCards({ section }) {
  const hasMedia = section.items.some((card) => card.image);
  return <div className={`cards${hasMedia ? ' media-cards' : ''}`}>{section.items.map((card, index) => <article className={`card${card.image ? ' media-card' : ''}`} key={card.title}>{card.image && <div className="card-media"><img src={card.image} alt={card.title}/><span>{String(index + 1).padStart(2, '0')}</span></div>}<div className={card.image ? 'card-body' : undefined}><div className="ico">{card.icon}</div><h3>{card.title}</h3><p>{card.text}</p></div></article>)}</div>;
}

function ReferenceArchitecture({ section, fallbackImage }) {
  return <div className="arch media-arch" style={{ '--arch-bg': `url(${section.bg || fallbackImage})` }}><div className="arch-layers">{section.layers.map((layer, index) => <div className="layer" key={layer.name}><span className="layer-no">{String(index + 1).padStart(2, '0')}</span><b>{layer.name}</b><div className="chips">{layer.items.map((value) => <span className="chip" key={value}>{value}</span>)}</div></div>)}</div></div>;
}

function ReferenceScenarios({ section, fallbackImage }) {
  const [active, setActive] = useState(0);
  const current = section.items[active] || section.items[0];
  return <><div className="scenario-tabs">{section.items.map((scenario, index) => <button className={index === active ? 'active' : ''} onClick={() => setActive(index)} key={scenario.name}>{scenario.name}</button>)}</div><div className="scenario-panel"><div className="scenario-copy"><span className="scene-kicker">SCENE {String(active + 1).padStart(2, '0')}</span><h3>{current.name}</h3><p>{current.desc}</p><div className="bullet-grid">{current.features.map((feature) => <div className="bullet" key={feature}><b>{feature}</b></div>)}</div></div><div className="scenario-art solution-scenario"><img src={current.image || fallbackImage} alt={current.name}/><div className="scene-photo-caption"><small>业务场景 · 产品能力</small><b>{current.name}</b></div></div></div></>;
}

function ReferenceSection({ section, index, fallbackImage }) {
  const { t } = useI18n();
  const content = translateContent(section, t);
  const heading = (eyebrow) => <SectionHeading eyebrow={eyebrow} title={content.title} text={content.text}/>;
  if (content.type === 'intro') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap"><div className="feature-row"><div className="copy"><span className="eyebrow">{content.kicker}</span><h2>{content.title}</h2><p>{content.text}</p><div className="bullet-grid">{content.bullets.map((bullet) => <div className="bullet" key={bullet.title}><b>{bullet.title}</b><span>{bullet.text}</span></div>)}</div></div><div className="visual light">{content.image && <img className="real-photo" src={content.image} alt={content.title}/>}</div></div></div></section>;
  if (content.type === 'cards') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading(content.kicker)}<ReferenceCards section={content}/></div></section>;
  if (content.type === 'arch') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading('ARCHITECTURE')}<ReferenceArchitecture section={content} fallbackImage={fallbackImage}/></div></section>;
  if (content.type === 'scenarios') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading('SCENARIOS')}<ReferenceScenarios section={content} fallbackImage={fallbackImage}/></div></section>;
  if (content.type === 'flow') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading('PROCESS')}<div className="flow">{content.items.map((step, stepIndex) => <article className="flow-step" key={step.title}><i>{String(stepIndex + 1).padStart(2, '0')}</i><h4>{step.title}</h4><p>{step.text}</p></article>)}</div></div></section>;
  if (content.type === 'table') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading('DETAILS')}<div className="table-wrap"><table><thead><tr>{content.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{content.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>;
  if (content.type === 'metrics') return <section id={content.id} className={`section${index % 2 ? ' alt' : ''}`}><div className="wrap">{heading('ADVANTAGES')}<div className="metric-grid">{content.items.map((metric) => <div className="metric" key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div></section>;
  return null;
}

function PlatformDetail({ item, detail }) {
  const { t } = useI18n();
  const content = translateContent(detail, t);
  const fallbackImage = item.image;
  return <><section className="page-hero platform-page-hero"><img className="platform-hero-bg" src={fallbackImage} alt=""/><div className="wrap"><div className="solution-hero-copy"><div className="crumb">{t('首页')} / {t('平台')} / {content.title}</div><span className="hero-tag">PRODUCT ENGINEERING · {content.short}</span><h1>{content.title}</h1><p>{content.description}</p><div className="hero-actions"><a className="btn green" href={href('/contact')}>{content.action}</a><a className="btn outline solution-back-btn" href={content.backHref}>{t('返回平台')}</a></div></div><div className="hero-visual"><div className="platform-banner-photo"><img src={fallbackImage} alt={content.title}/><div className="platform-visual-grid"/><div className="platform-banner-caption"><small>NEXA PLATFORM</small><b>{content.title}</b><span>{t('设备 · 云端 · 应用协同')}</span></div><em>{content.short}</em></div></div></div></section><div className="anchorbar"><div className="wrap">{content.anchors.map((anchor) => <button onClick={() => document.getElementById(anchor.id)?.scrollIntoView({ behavior: 'smooth' })} key={anchor.id}>{anchor.label}</button>)}</div></div>{content.sections.map((section, index) => <ReferenceSection section={section} index={index} fallbackImage={fallbackImage} key={section.id}/>) }<section className="section"><div className="wrap"><div className="cta"><div><h2>{content.ctaTitle}</h2><p>{content.ctaText}</p></div><a className="btn green" href={href('/contact')}>{content.action}</a></div></div></section></>;
}

export function PlatformCatalog() {
  const { t } = useI18n();
  const items = translateContent(platformItems, t);
  return <><section className="page-hero catalog-page-hero platform-catalog-hero"><div className="wrap"><div className="catalog-copy"><div className="crumb">{t('首页 / 平台')}</div><span className="hero-tag">NEXA PLATFORM</span><h1>{t('一套完整的')}<br/>{t('智能化技术体系')}</h1><p>{t('覆盖产品开发、App 开发、云开发、AI、运营与增值服务，从设备端到云端与业务应用按需组合。')}</p><div className="hero-actions"><a className="btn green" href={href('/platform/product')}>{t('开始产品开发')}</a><a className="btn outline glass-btn" href={href('/developer/docs')}>{t('开发者文档')}</a></div></div></div></section><section className="section catalog-section"><div className="wrap"><SectionHeading eyebrow="CAPABILITIES" title={t('平台全部能力')} text={t('16 个独立页面，覆盖从产品定义到持续运营的完整路径。')}/><div className="cards catalog-cards platform-directory">{items.map((item) => <a className="card" href={href(`/platform/${item.slug}`)} key={item.slug}><div className="ico">{item.short}</div><h3>{item.title}</h3><p>{item.description}</p><span className="link">{t('了解更多')} <b>↗</b></span></a>)}</div></div></section></>;
}

export default function PlatformPages({ slug }) { if (!slug) return <PlatformCatalog/>; const item = bySlug.get(slug); const detail = platformReference[slug]; if (!item || !detail) return null; return <PlatformDetail item={item} detail={detail}/>; }
