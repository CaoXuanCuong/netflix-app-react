import React from 'react';

import apiConfig from '~/api/apiConfig';
const EmbedMovie = ({ id }) => {
    return (
        <iframe
            id="ve-iframe"
            title="embed-movie"
            src={apiConfig.embedMovie(id)}
            width="100%"
            height="100%"
            allowFullScreen="allowfullscreen"
            frameBorder="0"
        />
    );
};

export default EmbedMovie;
