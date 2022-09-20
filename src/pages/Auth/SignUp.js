import React from 'react'
import classNames from 'classnames/bind'
import styles from './Auth.module.scss';
import config from '~/configs';
import { Link } from 'react-router-dom';
import RegisForm from '~/components/Auth/RegisForm';
const cx = classNames.bind(styles);
const SignUp = () => {
  return (
    <div className={cx('auth')}>
        <h2 className={cx('title')}>Create your account</h2>
        <RegisForm />
        <div className={cx('switch-form')}>
          Already have an account? <Link to={config.routes.signin} className={cx('link')}>Sign in</Link>
        </div>
    </div>
  )
}

export default SignUp
