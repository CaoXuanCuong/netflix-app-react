import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation,  useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import config from '~/configs';
import { BookMarkedIcon, ExploreIcon, HistoryIcon, HomeIcon, ProfileIcon, SearchIcon, SigninIcon, SignoutIcon } from '~/components/Icons';
import { AuthContext } from '~/context/AuthContext';
import MovieSearch from '~/components/Search';
const cx = classNames.bind(styles);

const Sidebar = ({ collapse }) => {
    const {
        authState: { isAuthenticated },
        logout
    } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const navigate = useNavigate();
    const location = useLocation();
    const checkboxRef = useRef(null);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });

        return () =>
        window.removeEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

    useEffect(()=> {
        checkboxRef.current.checked = false;
    }, [location.pathname])
    const handleNavigate = (url) => {
        if(!isAuthenticated) {
            toast.info("Please login first to use this feature", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return;
        }
        navigate(url);
    }

    const handleLogout = () => {
        logout();
        toast.success('Logout Success!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <>
            <ToastContainer style={{fontSize: 15}} />
            <MovieSearch popup={true} open={open} onClosePopUp={()=>setOpen(false)} />
            <div className={cx('navbar')}>
                <Link to={config.routes.home}>
                    <div className={cx('logo-img')}></div>
                </Link>
                <label htmlFor='menu-nav' className={cx('toggle-menu')}>
                    <i className='bx bx-menu'></i>
                </label>
            </div>
            <input type='checkbox' ref={checkboxRef} id='menu-nav' className={cx('menu-checkbox')} />
            <div
                className={cx('sidebar', {
                    collapse: (width > 624 && width < 1024) || (collapse && width > 624) ? true : false,
                })}
            >
                <div className={cx('inner')}>
                    <Link to={config.routes.home}>
                        <div className={cx('logo-img')}></div>
                    </Link>
                    <div className={cx('search')}>
                        {
                            (width > 624 && width < 1024) || (collapse && width > 624) ? (
                                <button onClick={()=>setOpen(true)} className={cx('search-btn')}>
                                    <SearchIcon />
                                </button>
                                ) : (
                                <MovieSearch />
                            )
                        }
                    </div>                
                    <div className={cx('menu')}>
                        <div className={cx('list-menu')}>
                            <Link className={cx('menu-item',
                                { active: location.pathname === config.routes.home })}
                                to={config.routes.home}
                            >
                                <span className={cx('icon')}>
                                    <HomeIcon />
                                </span>
                                <span className={cx('page')}>Home</span>
                            </Link>
                            <Link
                                className={cx('menu-item', 
                                { active: location.pathname === config.routes.explore })}
                                to={config.routes.explore}
                            >
                                <span className={cx('icon')}>
                                    <ExploreIcon />
                                </span>
                                <span className={cx('page')}>Library</span>
                            </Link>
                            <button
                                className={cx('menu-item', 
                                { active: location.pathname === config.routes.watchlist })}
                                onClick={()=> handleNavigate(config.routes.watchlist)}
                            >
                                <span className={cx('icon')}>
                                    <BookMarkedIcon />
                                </span>
                                <span className={cx('page')}>Watchlist</span>
                            </button>
                            <Link
                                className={cx('menu-item', 
                                { active: location.pathname === config.routes.history })}
                                to={config.routes.history}
                            >
                                <span className={cx('icon')}>
                                    <HistoryIcon />
                                </span>
                                <span className={cx('page')}>History</span>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('menu')}>
                        <h2 className={cx('title')}>ACCOUNT</h2>
                        <div className={cx('list-menu')}>
                            <button
                                className={cx('menu-item', 
                                { active: location.pathname === config.routes.profile })}
                                onClick={()=>handleNavigate(config.routes.profile)}
                            >
                                <span className={cx('icon')}>
                                    <ProfileIcon />
                                </span>
                                <span className={cx('page')}>Profile</span>
                            </button>

                            {!isAuthenticated ? (
                                <Link
                                    className={cx('menu-item', 
                                    { active: location.pathname === config.routes.signin })}
                                    to={config.routes.signin}
                                >
                                    <span className={cx('icon')}>
                                        <SigninIcon  />
                                    </span>
                                    <span className={cx('page')}>Sign In</span>
                                </Link>
                            ) : (
                                <button
                                    className={cx('menu-item')}
                                    onClick={()=> handleLogout()}
                                >
                                    <span className={cx('icon')}>
                                        <SignoutIcon />
                                    </span>
                                    <span className={cx('page')}>Log out</span>
                                </button>
                            )}
                        </div>
                    </div>          
                </div>
            </div>
            <label htmlFor='menu-nav' className={cx('overlay')}></label>
        </>
    );
};

export default Sidebar;
