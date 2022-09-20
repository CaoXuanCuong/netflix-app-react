import React, { useEffect, useRef, useState } from 'react';
import apiConfig from '~/api/apiConfig';
import tmdbApi from '~/api/tmdbApi';
import EpisodeList from './EpisodeList';
import styles from '../Selection.module.scss';
import classNames from 'classnames/bind';
import useDidMountEffect from '~/hooks/useDidMountEffect';

const cx = classNames.bind(styles);

const SeasonList = ({ id, currentEpisode, currentSeason, seasons: seasonsTv, onChooseEpisode = () => {} }) => {
    const [seasons, setSeasons] = useState([]);
    const [open, setOpen] = useState(1);
    const tabRef = useRef();
    useEffect(
        () => {
            const fetchApi = async () => {
                const res = await Promise.all(seasonsTv.map((s) => tmdbApi.season(id, s.season_number))).then((data) =>
                    data.reduce((acc, cur) => [...acc, cur], []),
                );
                setSeasons(res);
            };
            fetchApi();
        },
        // eslint-disable-next-line
        [],
    );

    useDidMountEffect(() => {
        if (open === null) return;
        tabRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
    }, [open]);

    function handleOpenSeasonTab(e, season) {
        if (open === season.season_number) {
            setOpen(null);
        } else {
            setOpen(season.season_number);
            tabRef.current = e.target.parentElement;
        }
    }
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Other Episodes</h3>
            <ul className={cx('list')}>
                {seasons.map((season) => (
                    <li key={season.id} className={cx('item')}>
                        <button
                            onClick={(e) => {
                                handleOpenSeasonTab(e, season);
                            }}
                            className={cx('info')}
                        >
                            <div className={cx('poster')}>
                                <div
                                    className={cx('poster-img')}
                                    style={{ backgroundImage: `url(${apiConfig.w500Image(season.poster_path)})` }}
                                ></div>
                            </div>
                            <div className={cx('chapter')}>
                                <h3 className={cx('name')}>{season.name}</h3>
                                <p className={cx('number-episodes')}>Episodes: {season.episodes.length}</p>
                            </div>
                        </button>
                        {open === season.season_number && (
                            <EpisodeList
                                onChooseEpisode={onChooseEpisode}
                                currentSeason={currentSeason}
                                currentEpisode={currentEpisode}
                                isOpen={open}
                                episodes={season.episodes}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeasonList;
