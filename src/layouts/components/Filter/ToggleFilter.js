import React, { useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const ToggleFilter = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={cx('filter-by', {
                active: isOpen,
            })}
        >
            <div className={cx('heading')}>
                <h2 className={cx('title')}>{title}</h2>
                <button onClick={handleToggleFilter} className={cx('toggle')}>
                    <i className="bx bx-chevron-down"></i>
                </button>
            </div>
            <div className={cx('content')}>
                <div className={cx('inner')}>{children}</div>
            </div>
        </div>
    );
};

export default ToggleFilter;
