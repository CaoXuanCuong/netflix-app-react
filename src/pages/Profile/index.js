import React from 'react'
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Infomation from '~/components/Infomation';

const cx = classNames.bind(styles);
const Profile = () => {
  return (
    <div className={cx('profile')}>
        <h2 className={cx('title')}>Profile</h2>
        <Infomation />
    </div>
  )
}

export default Profile
