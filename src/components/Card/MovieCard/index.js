import PropTypes from 'prop-types';

import styles from './MovieCard.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import apiConfig from '~/api/apiConfig';
import { useRef, useEffect } from 'react';
import CardSkeleton from '../CardSkeleton';
import { category } from '~/api/tmdbApi';

const cx = classNames.bind(styles);

function MovieCard({ movie, category: cate }) {
    const location = useLocation();
    const cardRef = useRef(null);
    const bgRef = useRef(null);
    const link = category[cate] !== category.person ? '/detail/' + category[cate] + '/' + movie.id : location.search;

    useEffect(() => {
        const bg = apiConfig.w500Image(movie.poster_path || movie.backdrop_path || movie.profile_path);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0.1) {
                        if (bgRef.current) bgRef.current.style.backgroundImage = `url(${bg})`;
                    }
                });
            },
            {
                threshold: [0, 0.1, 1],
            },
        );

        observer.observe(cardRef.current);

        return () => {
            observer.disconnect();
        };
    }, [movie]);

    return (
        <Link to={link}>
            <div ref={cardRef}>
                <div ref={bgRef} className={cx('movie-card')}>
                    <button className={cx('play')}>
                        <i className="bx bx-play"></i>
                    </button>
                </div>
                <h3 className={cx('name')}>{movie.title || movie.name}</h3>
            </div>
        </Link>
    );
}

const Loading = () => {
    return (
        <>
            <CardSkeleton className={cx('loading')} />
        </>
    );
};

MovieCard.Loading = Loading;

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
    category: PropTypes.string,
};

export default MovieCard;
