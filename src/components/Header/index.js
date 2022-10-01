import PropTypes from 'prop-types';
import { category as cate } from '~/api/tmdbApi';
import Navbar from '../Navbar';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/context/AuthContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);
const headerNav = [
    {
        display: 'Movies',
        category: cate.movie,
    },
    {
        display: 'TV Series',
        category: cate.tv,
    },
];
function Header({ category, onChangeCate }) {
    const {
        authState: { isAuthenticated, user },
    } = useContext(AuthContext);
    return (
        <div className={cx('header')}>
            <div className={cx('wrapper')}>
                <Navbar items={headerNav} category={category} onClick={onChangeCate} />
                {isAuthenticated && (
                    <div className={cx('user')}>
                        <img className={cx('avatar')} src={user.avatar} alt="Logo" />
                        <span>{user.fullname}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

Header.propTypes = {
    className: PropTypes.string,
    onChangeCate: PropTypes.func,
};

export default Header;
