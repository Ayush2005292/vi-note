import { createContext, useEffect, useMemo, useState } from "react";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("vi_token"));
  const [user, setUser] = useState(() => { const raw = localStorage.getItem("vi_user"); return raw ? JSON.parse(raw) : null; });
  useEffect(() => { if (token) localStorage.setItem("vi_token", token); else localStorage.removeItem("vi_token"); }, [token]);
  useEffect(() => { if (user) localStorage.setItem("vi_user", JSON.stringify(user)); else localStorage.removeItem("vi_user"); }, [user]);
  const value = useMemo(() => ({ token, user, login: (payload) => { setToken(payload.token); setUser(payload.user); }, logout: () => { setToken(null); setUser(null); } }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
