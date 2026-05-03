const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
function getHeaders(token) { return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }; }
export async function apiRequest(path, options = {}, token) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { ...getHeaders(token), ...(options.headers || {}) } });
  if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err.message || "Request failed"); }
  if (response.status === 204) return null;
  return response.json();
}
