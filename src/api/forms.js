const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';

async function submit(path, payload) {
  if (!apiBase) return { id: crypto.randomUUID(), ...payload, demo: true };
  const response = await fetch(`${apiBase}${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`提交失败：${response.status}`);
  return response.json();
}

export const submitLead = (payload) => submit('/api/leads', payload);
export const submitTicket = (payload) => submit('/api/tickets', payload);
