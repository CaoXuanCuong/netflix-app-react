import React, { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import Nouislider from 'nouislider-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useCurrentParams from '~/hooks/useCurrentParams';
import useDidMountEffect from '~/hooks/useDidMountEffect';
const cx = classNames.bind(styles);

const RuntimeFilter = () => {
    const MAX_VALUE = 255;
    const [minRuntime, setMinRuntime] = useState(0);
    const [maxRuntime, setMaxRuntime] = useState(255);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = useCurrentParams();
    const location = useLocation();

    const MIN = searchParams.get('with_runtime.gte') ?? 0;
    const MAX = searchParams.get('with_runtime.lte') || MAX_VALUE;

    const timeoutRef = useRef(null);
    useEffect(() => {
        setMinRuntime(Number(MIN));
        setMaxRuntime(Number(MAX));
    }, 
    //eslint-disable-next-line
    [location.search]);

    useDidMountEffect(() => {
        if (!Object.keys(currentParams).length && !minRuntime && maxRuntime === MAX_VALUE) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const minValue = 'with_runtime.gte';
        const maxValue = 'with_runtime.lte';

        timeoutRef.current = setTimeout(() => {
            setSearchParams({
                ...currentParams,
                [minValue]: minRuntime,
                [maxValue]: maxRuntime,
            });
        }, 500);
    }, [minRuntime, maxRuntime]);

    const handleDragSlider = ([], handle, [minValue, maxValue]) => {
        if (handle === 0) {
            setMinRuntime(Math.floor(minValue));
        } else {
            setMaxRuntime(Math.floor(maxValue));
        }
    };

    return (
        <div className={cx('section')}>
            <h3>Runtime</h3>
            <div className={cx('range-slider')}>
                <Nouislider
                    range={{ min: 0, max: MAX_VALUE }}
                    start={[MIN, MAX]}
                    step={1}
                    onSlide={handleDragSlider}
                    connect
                />
            </div>
            <div className={cx('value-slider')}>
                <span>
                    To <strong>{minRuntime}</strong> min
                </span>
                <span>
                    From <strong>{maxRuntime}</strong> min
                </span>
            </div>
        </div>
    );
};

export default RuntimeFilter;
