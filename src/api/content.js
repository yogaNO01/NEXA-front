const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';

const demo = {
  news: [
    { id: 1, title: 'NEXA 发布边缘协同能力升级', slug: 'edge-upgrade', category: '产品动态', summary: '面向多现场设备连接、离线联动与远程运维，进一步提升项目交付效率。', featured: true },
    { id: 2, title: '从设备联网到业务运营的实践路径', slug: 'operations-practice', category: '行业实践', summary: '围绕数据、告警和工单建立持续运营的智能化基础。', featured: true },
  ],
  cases: [
    { id: 1, title: '生产设备联网与车间可视化', slug: 'factory-visibility', category: '智能制造', summary: '统一采集设备状态、告警和能耗数据，支撑设备运维与生产分析。', featured: true },
    { id: 2, title: '多楼栋设备统一运营', slug: 'building-operations', category: '商业园区', summary: '照明、空调、门禁、能耗和工单统一纳管。', featured: true },
  ],
  help: [
    { id: 1, title: '设备首次接入', slug: 'first-device', category: '设备接入', summary: '完成产品创建、设备配网与状态上报。', featured: true },
    { id: 2, title: '排查设备离线', slug: 'device-offline', category: '故障排查', summary: '按网络、鉴权、日志与设备状态逐步定位问题。', featured: true },
  ],
};

export async function getContent(kind, { featured = false, keyword = '' } = {}) {
  if (!apiBase) return demo[kind].filter(item => (!featured || item.featured) && (!keyword || `${item.title}${item.summary}`.includes(keyword)));
  const query = new URLSearchParams(); if (featured) query.set('featured', 'true'); if (keyword) query.set('q', keyword);
  const response = await fetch(`${apiBase}/api/public/${kind}${query.size ? `?${query}` : ''}`);
  if (!response.ok) throw new Error(`读取内容失败（${response.status}）`);
  return response.json();
}
