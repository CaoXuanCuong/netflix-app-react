import React from 'react';
import apiConfig from '~/api/apiConfig';
import styles from '../Selection.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EpisodeList = ({ episodes, currentEpisode, currentSeason, onChooseEpisode }) => {
    return (
        <div className={cx('episodes')}>
            {episodes.map((episode) => (
                <button
                    key={episode.id}
                    className={cx('item', {
                        flex: true,
                        active: currentSeason === episode.season_number && currentEpisode === episode.episode_number,
                    })}
                    onClick={() => {
                        onChooseEpisode(episode);
                    }}
                >
                    <h3 className={cx('episode-number')}>{episode.episode_number}</h3>
                    <div className={cx('info')}>
                        <div className={cx('poster')}>
                            <div
                                className={cx('poster-img')}
                                style={{ backgroundImage: `url(${apiConfig.w500Image(episode.still_path)})` }}
                            ></div>
                        </div>

                        <div className={cx('chapter')}>
                            <h4 className={cx('name')}>{episode.name}</h4>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default EpisodeList;
