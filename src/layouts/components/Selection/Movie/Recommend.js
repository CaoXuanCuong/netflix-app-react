import React from 'react';
import styles from '../Selection.module.scss';
import classNames from 'classnames/bind';
import MovieListCol from '~/components/Card/MovieListCol';

const cx = classNames.bind(styles);
const Recommend = () => {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Recommendations</h3>
            <div className={cx('episodes')}>
                <MovieListCol heading="Recommendations" get="recommend" />
            </div>
        </div>
    );
};

export default Recommend;
