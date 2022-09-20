import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import CastList from './CastList';
import VideoList from './VideoList';
import Button from '~/components/Button';
import { StarIcon } from '~/components/Icons';
import { category as cate } from '~/api/tmdbApi';
import CardSkeleton from '~/components/Card/CardSkeleton';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import Similar from '~/layouts/components/Similar';
import Sidebar from '~/layouts/components/Sidebar';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '~/context/AuthContext';
import message from '~/utils/message';
import userApi from '~/api/userApi';
const cx = classNames.bind(styles);

const Detail = () => {
    const { authState: { isAuthenticated }} = useContext(AuthContext);
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [currentTab, setCurrentTab] = useState('overall');

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        const getDetail = async () => {
            if(isAuthenticated) {
                const resFavorite = await userApi.getListFavorites();
                const isFavorite = resFavorite.favorites.some((item)=> item.id === Number(id));
                setFavorite(isFavorite);   
            }
            const res = await tmdbApi.detail(category, id, { params: {} });
            setItem(res);
            setLoading(false);
        };
        getDetail();
    }, [category, id]);

    const handleAddFavorite = async(movie) => {
        if(!isAuthenticated){
            message('info', 'Please login to use this feature');
            return;
        }
        await userApi.addFavorite({
            id: movie.id,
            type: category,
            name: movie.name || movie.title,
            poster_path: movie.poster_path,
        }); 
        message('success', 'This film has been added to your watchlist'); 
        setFavorite(true);   
    }

    const handleRemoveFavorite = async(id) => {
        await userApi.deleteFavorite({
            idMovie: id
        });     
        message('success', 'This film has been remove from your watchlist'); 
        setFavorite(false);
    }
    return (
        <>
            <ToastContainer style={{fontSize: 15}} />
            <div className="d-flex m-col">
                <Sidebar collapse />
                <div className="main"> 
                    <div className={cx('content')}>
                        {!loading ? (
                            <>
                                <div
                                    className={cx('banner')}
                                    style={{
                                        backgroundImage: `url(${apiConfig.originalImage(
                                            item.detail.backdrop_path || item.detail.poster_path,
                                        )})`,
                                    }}
                                ></div>
                                <div className={cx('movie-content')}>
                                    <div className={cx('poster')}>
                                        <div
                                            className={cx('poster-img')}
                                            style={{
                                                backgroundImage: `url(${apiConfig.originalImage(
                                                    item.detail.poster_path || item.detail.backdrop_path,
                                                )})`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className={cx('info')}>
                                        <h1 className={cx('title')}>{item.detail.title || item.detail.name}</h1>
                                        <div className={cx('genres')}>
                                            {item.detail.genres &&
                                                item.detail.genres.slice(0, 6).map((genre) => (
                                                    <Button
                                                        key={genre.id}
                                                        className={cx('genres-item')}
                                                        onClick={() => navigate(`/explore?with_genres=${genre.id}`)}
                                                    >
                                                        {genre.name}
                                                    </Button>
                                                ))}
                                        </div>
                                        <div className={cx('rating')}>
                                            <div className={cx('description')}>
                                                <StarIcon className={cx('star')} />
                                                <span>{Number(item.detail.vote_average).toFixed(1)}/10</span>
                                            </div>
                                            <div className={cx('description')}>
                                                <span>Age Ratings:</span>
                                                <span>
                                                    <p>{item.rating}</p>
                                                </span>
                                            </div>
                                            <div className={cx('description')}>
                                                <span>Language:</span>
                                                <span>{item.detail.original_language}</span>
                                            </div>
                                        </div>
                                        <div className={cx('watch')}>
                                            <Button typeBtn="primary" onClick={() => navigate(`/${category}/${id}/watch`)}>
                                                Watch
                                            </Button>
                                            {!favorite ? (
                                                <Button typeBtn="outline" onClick={()=>handleAddFavorite(item.detail)}>
                                                    Add to Watchlist
                                                </Button>
                                            ) : (
                                                <Button typeBtn="outline" onClick={()=>handleRemoveFavorite(item.detail.id)}>
                                                    Remove from Watchlist
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
    
                                <div className="mx-2">
                                    <div className={cx('tabs')}>
                                        <button
                                            className={currentTab === 'overall' ? cx('active') : null}
                                            onClick={() => setCurrentTab('overall')}
                                        >
                                            Overall
                                        </button>
                                        <button
                                            className={currentTab === 'cast' ? cx('active') : null}
                                            onClick={() => setCurrentTab('cast')}
                                        >
                                            Cast
                                        </button>
                                    </div>
    
                                    <div className={cx('result')}>
                                        {currentTab === 'overall' && (
                                            <div className={cx('infomation')}>
                                                <div className={cx('detail')}>
                                                    <h4>STORY</h4>
                                                    {item.detail.tagline && (
                                                        <h3 className={cx('slogan')}>{item.detail.tagline}</h3>
                                                    )}
                                                    <p>{item.detail.overview}</p>
                                                </div>
                                                <div className={cx('detail')}>
                                                    <h4>DETAILS</h4>
                                                    <div>
                                                        {category === cate.movie ? (
                                                            <p>Runtime: {item.detail.runtime} min</p>
                                                        ) : (
                                                            <p>Ep Runtime: {item.detail.episode_run_time} min</p>
                                                        )}
                                                        <p>Status: {item.detail.status}</p>
                                                        {category === cate.movie ? (
                                                            <p>Release date: {item.detail.release_date}</p>
                                                        ) : (
                                                            <p>Premiered: {item.detail.first_air_date}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {currentTab === 'cast' && (
                                            <div className={cx('infomation')}>
                                                <CastList casts={item.casts} />
                                            </div>
                                        )}
                                        <div className={cx('trailer-detail')}>
                                            <VideoList videos={item.media} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Loading />
                        )}
                    </div>
                    <div className={cx('left-side-bar')}>
                        <Similar />
                    </div>
    
                </div>
            </div>
        </>
    );
};

const Loading = () => {
    return (
        <>
            <CardSkeleton className={cx('banner')} />
            <div className={cx('movie-content')}>
                <div className={cx('poster')}>
                    <CardSkeleton width="100%" height="100%" className={cx('poster-img')} />
                </div>
                <div className={cx('info')}>
                    <CardSkeleton width="100%" height={50} className={cx('title')} />
                    <div className={cx('genres')}>
                        <CardSkeleton width={80} height={25} />
                        <CardSkeleton width={80} height={25} />
                        <CardSkeleton width={80} height={25} />
                    </div>
                </div>
            </div>
            <div className="mx-2">
                <div className={cx('tabs')}>
                    <CardSkeleton width={200} height={25} />
                </div>

                <div className={cx('result')}>
                    <div className={cx('infomation')}>
                        <div className={cx('detail')}>
                            <CardSkeleton width="100%" height={250} />
                        </div>
                    </div>

                    <div className={cx('trailer-detail')}>
                        <CardSkeleton width="100%" height={250} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
