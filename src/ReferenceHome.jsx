import { useEffect, useState } from 'react';
import { getSolutionNavigation, getSolutions } from './api/solutions.js';
import { getContent } from './api/content.js';
import { submitLead } from './api/forms.js';
import SelectField from './SelectField.jsx';
import { useI18n } from './i18n.jsx';

const img = {
  factory: '/reference-images/1565043666747-69f6646db940.jpg',
  building: '/reference-images/1486406146926-c627a92ad1ab.jpg',
  hotel: '/reference-images/1611892440504-42a792e24d32.jpg',
};
const href = (path) => `#${path}`;
const formatNewsDate = (value) => {
  if (!value) return '日期待定';
  const date = new Date(String(value).replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return '日期待定';
  return date.toLocaleDateString('sv-SE');
};
const primaryRoutes = {
  platform: '/platform',
  solution: '/solutions',
  developer: '/developer',
  support: '/support',
  about: '/about',
};

const platform = [
  ['OS', '产品开发', '零代码、MCU 标准协议、设备操作系统和网关接入能力。', '/platform/product'],
  ['APP', 'App 开发', 'App SDK、设备面板与智能小程序。', '/platform/app'],
  ['☁', '云开发', 'NEXA Core、开放 API、消息、日志、数据分析与实时音视频。', '/platform/cloud'],
  ['AI', 'AI 能力', '大模型、语音、视觉与智能体能力接入智能硬件。', '/platform/ai'],
];
const platformMenu = [
  ['产品开发', [['产品开发总览', '/platform/product'], ['设备操作系统', '/platform/os'], ['MCU 标准协议', '/platform/mcu'], ['网关与子设备', '/platform/gateway']]],
  ['App 开发', [['App 开发总览', '/platform/app'], ['App SDK', '/platform/app-sdk'], ['智能小程序', '/platform/miniapp'], ['设备面板', '/platform/panel']]],
  ['云开发', [['云开发总览', '/platform/cloud'], ['NEXA Core', '/platform/iot-core'], ['设备日志', '/platform/log-service'], ['数据分析', '/platform/data']]],
  ['AI 与增长', [['AI 能力', '/platform/ai'], ['SaaS 框架', '/platform/saas'], ['运营增长', '/platform/growth'], ['增值服务', '/platform/value-added']]],
].map(([name, items]) => ({ name, items: items.map(([title, path]) => [title.slice(0, 3), title, '查看相关平台能力与应用场景。', path]) }));
const mega = {
  platform: { title: '平台', groups: platformMenu, promo: ['从产品定义到规模交付', '覆盖设备、应用、云与 AI 的完整技术底座。', '/platform/product'] },
  solution: { title: '解决方案', groups: [], promo: ['选择您的行业方案', '从设备连接到运营应用，建立可落地的业务闭环。', '/solutions'] },
  developer: { title: '开发者', groups: [{ name: '开发资源', items: [['文档', '开发者文档', '快速入门、SDK、API 与最佳实践。', '/developer/docs'], ['IDE', '开发工具', 'IDE、调试助手与 API Explorer。', '/developer/tools'], ['社', '开发者社区', '问答、案例与技术文章。', '/developer/community'], ['样', '示例工程', '快速体验典型开发流程。', '/developer/samples']] }], promo: ['完整工程体系', '帮助团队快速完成产品原型与商业化上线。', '/developer/docs'] },
  support: { title: '服务与支持', groups: [{ name: '支持', items: [['帮', '帮助中心', '常见操作指南与排障文章。', '/support/help'], ['技', '技术支持', '开发问题与线上故障快速响应。', '/support/technical'], ['认', '认证服务', '产品认证、测试与量产支持。', '/support/certification'], ['稳', '服务状态', '核心平台服务运行状态。', '/status']] }, { name: '信任与生态', items: [['信', '信任中心', '安全、合规、隐私与稳定性。', '/trust'], ['安', '安全体系', '设备到云端的多层安全。', '/trust/security'], ['规', '全球合规', '区域法规与治理体系。', '/trust/compliance'], ['生', '生态合作', '服务商与方案伙伴。', '/support/partners']] }], promo: ['7×24 技术支持', '项目全生命周期的客户服务与技术保障。', '/support/technical'] },
  about: { title: '关于我们', groups: [{ name: '了解 NEXA', items: [['使', '使命与愿景', '连接设备、空间与真实业务。', '/about/mission'], ['新', '新闻中心', '产品、技术和生态动态。', '/news'], ['联', '联系我们', '商务、技术和媒体入口。', '/contact'], ['招', '加入我们', '与团队共同构建智能化未来。', '/about/careers']] }], promo: ['连接现场，驱动业务', '了解 NEXA 的产品、团队与实践。', '/about'] },
};

export function SiteHeader({ onConsult }) {
  const [open, setOpen] = useState('');
  const [group, setGroup] = useState(0);
  const [solutionGroups, setSolutionGroups] = useState(null);
  const { locale, setLocale, t } = useI18n();
  useEffect(() => { getSolutionNavigation().then(setSolutionGroups).catch(() => {}); }, []);
  useEffect(() => {
    if (!open) return undefined;
    const closeFromScrollbar = (event) => {
      if (event.clientX >= document.documentElement.clientWidth) setOpen('');
    };
    const closeOnWindowBlur = () => setOpen('');
    document.addEventListener('pointermove', closeFromScrollbar, true);
    document.addEventListener('pointerdown', closeFromScrollbar, true);
    window.addEventListener('blur', closeOnWindowBlur);
    return () => {
      document.removeEventListener('pointermove', closeFromScrollbar, true);
      document.removeEventListener('pointerdown', closeFromScrollbar, true);
      window.removeEventListener('blur', closeOnWindowBlur);
    };
  }, [open]);
  const solutionMenu = solutionGroups?.length ? { ...mega.solution, groups: solutionGroups.map(g => ({ name: g.name, items: g.solutions.map(s => [s.icon || '·', s.name, s.summary || '行业解决方案', `/solutions/${s.slug}`]) })) } : null;
  const menu = open && (open === 'solution' ? solutionMenu : mega[open]);
  const isDynamicSolutionMenu = menu === solutionMenu;
  const show = (key) => { setOpen(key); setGroup(0); };
  return <>
    <header className="header"><div className="wrap nav">
      <a href={href('/')} className="logo"><span className="mark">N</span>NEXA 智联科技</a>
      <nav className="navlinks"><a className="nav-primary" href={href('/')} onClick={() => setOpen('')}>{t('首页')}</a>{[['platform', '平台'], ['solution', '解决方案'], ['developer', '开发者'], ['support', '服务与支持'], ['about', '关于我们']].map(([key, label]) => <a className="nav-primary" href={href(primaryRoutes[key])} key={key} onMouseEnter={() => show(key)} onFocus={() => show(key)} onClick={() => setOpen('')}>{t(label)}</a>)}</nav>
      <div className="nav-actions"><button className="btn dark hide-mob" onClick={onConsult}>合作咨询</button><button type="button" className="language-switch" data-i18n-skip aria-label={locale === 'zh' ? 'Switch to English' : 'Switch to Chinese'} onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>{locale === 'zh' ? 'EN' : 'ZH'}</button></div>
    </div></header>
    {menu && <div className="mega" onMouseLeave={() => setOpen('')}><div className="mega-in">
      <div className="mega-side"><small>{menu.title}</small>{menu.groups.map((g, index) => <button key={g.name} className={group === index ? 'active' : ''} onClick={() => setGroup(index)} data-i18n-skip={isDynamicSolutionMenu || undefined}>{g.name}<span className="mega-side-arrow">›</span></button>)}</div>
      <div className="mega-grid mega-grid-stable">{menu.groups[group].items.map((x) => <a className="mega-card" href={href(x[3])} key={x[1]} onClick={() => setOpen('')}><b data-i18n-skip={isDynamicSolutionMenu || undefined}>{x[1]}</b><span data-i18n-skip={isDynamicSolutionMenu || undefined}>{x[2]}</span></a>)}</div>
      <div className="mega-promo"><span className="eyebrow">NEXA</span><h3>{menu.promo[0]}</h3><p>{menu.promo[1]}</p><a href={href(menu.promo[2])} className="btn green" onClick={() => setOpen('')}>立即了解</a></div>
    </div></div>}
  </>;
}

export function SiteFooter() { const [solutions, setSolutions] = useState([]); useEffect(() => { getSolutions({ limit: 4 }).then(setSolutions).catch(console.error); }, []); return <footer className="footer"><div className="wrap"><div className="footer-grid">
  <div><a href={href('/')} className="logo" style={{ color: '#fff' }}><span className="mark">N</span>NEXA 智联科技</a><p className="brandp">面向智能设备、商业空间与工业现场提供 NEXA 云平台、边缘接入、应用开发与行业解决方案。</p></div>
  <div><h4>平台</h4><a href={href('/platform/product')}>产品开发</a><a href={href('/platform/app')}>App 开发</a><a href={href('/platform/cloud')}>云开发</a><a href={href('/platform/ai')}>AI 能力</a></div>
  <div><h4>解决方案</h4>{solutions.map((solution) => <a key={solution.slug} href={href(`/solutions/${solution.slug}`)} data-i18n-skip>{solution.name}</a>)}</div>
  <div><h4>开发者</h4><a href={href('/developer/docs')}>文档中心</a><a href={href('/developer/tools')}>开发工具</a><a href={href('/developer/community')}>开发者社区</a></div>
  <div><h4>服务支持</h4><a href={href('/support/help')}>帮助中心</a><a href={href('/support/technical')}>技术支持</a><a href={href('/support/certification')}>认证服务</a><a href={href('/trust')}>信任中心</a></div>
  <div><h4>关于我们</h4><a href={href('/about')}>公司介绍</a><a href={href('/news')}>新闻中心</a><a href={href('/contact')}>联系我们</a></div>
  </div></div></footer>; }

export function SuccessDialog({ onClose }) { return <div className="modal success-modal" role="presentation"><section className="modalbox success-dialog" role="dialog" aria-modal="true" aria-labelledby="success-dialog-title"><button className="modal-close" aria-label="关闭提示" onClick={onClose}>×</button><span className="success-dialog-icon">✓</span><h2 id="success-dialog-title">需求提交成功！</h2><p>我们已收到你的合作需求，会尽快与你联系。</p><button className="btn green" onClick={onClose}>确认</button></section></div>; }

export function ConsultModal({ onClose }) { const [status, setStatus] = useState(''); const [saving, setSaving] = useState(false); const [submitted, setSubmitted] = useState(false); const submit = async (event) => { event.preventDefault(); const form = event.currentTarget; setSaving(true); setStatus(''); try { await submitLead(Object.fromEntries(new FormData(form))); form.reset(); setSubmitted(true); } catch (error) { setStatus(error.message || '提交失败，请稍后重试。'); } finally { setSaving(false); } }; if (submitted) return <SuccessDialog onClose={onClose}/>; return <div className="modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="modalbox"><button className="modal-close" onClick={onClose}>×</button><h2>合作咨询</h2><form className="form-grid" onSubmit={submit}><input className="input" name="company" required placeholder="公司名称"/><input className="input" name="name" required placeholder="联系人"/><input className="input" name="contact" required placeholder="联系方式"/><SelectField name="type" ariaLabel="合作类型" defaultValue="产品智能化" options={['产品智能化','行业解决方案','生态合作','媒体合作']}/><textarea className="input full" name="description" required rows="5" placeholder="项目需求"/><button className="btn green full" disabled={saving}>{saving ? '正在提交…' : '提交咨询'}</button>{status && <p className="form-error full" role="alert">{status}</p>}</form></div></div>; }

export default function ReferenceHome() {
  const [consult, setConsult] = useState(false);
  const [dynamicSolutions, setDynamicSolutions] = useState([]); const [cases, setCases] = useState([]); const [news, setNews] = useState([]);
  useEffect(() => { Promise.all([getSolutions({ limit: 8 }), getContent('cases', { featured: true }), getContent('news', { featured: true })]).then(([solutions, nextCases, nextNews]) => { setDynamicSolutions(solutions); setCases(nextCases); setNews(nextNews); }).catch(console.error); }, []);
  const homeSolutionCards = dynamicSolutions.map(s => [s.icon || '·', s.name, s.summary, `/solutions/${s.slug}`]);
  return <><SiteHeader onConsult={() => setConsult(true)} />
    <section className="home-hero"><img className="hero-photo" src={img.factory} alt="智能制造现场"/><div className="wrap"><div><span className="eyebrow">NEXA · EDGE · CLOUD</span><h1>连接现场设备<br/>驱动真实业务</h1><p>面向智能硬件、商业空间与制造现场，提供设备接入、边缘网关、云平台、移动应用和 AI 服务。从产品研发到项目交付，以统一技术底座支撑规模化运营。</p><div className="hero-actions"><a href={href('/platform')} className="btn green">查看平台能力</a><button className="btn outline" style={{ background: 'transparent', color: '#fff', borderColor: '#47515b' }} onClick={() => setConsult(true)}>预约方案沟通</button></div><div className="proofbar"><span><b>12,000+</b>项目设备接入</span><span><b>18</b>行业交付模板</span><span><b>7×24h</b>技术保障</span></div></div></div></section>
    <div className="quick"><div className="wrap"><div className="quickbox">{[['产品开发', '从零代码、MCU 接入到设备操作系统', '/platform/product'], ['App 开发', 'App SDK、设备面板与智能小程序', '/platform/app'], ['云开发', 'NEXA Core、开放 API、数据与音视频', '/platform/cloud'], ['行业解决方案', '酒店、楼宇、办公、零售、校园、工业等', '/solutions']].map(([title, text, path]) => <a key={title} href={href(path)}><strong>{title}</strong><span>{text}</span></a>)}</div></div></div>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">PLATFORM</span><h2>一套完整的智能化技术底座</h2></div><p>从设备端、移动端到云端和运营层，提供可按需组合的模块化能力。</p></div><div className="cards">{platform.map((x) => <a className="card" href={href(x[3])} key={x[1]}><div className="ico">{x[0]}</div><h3>{x[1]}</h3><p>{x[2]}</p><span className="link">了解更多 →</span></a>)}</div></div></section>
    <section className="section darksec"><div className="wrap"><div className="section-head"><div><span className="eyebrow">SOLUTIONS</span><h2>面向不同业务场景构建专属方案</h2></div><p>每个行业都有独立的软件产品、架构、场景能力与服务模式。</p></div><div className="cards">{homeSolutionCards.map((x) => <a href={href(x[3])} className="card" style={{ background: '#11171d', borderColor: '#253039', color: '#fff' }} key={x[1]}><div className="ico">{x[0]}</div><h3 data-i18n-skip>{x[1]}</h3><p data-i18n-skip style={{ color: '#9da8b3' }}>{x[2]}</p><span className="link">查看方案 →</span></a>)}</div></div></section>
    <section className="section alt"><div className="wrap"><div className="feature-row"><div className="copy"><span className="eyebrow">DEVELOPER</span><h2>面向开发者的完整工程体系</h2><p>提供文档、SDK、IDE、API Explorer、设备调试、日志诊断和示例工程，让开发团队快速完成产品原型与商业化上线。</p><div className="bullet-grid">{[['文档中心', '快速入门、SDK、API 与最佳实践', '/developer/docs'], ['开发工具', 'IDE、调试助手、API Explorer', '/developer/tools'], ['开发者社区', '问答、案例、技术文章与活动', '/developer/community'], ['技术工单', '开发问题与线上故障快速响应', '/support/technical']].map(([title, text, path]) => <a className="bullet" href={href(path)} key={title}><b>{title}</b><span>{text}</span></a>)}</div></div><div className="visual"/></div></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">CUSTOMER STORIES</span><h2>项目现场与行业实践</h2></div><p>内容由运营后台发布后自动同步至此。</p></div>{cases.length ? <div className="case-grid">{cases.slice(0, 3).map((item, index) => <a href={href('/cases')} className={`case-card ${index ? 'small' : ''}`} key={item.id}>{item.image_url ? <img data-i18n-skip src={item.image_url} alt={item.title} /> : <div className="case-art"><small data-i18n-skip>{item.category || '客户案例'}</small><b>CASE 0{index + 1}</b></div>}<div className="case-copy"><small data-i18n-skip>{item.category || '客户案例'}</small><h3 data-i18n-skip>{item.title}</h3><p data-i18n-skip>{item.summary}</p></div></a>)}</div> : <p className="empty">暂无已发布案例。</p>}</div></section>
    <section className="section"><div className="wrap"><div className="metric-grid">{[['99.95%', '平台服务可用性目标'], ['60+', '标准设备与业务组件'], ['7×24h', '生产项目技术保障'], ['4 类', '主流边缘与工业协议']].map(([num, text]) => <div className="metric" key={text}><strong>{num}</strong><span>{text}</span></div>)}</div></div></section>
    <section className="section"><div className="wrap"><div className="section-head"><div><span className="eyebrow">NEWS</span><h2>最新动态</h2></div><a href={href('/news')} className="link">查看全部 →</a></div>{news.length ? <div className="news-grid">{news.slice(0, 3).map((item) => <a className="news" href={href(`/news/${item.slug}`)} key={item.id}><small data-i18n-skip>{formatNewsDate(item.published_at)} · {item.category || '新闻动态'}</small><h3 data-i18n-skip>{item.title}</h3><p className="muted" data-i18n-skip>{item.summary}</p></a>)}</div> : <p className="empty">暂无已发布新闻。</p>}</div></section>
    <SiteFooter />{consult && <ConsultModal onClose={() => setConsult(false)} />}
  </>;
}

export function ReferenceSolutions() {
  const [consult, setConsult] = useState(false);
  const [publishedSolutions, setPublishedSolutions] = useState([]);
  useEffect(() => { getSolutions().then(setPublishedSolutions).catch(console.error); }, []);
  const cards = publishedSolutions.map((solution) => ({ icon: solution.icon || '·', name: solution.name, desc: solution.summary, path: `/solutions/${solution.slug}`, image: solution.coverImage }));
  const featured = cards.slice(0, 3);
  return <><SiteHeader onConsult={() => setConsult(true)} />
    <section className="page-hero solutions-overview-hero"><div className="solutions-overview-bg"/><div className="wrap"><div className="solutions-overview-copy"><div className="crumb">首页 / 解决方案</div><span className="hero-tag">INDUSTRY SOLUTIONS · NEXA</span><h1>让智能化真正进入<br/>每一种业务现场</h1><p>围绕真实运营场景，将设备连接、边缘协同、云端平台和业务应用组合为可落地的行业方案。</p><div className="hero-actions">{featured[0] && <a href={href(featured[0].path)} className="btn green">浏览行业方案</a>}<button className="btn outline glass-btn" onClick={() => setConsult(true)}>联系解决方案专家</button></div><div className="solutions-stats"><span><b>{cards.length}</b><small>已发布方案</small></span><span><b>60+</b><small>业务组件</small></span><span><b>端边云</b><small>统一架构</small></span></div></div>{featured.length > 0 && <div className="hero-visual solutions-collage">{featured[0] && <div className="collage-main"><img data-i18n-skip src={featured[0].image} alt={featured[0].name}/><strong data-i18n-skip>{featured[0].name}</strong></div>}{featured[1] && <div className="collage-side top"><img data-i18n-skip src={featured[1].image} alt={featured[1].name}/><strong data-i18n-skip>{featured[1].name}</strong></div>}{featured[2] && <div className="collage-side bottom"><img data-i18n-skip src={featured[2].image} alt={featured[2].name}/><strong data-i18n-skip>{featured[2].name}</strong></div>}</div>}</div></section>
    <section className="section solutions-directory"><div className="wrap"><div className="section-head"><div><span className="eyebrow">INDUSTRIES</span><h2>选择您的行业</h2></div><p>内容由运营后台发布后自动同步至此。</p></div>{cards.length ? <div className="solution-directory-grid">{cards.map((card) => <a className="solution-directory-card" href={href(card.path)} key={card.name}><div className="solution-dir-photo"><img data-i18n-skip src={card.image} alt={card.name}/><span data-i18n-skip>{card.icon}</span></div><div className="solution-dir-copy"><small>行业解决方案</small><h3 data-i18n-skip>{card.name}</h3><p data-i18n-skip>{card.desc}</p><b>查看完整方案 ↗</b></div></a>)}</div> : <p className="empty">暂无已发布解决方案。</p>}</div></section>
    <SiteFooter />{consult && <ConsultModal onClose={() => setConsult(false)} />}
  </>;
}
