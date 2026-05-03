export function StatsBar({ session }) {
  const now = Date.now();
  const durationSec = session?.startTime ? Math.max(0, Math.floor((now - new Date(session.startTime).getTime()) / 1000)) : 0;
  const mm = String(Math.floor(durationSec / 60)).padStart(2, "0");
  const ss = String(durationSec % 60).padStart(2, "0");
  return <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-4"><div><p className="text-xs text-stone-500 dark:text-zinc-400">Word Count</p><p className="font-semibold">{session?.wordCount || 0}</p></div><div><p className="text-xs text-stone-500 dark:text-zinc-400">Session Time</p><p className="font-semibold">{mm}:{ss}</p></div><div><p className="text-xs text-stone-500 dark:text-zinc-400">Start</p><p className="font-semibold">{session?.startTime ? new Date(session.startTime).toLocaleTimeString() : "-"}</p></div><div><p className="text-xs text-stone-500 dark:text-zinc-400">Last Edit</p><p className="font-semibold">{session?.lastEditedAt ? new Date(session.lastEditedAt).toLocaleTimeString() : "-"}</p></div></div>;
}
