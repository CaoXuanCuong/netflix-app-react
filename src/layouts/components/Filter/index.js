import React from 'react';
import SortBy from './SortBy';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import FilterBy from './FilterBy';
import Button from '~/components/Button';
import { useLocation, useSearchParams } from 'react-router-dom';
import useScrollTop from '~/hooks/useScrollTop';

const cx = classNames.bind(styles);
const Filter = () => {
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();

    useScrollTop(location);
    return (
        <div className={cx('filter')}>
            <SortBy />
            <FilterBy />
            <Button typeBtn={`dark full ${location.search || 'disabled'}`} onClick={() => setSearchParams({})}>
                <i className="bx bx-revision"></i>
                Reset Filters
            </Button>
        </div>
    );
};

export default Filter;
