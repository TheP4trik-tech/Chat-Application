import { Navigate } from 'react-router'
export function ProtectedRoute({children}) {
    const token = localStorage.getItem('token')
    if (token !== null) {
        return children
    }
    else{
        return <Navigate to="/" replace />
    }


}