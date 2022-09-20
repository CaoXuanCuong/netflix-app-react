import images from '~/assets';
import { BASE_URL, TMDB_URL } from '~/utils/constants';

const apiConfig = {
    baseURL: BASE_URL, 
    tmdbURL: TMDB_URL,
    apiKey: 'ce71c4689058cb9adf5476557c72f798',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => {
        if (imgPath) {
            return `https://image.tmdb.org/t/p/w500/${imgPath}`;
        }
        return images.noImg;
    },
    embedMovie: (id) => `https://www.2embed.to/embed/tmdb/movie?id=${id}`,
    embedTv: (id, season, episode) => `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`,
};

export default apiConfig;
