const API_TEXT_START = '\u2063api-text:';
const API_TEXT_END = ':api-text\u2063';

const nonTextKeys = new Set([
  'id', 'slug', 'groupId', 'group_id', 'image', 'image_url', 'coverImage',
  'cover_image', 'background', 'published_at', 'created_at', 'updated_at',
  'href', 'url', 'path', 'body',
]);

export const markApiText = (value, key = '') => {
  if (typeof value === 'string') {
    if (value.includes(API_TEXT_START)) return value;
    return nonTextKeys.has(key) ? value : `${API_TEXT_START}${value}${API_TEXT_END}`;
  }
  if (Array.isArray(value)) return value.map((item) => markApiText(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, markApiText(item, name)]));
  }
  return value;
};

export const unwrapApiText = (value) => {
  if (typeof value !== 'string' || !value.includes(API_TEXT_START)) return null;
  return value.replace(/\u2063api-text:([\s\S]*?):api-text\u2063/g, '$1');
};
