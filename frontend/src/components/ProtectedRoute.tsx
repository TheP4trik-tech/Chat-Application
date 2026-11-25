import { Navigate } from 'react-router'
export function ProtectedRoute({children}) {
    // check if the user is logged in, if not, redirect to the login page
    // JWT is stored in local storage, User can "fake" it, but he will get rejected by the server
    const token = localStorage.getItem('token')
    if (token !== null) {
        return children
    }
    else{
        return <Navigate to="/" replace />
    }


}