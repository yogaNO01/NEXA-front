const configuredApiBase = import.meta.env.VITE_API_BASE_URL ?? '';

// `auto` keeps local development and LAN access on the same configuration:
// localhost:5175 -> localhost:8000, 192.168.x.x:5175 -> 192.168.x.x:8000.
const resolvedApiBase = configuredApiBase === 'auto'
  ? `${window.location.protocol}//${window.location.hostname}:8000`
  : configuredApiBase === 'same-origin'
    ? window.location.origin
  : configuredApiBase;

export const apiBase = resolvedApiBase.replace(/\/$/, '');
