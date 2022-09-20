import React from 'react';
import classNames from 'classnames/bind';
import styles from './HorizontalCard.module.scss';
import apiConfig from '~/api/apiConfig';
import { category as cate } from '~/api/tmdbApi';
import { Link } from 'react-router-dom';
import CardSkeleton from '../CardSkeleton';
const cx = classNames.bind(styles);

const Horizontal = ({ movie, category }) => {
    const bg = apiConfig.w500Image(movie.poster_path || movie.backdrop_path || movie.profile_path);
    const link = '/detail/' + cate[category] + '/' + movie.id;

    return (
        <Link key={movie.id} to={link}>
            <div className={cx('item')}>
                <img className={cx('poster')} alt="Poster" src={bg} />
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{movie.title || movie.name}</h3>
                    <p className={cx('date')}>{movie.release_date || movie.first_air_date}</p>
                </div>
            </div>
        </Link>
    );
};

const Loading = () => {
    return (
        <div className={cx('item')}>
            <CardSkeleton className={cx('poster')} />
            <div className={cx('info')}>
                <CardSkeleton width="100%" height={20} className={cx('title')} />
                <CardSkeleton width="100%" height={20} className={cx('date')} />
            </div>
        </div>
    );
};

Horizontal.Loading = Loading;

export default Horizontal;
