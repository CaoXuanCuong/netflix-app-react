import React, { useContext } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import images from '~/assets'
import { AuthContext } from '~/context/AuthContext';
import config from '~/configs';

const AuthLayout = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) return <div>Loading...</div>
  return (
    <>
      {!isAuthenticated ? (
        <div className='auth-page'>
            <Link to={config.routes.home}>
              <img width="250px" className='mb-2' alt='Logo' src={images.netFlix} />
            </Link>
            <Outlet />
            <div className='mt-5 fs-14 text-center'>
              © NetFlix - Watch Online English Subtitles Movies Tv Series
            </div>
        </div>
      ) : (
        <Navigate to={config.routes.home} />
      )}
    </>
  )
}

export default AuthLayout
