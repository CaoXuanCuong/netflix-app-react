import React from 'react';

import apiConfig from '~/api/apiConfig';

import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CastList = ({ casts }) => {
    const newCasts = [...casts];
    return (
        <div className={cx('casts')}>
            {newCasts.splice(0, 8).map((cast, index) => (
                <div key={index} className={cx('cast-item')}>
                    <img className={cx('cast-img')} src={apiConfig.w500Image(cast.profile_path)} alt="Cast" />
                    <div className={cx('character')}>
                        <span className={cx('cast-name')}>{cast.name}</span>
                        <p className={cx('cast-character')}>{cast.character}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CastList;
