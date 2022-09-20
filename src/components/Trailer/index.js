import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '~/pages/Detail/Detail.module.scss';

const cx = classNames.bind(styles);
const Trailer = ({ video }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);
    return (
        <div className={cx('video')}>
            <div className={cx('video__title')}>
                <h2>MEDIA</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
            <h2>{video.name}</h2>
        </div>
    );
};
export default Trailer;
