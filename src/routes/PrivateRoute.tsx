import { Navigate } from 'react-router-dom';

export function PrivateRoute({children} : any) {
    const user = localStorage.getItem('user');

    return user ? children : <Navigate to='/' />
}