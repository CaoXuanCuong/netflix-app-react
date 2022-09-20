import React from 'react';
import Trailer from '~/components/Trailer';

const VideoList = ({ videos }) => {
    const newVideos = [...videos];
    return (
        <>
            {newVideos.splice(0, 1).map((video, index) => (
                <Trailer key={index} video={video} />
            ))}
        </>
    );
};

export default VideoList;
