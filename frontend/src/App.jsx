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
        <ProtectedRoute>
        <Route path="/settings" element={<Settings />} />
        <Route path="/users"  />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route index element={<AuthPage />} />
        </ProtectedRoute>
    </Routes>
    )
}

export default App
