import React from 'react';
import apiConfig from '~/api/apiConfig';
import './EmbedVideo.scss';

const EmbedTv = ({ id, s, e }) => {
    return (
        <iframe
            id="ve-iframe"
            title="embed-tv"
            src={apiConfig.embedTv(id, s, e)}
            width="100%"
            height="100%"
            allowFullScreen="allowfullscreen"
            frameBorder="0"
        ></iframe>
    );
};

export default EmbedTv;
