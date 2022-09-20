import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './CardSkeleton.module.scss';

const cx = classNames.bind(styles);
const CardSkeleton = ({ className, width, height }) => {
    const classes = cx('card-skeleton', {
        [className]: className,
    });
    return <div className={classes} style={{ width, height }}></div>;
};

CardSkeleton.propTypes = {
    className: PropTypes.string,
};

export default CardSkeleton;
