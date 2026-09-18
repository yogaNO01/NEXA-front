import { apiBase } from './base.js';
import { markApiText } from './apiText.js';

export async function getContent(kind, { featured = false, keyword = '' } = {}) {
  if (!apiBase) throw new Error('未配置 VITE_API_BASE_URL，无法读取运营内容');
  const query = new URLSearchParams(); if (featured) query.set('featured', 'true'); if (keyword) query.set('q', keyword);
  const response = await fetch(`${apiBase}/api/public/${kind}${query.size ? `?${query}` : ''}`);
  if (!response.ok) throw new Error(`读取内容失败（${response.status}）`);
  return markApiText(await response.json());
}

export async function getContentBySlug(kind, slug) {
  if (!apiBase) throw new Error('未配置 VITE_API_BASE_URL，无法读取运营内容');
  const response = await fetch(`${apiBase}/api/public/${kind}/${encodeURIComponent(slug)}`);
  if (!response.ok) throw new Error(`读取内容详情失败（${response.status}）`);
  return markApiText(await response.json());
}
