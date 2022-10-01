import React from 'react';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import routes from '~/configs/routes';

const cx = classNames.bind(styles);
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('not-found')}>
        <div className={cx('content')}>
            <h3 className={cx('status')}>404</h3>
            <p className={cx('error')}>Page Not Found 😓</p>
            <Button typeBtn='primary' onClick={()=>navigate(routes.home)}>Go to Homepage</Button>
        </div>
    </div>
  )
}

export default NotFound
