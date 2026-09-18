import { apiBase } from './base.js';
const tokenKey = 'nexa-admin-token';

export const hasAdminApi = Boolean(apiBase);
export const adminApiBase = apiBase;
export const getAdminToken = () => sessionStorage.getItem(tokenKey);
export const clearAdminToken = () => sessionStorage.removeItem(tokenKey);

async function request(path, options = {}) {
  const token = getAdminToken();
  const response = await fetch(`${apiBase}${path}`, {
    headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers ?? {}) },
    ...options,
  });
  if (response.status === 204) return null;
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.detail || `请求失败（${response.status}）`);
  }
  return response.json();
}

export async function loginAdmin(payload) {
  const result = await request('/api/admin/auth/login', { method: 'POST', body: JSON.stringify(payload) });
  sessionStorage.setItem(tokenKey, result.access_token);
  return result;
}
export const getAdmin = (path) => request(`/api/admin/${path}`);
export const createAdmin = (path, payload) => request(`/api/admin/${path}`, { method: 'POST', body: JSON.stringify(payload) });
export const updateAdmin = (path, payload) => request(`/api/admin/${path}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteAdmin = (path) => request(`/api/admin/${path}`, { method: 'DELETE' });
export const updateWorkflow = (kind, id, payload) => request(`/api/admin/${kind}/${id}/workflow`, { method: 'PUT', body: JSON.stringify(payload) });
export async function uploadImage(file) { const form = new FormData(); form.append('file', file); return request('/api/admin/uploads', { method: 'POST', body: form }); }
