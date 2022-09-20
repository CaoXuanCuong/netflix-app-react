import React, { useContext } from 'react';
import MovieGrid from '~/components/Card/MovieGrid';
import Navbar from '~/components/Navbar';
import { category as cate } from '~/api/tmdbApi';
import { AppContext } from '~/context/AppContext';
import { useSearchParams } from 'react-router-dom';

import styles from './Explore.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import Filter from '~/layouts/components/Filter';
import { FilterIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
const exploreNav = [
    {
        display: 'Movies',
        category: cate.movie,
    },
    {
        display: 'TV Series',
        category: cate.tv,
    },
];

const Explore = () => {
    const { category, handleSetCategory } = useContext(AppContext);
    const [, setSearchParams] = useSearchParams();

    const handleChangeCate = (cate) => {
        handleSetCategory(cate);
        setSearchParams({});
    };
    return (
        <div className="d-flex m-col">
            <Sidebar collapse />
            <div className={cx('content')}>
                <div className={cx("container")}>
                    <div className={cx('heading')}>
                        <h3 className={cx('title')}>Browse</h3>
                    </div>
                    <div className={cx('selection')}>
                        <Navbar onClick={handleChangeCate} category={category} items={exploreNav} />
                        <label htmlFor='action-nav'>
                            <FilterIcon className={cx('filter-icon')} />
                        </label>
                    </div>
                    <MovieGrid category={category} />
                </div>
                <input className={cx('input-checked')} type='checkbox' id='action-nav' style={{display: 'none'}} />
                <div className={cx('filter')}>
                    <Filter />
                </div>
                <label htmlFor="action-nav" className={cx('overlay')}></label>
            </div>
        </div>
    );
};

export default Explore;
