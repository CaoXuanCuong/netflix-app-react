import PropTypes from 'prop-types';
import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Navbar = ({ items, category, onClick, className }) => {
    const classes = cx('nav', {
        [className]: className,
    });
    return (
        <nav className={classes}>
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        onClick(item.category);
                    }}
                    className={`${item.category === category ? cx('active') : ''}`}
                >
                    {item.display}
                </button>
            ))}
        </nav>
    );
};

Navbar.propTypes = {
    items: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChangeCate: PropTypes.func,
};

export default Navbar;
