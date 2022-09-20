import React, { useEffect, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './MovieGrid.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets';

import MovieCard from '~/components/Card/MovieCard';
import tmdbApi, { category as cate } from '~/api/tmdbApi';
import { useRef } from 'react';
import useCurrentParams from '~/hooks/useCurrentParams';

const cx = classNames.bind(styles);

const emptyFn = () => {};
const MovieGrid = ({ category, onGetTotalResults = emptyFn }) => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const loadRef = useRef(null);

    const location = useLocation();

    const [searchParams] = useSearchParams();
    const currentParams = useCurrentParams();

    useEffect(
        () => {
            setLoading(true);
            const fetchApi = async () => {
                let res = null;
                let params = {};
                if (!searchParams.get('q')) {
                    switch (category) {
                        case cate.movie:
                            res = await tmdbApi.exploreMovie({ params: currentParams });
                            break;
                        case cate.tv:
                            res = await tmdbApi.exploreTv({ params: currentParams });
                            break;
                        default:
                            return new Error('Invalid Category');
                    }
                } else {
                    params = {
                        query: searchParams.get('q'),
                    };
                    res = await tmdbApi.search(category, { params });
                }
                setResults(res.results);
                setTotalPage(res.total_pages);
                onGetTotalResults(res.total_results);
                setLoading(false);
            };
            fetchApi();

            return () => {
                setPage(1);
            };
        },
        // eslint-disable-next-line
        [category, location.search],
    );

    useEffect(
        () => {
            if (!loadRef.current) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio <= 0) return;
                        let res = null;

                        const loadMore = async () => {
                            if (!searchParams.get('q')) {
                                const params = {
                                    page: page + 1,
                                    ...currentParams,
                                };

                                switch (category) {
                                    case cate.movie:
                                        res = await tmdbApi.exploreMovie({ params });
                                        break;
                                    case cate.tv:
                                        res = await tmdbApi.exploreTv({ params });
                                        break;
                                    default:
                                        return new Error('Invalid Category');
                                }
                            } else {
                                const params = {
                                    page: page + 1,
                                    query: searchParams.get('q'),
                                };
                                res = await tmdbApi.search(category, { params });
                            }
                            setResults([...results, ...res.results]);
                            setPage(page + 1);
                        };
                        loadMore();
                    });
                },
                {
                    threshold: [0, 0.1, 1],
                },
            );

            observer.observe(loadRef.current);

            return () => {
                observer.disconnect();
            };
        },
        // eslint-disable-next-line
        [results, page],
    );

    return (
        <>
            <div className={cx('movie-grid')}>
                {!loading ? (
                    results.length === 0 ? (
                        <div className={cx('no-results')}>
                            <img src={images.noResults} alt="" />
                            <h3>Oops! No Results Found :(</h3>
                        </div>
                    ) : (
                        results.map((result, index) => (
                            <MovieCard category={result.media_type || category} movie={result} key={index} />
                        ))
                    )
                ) : (
                    <>
                        {Array(20)
                            .fill(0)
                            .map((_, index) => (
                                <MovieCard.Loading key={index} />
                            ))}
                    </>
                )}
            </div>
            {page < totalPage ? (
                <div ref={loadRef} className={cx('load-more')}>
                    <i className="bx bx-loader"></i>
                </div>
            ) : null}
        </>
    );
};

export default MovieGrid;
