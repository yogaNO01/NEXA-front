import { apiBase } from './base.js';
import { markApiText } from './apiText.js';
import { staticSolutionDetail } from '../data/solutionDetailOverrides.js';
const localizeReferenceImage = (value) => typeof value === 'string'
  ? value.replace(
    /https:\/\/images\.unsplash\.com\/(?:photo-)?([^?'"\\s)]+)(?:\?[^'"\\s)]*)?/g,
    (_match, id) => `/reference-images/${id === '1523050854058-8df90110c9f1' ? '1564981797816-1043664bf78d' : id}.jpg`,
  )
  : value;

const localizeImages = (value) => {
  if (Array.isArray(value)) return value.map(localizeImages);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeImages(item)]));
  return localizeReferenceImage(value);
};

const normalizeSolution = (item) => {
  if (!item) return item;
  const apiSolution = markApiText(localizeImages({
    ...item,
    groupId: item.groupId ?? item.group_id,
    coverImage: item.coverImage ?? item.cover_image,
  }));
  return {
    ...apiSolution,
  // Reference-page modules are local product copy, not CMS-authored content:
  // leave them unmarked so the regular language switch can translate them.
    ...localizeImages(staticSolutionDetail(item.slug)),
    // This CTA action is deliberately a shared front-end label rather than
    // per-solution CMS content.
    cta: { ...apiSolution.cta, action: '联系方案专家' },
  };
};
const request = async (path) => {
  if (!apiBase) throw new Error('未配置 VITE_API_BASE_URL，无法读取解决方案数据');
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) throw new Error(`获取解决方案失败：${response.status}`);
  return response.json();
};

export const getSolutionNavigation = () => request('/api/public/solutions/navigation')
  .then(groups => markApiText(groups.map(group => ({ ...group, solutions: group.solutions.map(normalizeSolution) }))));
export const getSolutions = ({ limit } = {}) => request(`/api/public/solutions${limit ? `?limit=${limit}` : ''}`)
  .then(items => items.map(normalizeSolution));
export const getSolutionBySlug = (slug) => request(`/api/public/solutions/${slug}`).then(normalizeSolution);
