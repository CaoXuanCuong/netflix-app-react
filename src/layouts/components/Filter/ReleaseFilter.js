import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import Nouislider from 'nouislider-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useCurrentParams from '~/hooks/useCurrentParams';
import { AppContext } from '~/context/AppContext';
import useDidMountEffect from '~/hooks/useDidMountEffect';
const cx = classNames.bind(styles);

const ReleaseFilter = () => {
    const { category } = useContext(AppContext);
    let date = new Date();
    const FROM_YEAR = 1880;
    const TO_YEAR = date.getFullYear();
    const API = category === 'movie' ? 'release_date' : 'air_date';

    const [fromYear, setFromYear] = useState(FROM_YEAR);
    const [toYear, setToYear] = useState(TO_YEAR);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = useCurrentParams();
    const location = useLocation();

    const MIN = searchParams.get(`${API}.gte`) || FROM_YEAR;
    const MAX = searchParams.get(`${API}.lte`) || TO_YEAR;

    const timeoutRef = useRef(null);

    useEffect(() => {
        setFromYear(MIN);
        setToYear(MAX);
    },
    //eslint-disable-next-line
    [location.search]);

    useDidMountEffect(() => {
        if (!Object.keys(currentParams).length && fromYear === FROM_YEAR && toYear === TO_YEAR) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const minValue = `${API}.gte`;
        const maxValue = `${API}.lte`;

        timeoutRef.current = setTimeout(() => {
            setSearchParams({
                ...currentParams,
                [minValue]: fromYear,
                [maxValue]: toYear,
            });
        }, 500);
    }, [toYear, fromYear]);

    const handleDragSlider = ([], handle, [minValue, maxValue]) => {
        if (handle === 0) {
            setFromYear(Math.floor(minValue));
        } else {
            setToYear(Math.floor(maxValue));
        }
    };

    return (
        <div className={cx('section')}>
            <h3>Released in</h3>
            <div className={cx('range-slider')}>
                <Nouislider
                    range={{ min: FROM_YEAR, max: TO_YEAR }}
                    start={[MIN, MAX]}
                    step={1}
                    onSlide={handleDragSlider}
                    connect
                />
            </div>
            <div className={cx('value-slider')}>
                <span>
                    <strong>{fromYear}</strong>
                </span>
                <span>
                    <strong>{toYear}</strong>
                </span>
            </div>
        </div>
    );
};

export default ReleaseFilter;
