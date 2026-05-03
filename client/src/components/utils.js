export function formatDistanceToNow(date) {
  const d = new Date(date).getTime();
  const diffSec = Math.floor((Date.now() - d) / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

export function parseTags(value) {
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}
