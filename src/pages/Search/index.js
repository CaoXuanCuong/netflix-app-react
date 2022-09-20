import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { category as cate } from '~/api/tmdbApi';

import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import Navbar from '~/components/Navbar';
import MovieGrid from '~/components/Card/MovieGrid';

const cx = classNames.bind(styles);

const filters = [
    {
        display: 'All',
        category: cate.multi,
    },
    {
        display: 'Movies',
        category: cate.movie,
    },
    {
        display: 'TV Series',
        category: cate.tv,
    },
    {
        display: 'Actors',
        category: cate.person,
    },
];

const SearchPage = () => {
    const [categorySearch, setCategorySearch] = useState(cate.multi);
    const [totalResults, setTotalResults] = useState(0);
    const [searchParams] = useSearchParams();

    const handleGetTotalResults = (total) => {
        setTotalResults(total);
    };

    const handleChangeCate = (category) => {
        setCategorySearch(category);
    };
    return (
        <>
            {searchParams.get('q') ? (
                <>
                    <div className={cx('result')}>
                        <Navbar items={filters} category={categorySearch} onClick={handleChangeCate} />

                        <h3>Search results for {`"${searchParams.get('q')}" (${totalResults} results found)`}</h3>
                    </div>

                    <MovieGrid onGetTotalResults={handleGetTotalResults} category={categorySearch} />
                </>
            ) : (
                <p>Search Film</p>
            )}
        </>
    );
};

export default SearchPage;
