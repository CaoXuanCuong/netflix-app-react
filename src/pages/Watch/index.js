import React, { useContext, useEffect, useMemo, useState } from 'react';
import tmdbApi, { category as cate } from '~/api/tmdbApi';
import styles from './Watch.module.scss';
import classNames from 'classnames/bind';
import EmbedMovie from '~/components/EmbedVideo/EmbedMovie';
import EmbedTv from '~/components/EmbedVideo/EmbedTv';
import { useParams } from 'react-router-dom';
import Sidebar from '~/layouts/components/Sidebar';
import { StarIcon } from '~/components/Icons';
import SeasonList from '~/layouts/components/Selection/TV/SeasonList';
import Recommend from '~/layouts/components/Selection/Movie/Recommend';
import { AuthContext } from '~/context/AuthContext';
import axios from 'axios';
import userApi from '~/api/userApi';
import { HISTORY_STORAGE_TOKEN_NAME } from '~/utils/constants';
const cx = classNames.bind(styles);

const Watch = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [nameEpisode, setNameEpisode] = useState('');
    useEffect(
        () => {
            const fetchApi = async () => {
                let res;
                switch (category) {
                    case cate.tv:
                        res = await tmdbApi.detailTv(id, currentSeason, currentEpisode, { params: {} });
                        break;
                    case cate.movie:
                        res = await tmdbApi.detailMovie(id, { params: {} });
                        break;
                    default:
                        throw new Error('Invalid Category');
                }
                const result = res.detail || res;
                setItem(result);
                setNameEpisode(res.episode);
            };
            fetchApi();
        },
        // eslint-disable-next-line
        [id],
    );
    
    useMemo(()=>{
        if(item === null) return;

        const movie = {
            id: item.id,
            type: category,
            name: item.name || item.title,
            poster: item.poster_path,
            date: new Date(),
        };
        const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_TOKEN_NAME)) || [];
        history.some((movie) => {
            return movie.id === Number(id)
        }) || (
            localStorage.setItem(HISTORY_STORAGE_TOKEN_NAME, JSON.stringify([...history, movie]))  
        )
        if(isAuthenticated) {
            const fetchApi = async () => {
                await userApi.addHistory(movie);
            }
            fetchApi();
        }
    }, 
    // eslint-disable-next-line
    [item])

    const handleChooseEpisode = (episode) => {
        setCurrentSeason(episode.season_number);
        setCurrentEpisode(episode.episode_number);
        setNameEpisode(episode.name);
    };

    return (
        <>
            {item && (
                <div className="d-flex m-col">
                    <Sidebar collapse />
                    <div className={cx('main')}>
                        <div className={cx('watch')}>
                            <div className={cx('player')}>
                                {category === cate.movie ? (
                                    <EmbedMovie id={id} />
                                ) : (
                                    <EmbedTv id={id} s={currentSeason} e={currentEpisode} />
                                )}
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('heading')}>
                                    <div className={cx('content-left')}>
                                        <h3 className={cx('name')}>{item.name || item.title}</h3>
                                        <div className={cx('detail')}>
                                            <p className={cx('release')}>
                                                Release Date: {item.first_air_date || item.release_date}
                                            </p>

                                            <div className={cx('genres')}>
                                                {item.genres.map((genre) => (
                                                    <button key={genre.id}>{genre.name}</button>
                                                ))}
                                            </div>
                                            <div className={cx('rate')}>
                                                <StarIcon />
                                                <span>{Number(item.vote_average).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {category === cate.tv && (
                                        <div className={cx('content-right')}>
                                            <h3>{nameEpisode}</h3>
                                            <p>
                                                Season {currentSeason} - Episode {currentEpisode}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('over-view')}>
                                    <h3>Overview</h3>
                                    <p>{item.overview}</p>
                                </div>
                            </div>
                            <div className={cx('comment')}></div>
                        </div>
                        {category === cate.tv && (
                            <SeasonList
                                id={id}
                                seasons={item.seasons}
                                currentSeason={currentSeason}
                                currentEpisode={currentEpisode}
                                onChooseEpisode={handleChooseEpisode}
                            />
                        )}

                        {category === cate.movie && <Recommend />}
                    </div>
                </div>
            )}
        </>
    );
};

export default Watch;
