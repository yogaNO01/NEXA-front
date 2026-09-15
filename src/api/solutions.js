import { solutionGroups, solutions } from '../data/solutions.js';

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
const normalizeSolution = (item) => item && ({
  ...item,
  groupId: item.groupId ?? item.group_id,
  coverImage: item.coverImage ?? item.cover_image,
});
const request = async (path, fallback) => {
  if (!apiBase) return fallback();
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) throw new Error(`获取解决方案失败：${response.status}`);
  return response.json();
};

// 未配置 VITE_API_BASE_URL 时使用演示数据；配置后严格调用约定的 Python 公开接口。
export const getSolutionNavigation = () => request('/api/public/solutions/navigation', () =>
  solutionGroups.map(group => ({ ...group, solutions: group.solutions.map(id => solutions.find(x => x.id === id)) }))
).then(groups => groups.map(group => ({ ...group, solutions: group.solutions.map(normalizeSolution) })));
export const getSolutions = ({ limit } = {}) => request(`/api/public/solutions${limit ? `?limit=${limit}` : ''}`, () =>
  (limit ? solutions.slice(0, limit) : solutions).filter(x => x.published)
).then(items => items.map(normalizeSolution));
export const getSolutionBySlug = (slug) => request(`/api/public/solutions/${slug}`, () => solutions.find(x => x.slug === slug)).then(normalizeSolution);
