import PropTypes from 'prop-types';
import Input from '~/components/Input';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Button from '../Button';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const MovieSearch = ({ keyword: key, popup, open, onClosePopUp = () => {} }) => {
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState(key ? key : '');

    const gotoSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate({
                pathname: '/search',
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    }, [keyword, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                gotoSearch();
                setKeyWord('');
                onClosePopUp(true);
            }
            else if (e.keyCode == 27) {
                onClosePopUp(true);
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, gotoSearch]);
    return (
        <>      
            {
                !popup ? (
                    <div className={cx('movie-search')}>
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                            onChange={(e) => setKeyWord(e.target.value)}
                            autoComplete='new-password'
                        />
                        <Button className="small" onClick={gotoSearch}>
                            <i className="bx bx-search"></i>
                        </Button>
                    </div>
                ) : (
                    <div className={cx("search-box", {
                        open
                    })}>
                        <div className={cx("container")}>
                            <a onClick={onClosePopUp} className={cx("close")} href="#close"></a>
                            <div className={cx("search-main")}>
                            <div className={cx("search-inner")}>
                                <input type="text" 
                                    className={cx("inputSearch")} 
                                    placeholder="Search..."
                                    value={keyword}
                                    onChange={(e) => setKeyWord(e.target.value)} 
                                />
                                <span className={cx("search-info")}>Press enter to search or ESC to close</span>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            }       
        </>
    );
};

MovieSearch.propTypes = {
    keyword: PropTypes.string,
};

export default MovieSearch;
