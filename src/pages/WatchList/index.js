import React, { useEffect, useState } from 'react'
import styles from './WatchList.module.scss';
import classNames from 'classnames/bind';
import MovieCard from '~/components/Card/MovieCard';
import images from '~/assets';
import axios from 'axios';
import userApi from '~/api/userApi';
const cx = classNames.bind(styles);

const WatchList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        const getDetail = async () => {
            const res = await userApi.getListFavorites();
            setMovies(res.favorites || []);
            setLoading(false);
        };
        getDetail();
    }, []);

    return (
        <div className={cx('favorite')}>
            <h3 className={cx('title')}>WATCHLIST</h3>
            <div className={cx('movie-grid')}>
                {!loading ? (
                    <>
                        {movies.length === 0 ? (
                            <div className={cx('no-results')}>
                                <img src={images.noResults} alt="" />
                                <h3>Your recently watched films for this type is empty. Let's watch some!</h3>
                            </div>
                        ) : (
                            movies.slice(0).reverse().map((result, index) => (
                                <MovieCard movie={result} key={index} category={result.type} />
                            ))
                        )}
                    </>
                    ) : (
                        Array(10).fill(0).map((_, index) => (
                        <MovieCard.Loading key={index} />
                    ))
                )}
            </div>    
        </div>
    )
} 

export default WatchList;
