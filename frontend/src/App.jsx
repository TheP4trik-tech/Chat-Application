import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import AuthPage from './pages/AuthPage.jsx'
import About from './pages/About.jsx'
import Settings from './pages/Settings.jsx'
import Users from './pages/Users.jsx'
import Chats from './pages/Chats.jsx'
import Chat from './pages/Chat.jsx'
import {Navigate, Route, Routes, useLocation} from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function PageTransition({ children }) {
    const prefersReducedMotion = useReducedMotion()

    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    )
}

function App() {
    const location = useLocation()

    return(
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path="/profile" element={<ProtectedRoute><Profile /> </ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><Users /> </ProtectedRoute>}  />
            <Route path="/chats" element={<ProtectedRoute><Chats /> </ProtectedRoute>} />
            <Route path="/chat/:id" element={<ProtectedRoute><Chats /> </ProtectedRoute>} />
            <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route index element={<Navigate to="/about" replace />} />
        </Routes>
    </AnimatePresence>
    )
}

export default App
