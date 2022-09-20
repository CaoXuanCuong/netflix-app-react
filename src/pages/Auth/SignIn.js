import React from 'react'
import LoginForm from '~/components/Auth/LoginForm'
import classNames from 'classnames/bind'
import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';
import config from '~/configs';
import apiConfig from '~/api/apiConfig';

const cx = classNames.bind(styles);
const SignIn = () => {
  console.log(apiConfig.baseURL);
  return (
    <div className={cx('auth')}>
        <h2 className={cx('title')}>Sign in to your account</h2>
        <LoginForm />
        <div className={cx('switch-form')}>
          Don't have a account? <Link to={config.routes.signup} className={cx('link')}>Sign up</Link>
        </div>
    </div>
  )
}

export default SignIn
