import { useState } from "react";
import { apiRequest } from "../api/http";
export function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest(`/auth/${mode === "login" ? "login" : "signup"}`, { method: "POST", body: JSON.stringify(form) });
      onAuth(data);
    } catch (err) { setError(err.message); }
  }
  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-emerald-50 p-4 dark:from-zinc-950 dark:to-zinc-900"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"><h1 className="mb-1 text-2xl font-bold">Vi Notes</h1><p className="mb-4 text-sm text-stone-500">Private writing sessions with smart autosave.</p>{mode === "signup" && <input className="mb-3 w-full rounded-lg border p-2 dark:border-zinc-700 dark:bg-zinc-800" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />}<input className="mb-3 w-full rounded-lg border p-2 dark:border-zinc-700 dark:bg-zinc-800" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /><input className="mb-3 w-full rounded-lg border p-2 dark:border-zinc-700 dark:bg-zinc-800" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />{error && <p className="mb-3 text-sm text-red-500">{error}</p>}<button className="w-full rounded-lg bg-zinc-900 py-2 text-white dark:bg-emerald-500 dark:text-zinc-900">{mode === "login" ? "Login" : "Sign up"}</button><button type="button" className="mt-3 w-full text-sm text-stone-500" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}</button></form></div>;
}
