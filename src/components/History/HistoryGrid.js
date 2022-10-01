import React, { useContext, useEffect, useState } from 'react'
import styles from '../Card/MovieGrid/MovieGrid.module.scss';
import classNames from 'classnames/bind';
import CardDelete from '../Card/MovieCard/CardDelete';
import images from '~/assets/images';
import { AuthContext } from '~/context/AuthContext';
import config from '~/configs';
import { Link } from 'react-router-dom';
import userApi from '~/api/userApi';
import { HISTORY_STORAGE_TOKEN_NAME } from '~/utils/constants';
const cx = classNames.bind(styles);

const HistoryGrid = ({currentTab}) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getHistory();
    }, [currentTab])

    const getHistory = async() => {
        let result = [];
        if(currentTab === 'account' && isAuthenticated) {
            const res = await userApi.getListHistory();
            result = res.history;
        }
        setHistory(currentTab === 'device' ? 
                    JSON.parse(localStorage.getItem(HISTORY_STORAGE_TOKEN_NAME)) || [] : 
                    result);
        setLoading(false);
    }
    const handleDeleteCard = async(id) => {
        switch(currentTab){
            case 'account': 
                await userApi.deleteHistory({
                    idMovie: id
                });
                break;
            case 'device':
                const newHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_TOKEN_NAME)).filter((movie) => (
                    movie.id !== id 
                ));
                localStorage.setItem(HISTORY_STORAGE_TOKEN_NAME, JSON.stringify(newHistory));
                break;
        }
        getHistory();
    }
    if(currentTab === 'account' && !isAuthenticated){
        return (
            <div className={cx('require-login')}>You need <Link to={config.routes.signin}>login</Link> to use this feature</div>
        )
    }
    return (
        <>
            <div className={cx('movie-grid')}>
                {!loading ? (
                    <>
                        {history.length === 0 ? (
                            <div className={cx('no-results')}>
                                <img src={images.noResults} alt="" />
                                <h3>Your recently watched films is empty. Let's watch some!</h3>
                            </div>
                        ) : (
                            history.slice(0).reverse().map((result, index) => (
                            <CardDelete movie={result} key={index} history={history} onDeleteCard={handleDeleteCard} />
                            ))
                        )}
                    </>
                    ) : (
                        Array(10).fill(0).map((_, index) => (
                        <CardDelete.Loading key={index} />
                    ))
                )}
            </div>    
        </>
    );
}

export default HistoryGrid
