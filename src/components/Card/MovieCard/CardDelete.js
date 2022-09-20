import PropTypes from 'prop-types';

import styles from './MovieCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import apiConfig from '~/api/apiConfig';
import { useRef, useEffect, useState } from 'react';
import CardSkeleton from '../CardSkeleton';
import getTimeAgo from '~/utils/getTimeAgo';
import axios from 'axios';
import { HistoryIcon } from '~/components/Icons';

let cx = classNames.bind(styles);

function CardDelete({ movie, onDeleteCard }) {
    let link = '/detail/' + movie.type + '/' + movie.id;
    let date = new Date(movie.date);
    let bg = apiConfig.w500Image(movie.poster);

    return (
        <Link to={link}>
                <div style={{backgroundImage: `url(${bg})`}} className={cx('movie-card')}>
                    <div className='photo__actions'>
                        <button className={cx('play')}>
                            <i className="bx bx-play"></i>
                        </button>
                    </div>
                </div>
                <div className={cx('watched')}>
                    <div className={cx('time')}>
                        <span className={cx('since-time')}>{getTimeAgo(date.getTime())}</span>
                    </div>
                    <button className={cx('remove')} onClick={(e)=>{
                        e.preventDefault();
                        onDeleteCard(movie.id)
                    }}>
                        <i className='bx bx-x' ></i>Delete
                    </button>
                </div>
                <h3 className={cx('name')}>{movie.title || movie.name}</h3>          
        </Link>
    );
}

let Loading = () => {
    return (
        <>
            <CardSkeleton className={cx('loading')} />
        </>
    );
};

CardDelete.Loading = Loading;

CardDelete.propTypes = {
    movie: PropTypes.object.isRequired,
    category: PropTypes.string,
};

export default CardDelete;
