import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';

const Protected = ({children}) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) return <div className='spinner-container'>Loading...</div>
		
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/" />
    );
}

export default Protected
