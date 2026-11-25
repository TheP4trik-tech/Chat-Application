import AuthPage from './pages/AuthPage.jsx'
import Settings from './pages/Settings.jsx'
import Users from './pages/Users.jsx'
import Chats from './pages/Chats.jsx'
import Chat from './pages/Chat.jsx'
import {Route, Routes} from "react-router";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

function App() {
    return(
    <Routes>
        <ProtectedRoute path="/settings" element={<Settings />} />
        <ProtectedRoute path="/users"  />
        <ProtectedRoute path="/chats" element={<Chats />} />
        <ProtectedRoute path="/chat/:id" element={<Chat />} />
        <Route index element={<AuthPage />} />
    </Routes>
    )
}

export default App
