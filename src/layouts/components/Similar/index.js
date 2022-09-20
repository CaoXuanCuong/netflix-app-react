import React from 'react';

import classNames from 'classnames/bind';
import styles from './Similar.module.scss';
import MovieListCol from '~/components/Card/MovieListCol';
const cx = classNames.bind(styles);
const Similar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <h3 className={cx('title')}>More like this</h3>
                <MovieListCol get="similar" />
            </div>
        </div>
    );
};

export default Similar;
