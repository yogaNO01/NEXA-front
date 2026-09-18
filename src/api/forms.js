import { apiBase } from './base.js';

async function submit(path, payload) {
  if (!apiBase) throw new Error('未配置 VITE_API_BASE_URL，无法提交表单');
  const response = await fetch(`${apiBase}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`提交失败：${response.status}`);
  return response.json();
}

export const submitLead = (payload) => submit('/api/leads', payload);
export const submitTicket = (payload) => submit('/api/tickets', payload);
