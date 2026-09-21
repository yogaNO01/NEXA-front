import { apiBase } from './base.js';
import { markApiText } from './apiText.js';
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

const normalizeSolution = (item) => item && markApiText(localizeImages({
  ...item,
  groupId: item.groupId ?? item.group_id,
  coverImage: item.coverImage ?? item.cover_image,
}));
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
