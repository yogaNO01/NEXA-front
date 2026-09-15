import { useEffect, useState } from 'react';
import { getSolutionNavigation, getSolutions } from './api/solutions.js';

const img = {
  factory: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1600&q=86',
  building: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=86',
  hotel: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=86',
};
const href = (path) => `#${path}`;

const platform = [
  ['OS', '产品开发', '零代码、MCU 标准协议、设备操作系统和网关接入能力。', '/platform/product'],
  ['APP', 'App 开发', 'App SDK、设备面板与智能小程序。', '/platform/app'],
  ['☁', '云开发', 'IoT Core、开放 API、消息、日志、数据分析与实时音视频。', '/platform/cloud'],
  ['AI', 'AI 能力', '大模型、语音、视觉与智能体能力接入智能硬件。', '/platform/ai'],
];
const solutionItems = [
  ['楼', '智慧楼宇', '设备管理、区域守护、能源监测和辅助运维的一体化楼宇方案。', '/solutions/building'],
  ['酒', '智慧酒店', '围绕客房控制、住客体验、能耗策略与酒店运营构建一体化智慧客房方案。', '/solutions/hotel'],
  ['办', '智慧办公', '围绕门禁、会议、公区、用电与空间环境构建数字办公空间。', '/solutions/office'],
  ['店', '智慧零售', '远程巡店、门店安防、数字化运营、环境与配送管理。', '/solutions/retail'],
  ['校', '智慧校园', '覆盖校园、教室、宿舍、安全和能源的多系统协同方案。', '/solutions/campus'],
  ['能', '智慧节能', '用能采集、能效分析、异常预警和节能策略闭环。', '/solutions/energy'],
  ['工', '智慧工业', '工业 SaaS、PaaS、设备联网、生产、质量与仓储管理。', '/solutions/industry'],
  ['云', '私有云', '面向数据隔离和本地部署场景构建私有化智能平台。', '/solutions/private-cloud'],
];
const mega = {
  platform: { title: '平台', groups: [{ name: '产品与开发', items: platform }, { name: '核心能力', items: platform.slice(1) }], promo: ['从产品定义到规模交付', '覆盖设备、应用、云与 AI 的完整技术底座。', '/platform/product'] },
  solution: { title: '解决方案', groups: [{ name: '空间行业', items: solutionItems.slice(0, 5) }, { name: '能源与工业', items: solutionItems.slice(5) }], promo: ['选择您的行业方案', '从设备连接到运营应用，建立可落地的业务闭环。', '/solutions'] },
  developer: { title: '开发者', groups: [{ name: '开发资源', items: [['文档', '开发者文档', '快速入门、SDK、API 与最佳实践。', '/developer/docs'], ['IDE', '开发工具', 'IDE、调试助手与 API Explorer。', '/developer/tools'], ['社', '开发者社区', '问答、案例与技术文章。', '/developer/community']] }], promo: ['完整工程体系', '帮助团队快速完成产品原型与商业化上线。', '/developer/docs'] },
  support: { title: '服务与支持', groups: [{ name: '服务入口', items: [['帮', '帮助中心', '常见操作指南与排障文章。', '/support/help'], ['技', '技术支持', '开发问题与线上故障快速响应。', '/support/technical'], ['认', '认证服务', '产品认证、测试与量产支持。', '/support/certification']] }], promo: ['面向交付与运营', '从技术支持到长期服务保障。', '/support'] },
  about: { title: '关于我们', groups: [{ name: '了解 NEXA', items: [['使', '使命与愿景', '连接设备、空间与真实业务。', '/about/mission'], ['新', '新闻中心', '产品、技术和生态动态。', '/news'], ['招', '加入我们', '与团队共同构建智能化未来。', '/about/careers']] }], promo: ['连接现场，驱动业务', '了解 NEXA 的产品、团队与实践。', '/about'] },
};

export function SiteHeader({ onConsult }) {
  const [open, setOpen] = useState('');
  const [group, setGroup] = useState(0);
  const [solutionGroups, setSolutionGroups] = useState(null);
  useEffect(() => { getSolutionNavigation().then(setSolutionGroups).catch(() => {}); }, []);
  const solutionMenu = solutionGroups?.length ? { ...mega.solution, groups: solutionGroups.map(g => ({ name: g.name, items: g.solutions.map(s => [s.icon || '·', s.name, s.summary || '行业解决方案', `/solutions/${s.slug}`]) })) } : mega.solution;
  const menu = open && (open === 'solution' ? solutionMenu : mega[open]);
  const show = (key) => { setOpen(key); setGroup(0); };
  return <>
    <header className="header"><div className="wrap nav">
      <a href={href('/')} className="logo"><span className="mark">N</span>NEXA 智联科技</a>
      <nav className="navlinks">{[['platform', '平台'], ['solution', '解决方案'], ['developer', '开发者'], ['support', '服务与支持'], ['about', '关于我们']].map(([key, label]) => <button key={key} onMouseEnter={() => show(key)} onFocus={() => show(key)} onClick={() => show(key)}>{label}</button>)}</nav>
      <div className="nav-actions"><button className="btn dark hide-mob" onClick={onConsult}>合作咨询</button></div>
    </div></header>
    {menu && <div className="mega" onMouseLeave={() => setOpen('')}><div className="mega-in">
      <div className="mega-side"><small>{menu.title}</small>{menu.groups.map((g, index) => <button key={g.name} className={group === index ? 'active' : ''} onClick={() => setGroup(index)}>{g.name}<span className="mega-side-arrow">›</span></button>)}</div>
      <div className="mega-grid mega-grid-stable">{menu.groups[group].items.map((x) => <a className="mega-card" href={href(x[3])} key={x[1]} onClick={() => setOpen('')}><b>{x[1]}</b><span>{x[2]}</span></a>)}</div>
      <div className="mega-promo"><span className="eyebrow">NEXA</span><h3>{menu.promo[0]}</h3><p>{menu.promo[1]}</p><a href={href(menu.promo[2])} className="btn green" onClick={() => setOpen('')}>立即了解</a></div>
    </div></div>}
  </>;
}

export function SiteFooter() { return <footer className="footer"><div className="wrap"><div className="footer-grid">
  <div><a href={href('/')} className="logo" style={{ color: '#fff' }}><span className="mark">N</span>NEXA 智联科技</a><p className="brandp">面向智能设备、商业空间与工业现场提供 AIoT 云平台、边缘接入、应用开发与行业解决方案。</p></div>
  <div><h4>平台</h4><a href={href('/platform/product')}>产品开发</a><a href={href('/platform/app')}>App 开发</a><a href={href('/platform/cloud')}>云开发</a><a href={href('/platform/ai')}>AI 能力</a></div>
  <div><h4>解决方案</h4><a href={href('/solutions/building')}>智慧楼宇</a><a href={href('/solutions/office')}>智慧办公</a><a href={href('/solutions/retail')}>智慧零售</a><a href={href('/solutions/industry')}>智慧工业</a></div>
  <div><h4>开发者</h4><a href={href('/developer/docs')}>文档中心</a><a href={href('/developer/tools')}>开发工具</a><a href={href('/developer/community')}>开发者社区</a></div>
  <div><h4>服务支持</h4><a href={href('/support/help')}>帮助中心</a><a href={href('/support/technical')}>技术支持</a><a href={href('/support/certification')}>认证服务</a><a href={href('/trust')}>信任中心</a></div>
  <div><h4>关于我们</h4><a href={href('/about')}>公司介绍</a><a href={href('/news')}>新闻中心</a><a href={href('/contact')}>联系我们</a></div>
  </div><div className="copyright"><span>© 2026 NEXA Intelligence Technology. All rights reserved.</span><span>隐私政策 · 服务条款 · 安全与合规</span></div></div></footer>; }

export function ConsultModal({ onClose }) { return <div className="modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="modalbox"><button className="modal-close" onClick={onClose}>×</button><h2>合作咨询</h2><div className="form-grid"><input className="input" placeholder="公司名称"/><input className="input" placeholder="联系人"/><input className="input" placeholder="联系方式"/><select className="input" defaultValue="设备产品开发"><option>设备产品开发</option><option>App 开发</option><option>云开发</option><option>行业解决方案</option></select><textarea className="input full" rows="5" placeholder="项目需求"/><button className="btn green full" onClick={onClose}>提交咨询</button></div></div></div>; }

export default function ReferenceHome() {
  const [consult, setConsult] = useState(false);
  const [dynamicSolutions, setDynamicSolutions] = useState(null);
  useEffect(() => { getSolutions({ limit: 8 }).then(setDynamicSolutions).catch(() => {}); }, []);
  const homeSolutionCards = dynamicSolutions?.length ? dynamicSolutions.map(s => [s.icon || '·', s.name, s.summary, `/solutions/${s.slug}`]) : solutionItems;
  return <><SiteHeader onConsult={() => setConsult(true)} />
    <section className="home-hero"><img className="hero-photo" src={img.factory} alt="智能制造现场"/><div className="wrap"><div><span className="eyebrow">AIoT · EDGE · CLOUD</span><h1>连接现场设备<br/>驱动真实业务</h1><p>面向智能硬件、商业空间与制造现场，提供设备接入、边缘网关、云平台、移动应用和 AI 服务。从产品研发到项目交付，以统一技术底座支撑规模化运营。</p><div className="hero-actions"><a href={href('/platform/product')} className="btn green">查看平台能力</a><button className="btn outline" style={{ background: 'transparent', color: '#fff', borderColor: '#47515b' }} onClick={() => setConsult(true)}>预约方案沟通</button></div><div className="proofbar"><span><b>12,000+</b>项目设备接入</span><span><b>18</b>行业交付模板</span><span><b>7×24h</b>技术保障</span></div></div></div></section>
    <div className="quick"><div className="wrap"><div className="quickbox">{[['产品开发', '从零代码、MCU 接入到设备操作系统', '/platform/product'], ['App 开发', 'App SDK、设备面板与智能小程序', '/platform/app'], ['云开发', 'IoT Core、开放 API、数据与音视频', '/platform/cloud'], ['行业解决方案', '酒店、楼宇、办公、零售、校园、工业等', '/solutions']].map(([title, text, path]) => <a key={title} href={href(path)}><strong>{title}</strong><span>{text}</span></a>)}</div></div></div>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">PLATFORM</span><h2>一套完整的智能化技术底座</h2></div><p>从设备端、移动端到云端和运营层，提供可按需组合的模块化能力。</p></div><div className="cards">{platform.map((x) => <a className="card" href={href(x[3])} key={x[1]}><div className="ico">{x[0]}</div><h3>{x[1]}</h3><p>{x[2]}</p><span className="link">了解更多 →</span></a>)}</div></div></section>
    <section className="section darksec"><div className="wrap"><div className="section-head"><div><span className="eyebrow">SOLUTIONS</span><h2>面向不同业务场景构建专属方案</h2></div><p>每个行业都有独立的软件产品、架构、场景能力与服务模式。</p></div><div className="cards">{homeSolutionCards.map((x) => <a href={href(x[3])} className="card" style={{ background: '#11171d', borderColor: '#253039', color: '#fff' }} key={x[1]}><div className="ico">{x[0]}</div><h3>{x[1]}</h3><p style={{ color: '#9da8b3' }}>{x[2]}</p><span className="link">查看方案 →</span></a>)}</div></div></section>
    <section className="section alt"><div className="wrap"><div className="feature-row"><div className="copy"><span className="eyebrow">DEVELOPER</span><h2>面向开发者的完整工程体系</h2><p>提供文档、SDK、IDE、API Explorer、设备调试、日志诊断和示例工程，让开发团队快速完成产品原型与商业化上线。</p><div className="bullet-grid">{[['文档中心', '快速入门、SDK、API 与最佳实践', '/developer/docs'], ['开发工具', 'IDE、调试助手、API Explorer', '/developer/tools'], ['开发者社区', '问答、案例、技术文章与活动', '/developer/community'], ['技术工单', '开发问题与线上故障快速响应', '/support/technical']].map(([title, text, path]) => <a className="bullet" href={href(path)} key={title}><b>{title}</b><span>{text}</span></a>)}</div></div><div className="visual"/></div></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">CUSTOMER STORIES</span><h2>项目现场与行业实践</h2></div><p>以实际空间、设备和运营流程组织方案内容，让技术能力对应到可落地的业务场景。</p></div><div className="case-grid"><a href={href('/solutions/industry')} className="case-card"><img src={img.factory} alt="智能工厂"/><div className="case-copy"><small>华东 · 智能制造</small><h3>生产设备联网与车间可视化</h3><p>接入 PLC、传感器与产线设备，统一采集状态、告警和能耗数据，支撑设备运维与生产分析。</p></div></a><a href={href('/solutions/building')} className="case-card small"><img src={img.building} alt="智慧楼宇"/><div className="case-copy"><small>商业园区 · 楼宇</small><h3>多楼栋设备统一运营</h3><p>照明、空调、门禁、能耗和工单统一纳管。</p></div></a><a href={href('/solutions/hotel')} className="case-card small"><img src={img.hotel} alt="智慧酒店"/><div className="case-copy"><small>酒店 · 客房</small><h3>客房场景与节能联动</h3><p>入住、离房、睡眠等场景自动联动灯光、空调与服务。</p></div></a></div></div></section>
    <section className="section"><div className="wrap"><div className="metric-grid">{[['99.95%', '平台服务可用性目标'], ['60+', '标准设备与业务组件'], ['7×24h', '生产项目技术保障'], ['4 类', '主流边缘与工业协议']].map(([num, text]) => <div className="metric" key={text}><strong>{num}</strong><span>{text}</span></div>)}</div></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">NEWS</span><h2>最新动态</h2></div><a href={href('/news')} className="link">查看全部 →</a></div><div className="news-grid">{[['2026.09.10', '产品动态', 'NEXA 云平台完成设备连接与日志诊断能力升级', '围绕设备接入、规则、消息、日志与 API 调试优化研发效率。'], ['2026.08.22', '行业实践', '智慧楼宇项目实现多系统统一运营', '通过设备接入、空间模型与工单流程，形成可持续运营闭环。'], ['2026.08.05', '技术洞察', '边缘协同如何提升现场设备稳定性', '将本地协议、自动化策略和云端数据服务有效协同。']].map(([date, category, title, text]) => <a className="news" href={href('/news')} key={title}><small>{date} · {category}</small><h3>{title}</h3><p className="muted">{text}</p></a>)}</div></div></section>
    <SiteFooter />{consult && <ConsultModal onClose={() => setConsult(false)} />}
  </>;
}

export function ReferenceSolutions() {
  const [consult, setConsult] = useState(false);
  const [publishedSolutions, setPublishedSolutions] = useState(null);
  useEffect(() => { getSolutions().then(setPublishedSolutions).catch(() => {}); }, []);
  const media = [
    ['building', '商业楼宇 · 设施运营', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=86'],
    ['hotel', '酒店客房 · 智慧客控', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=86'],
    ['office', '办公空间 · 会议与环境', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=86'],
    ['retail', '连锁门店 · 远程运营', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=86'],
    ['campus', '校园空间 · 教学与安防', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=86'],
    ['energy', '能源设施 · 监测与控制', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=86'],
    ['industry', '制造现场 · 设备与产线', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=86'],
    ['private-cloud', '企业机房 · 私有化部署', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=86'],
    ['ai', '企业 AI · 数据与智能体', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=86'],
  ];
  const fallbackCards = solutionItems.map((x, i) => ({ icon: x[0], name: x[1], desc: x[2], path: x[3], media: media[i] }));
  fallbackCards.push({ icon: 'AI', name: 'AI 大模型', desc: '面向智能硬件和行业应用提供大模型与 Copilot 能力。', path: '/solutions/ai', media: media[8] });
  const cards = publishedSolutions?.length ? publishedSolutions.map((s, i) => ({ icon: s.icon || '·', name: s.name, desc: s.summary, path: `/solutions/${s.slug}`, media: [s.slug, fallbackCards[i]?.media?.[1] || '行业解决方案', s.coverImage || fallbackCards[i]?.media?.[2]] })) : fallbackCards;
  return <><SiteHeader onConsult={() => setConsult(true)} />
    <section className="page-hero solutions-overview-hero"><div className="solutions-overview-bg"/><div className="wrap"><div className="solutions-overview-copy"><div className="crumb">首页 / 解决方案</div><span className="hero-tag">INDUSTRY SOLUTIONS · NEXA</span><h1>让智能化真正进入<br/>每一种业务现场</h1><p>围绕楼宇、酒店、办公、零售、校园、能源与工业等真实运营场景，将设备连接、边缘协同、云端平台和业务应用组合为可落地的行业方案。</p><div className="hero-actions"><a href={href('/solutions/building')} className="btn green">浏览行业方案</a><button className="btn outline glass-btn" onClick={() => setConsult(true)}>联系解决方案专家</button></div><div className="solutions-stats"><span><b>9</b><small>行业方案</small></span><span><b>60+</b><small>业务组件</small></span><span><b>端边云</b><small>统一架构</small></span></div></div><div className="hero-visual solutions-collage"><div className="collage-main"><img src={media[0][2]} alt="智慧楼宇"/><strong>智慧楼宇</strong><small>BUILDING</small></div><div className="collage-side top"><img src={media[1][2]} alt="智慧酒店"/><strong>智慧酒店</strong></div><div className="collage-side bottom"><img src={media[6][2]} alt="智慧工业"/><strong>智慧工业</strong></div></div></div></section>
    <section className="section solutions-directory"><div className="wrap"><div className="section-head"><div><span className="eyebrow">INDUSTRIES</span><h2>选择您的行业</h2></div><p>每个行业均采用独立业务架构、现场图片、应用场景和实施路径，不再是同一套模板内容。</p></div><div className="solution-directory-grid">{cards.map((card) => <a className="solution-directory-card" href={href(card.path)} key={card.name}><div className="solution-dir-photo"><img src={card.media[2]} alt={card.name}/><span>{card.icon}</span></div><div className="solution-dir-copy"><small>{card.media[1]}</small><h3>{card.name}</h3><p>{card.desc}</p><b>查看完整方案 ↗</b></div></a>)}</div></div></section>
    <SiteFooter />{consult && <ConsultModal onClose={() => setConsult(false)} />}
  </>;
}
