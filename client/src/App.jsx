import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
function InnerApp() { const auth = useAuth(); if (!auth.token) return <AuthPage onAuth={auth.login} />; return <DashboardPage token={auth.token} onLogout={auth.logout} />; }
export default function App() { return <AuthProvider><InnerApp /></AuthProvider>; }
