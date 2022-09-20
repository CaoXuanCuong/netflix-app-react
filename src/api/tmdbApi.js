import apiConfig from './apiConfig';
import axiosClient from './axiosClient';
export const category = {
    movie: 'movie',
    tv: 'tv',
    person: 'person',
    multi: 'multi',
};

export const movieType = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming',
};

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

const request = axiosClient(apiConfig.tmdbURL);
export const tmdbApi = {
    getMovieList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return request.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return request.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return request.get(url, { params: {} });
    },
    exploreMovie: (params) => {
        const url = 'discover/movie/';
        return request.get(url, params);
    },
    exploreTv: (params) => {
        const url = 'discover/tv/';
        return request.get(url, params);
    },
    getGenres: (cate) => {
        const url = `genre/${category[cate]}/list`;
        return request.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return request.get(url, params);
    },
    detail: async (cate, id, params) => {
        const labels = ['detail', 'rating', 'casts', 'media'];
        const ageRating = {
            movie: '/release_dates',
            tv: '/content_ratings',
        };
        const urlVideo = category[cate] + '/' + id;
        const urlRating = category[cate] + '/' + id + '/' + ageRating[cate];
        const urlCast = category[cate] + '/' + id + '/credits';
        const urlMedia = category[cate] + '/' + id + '/videos';
        const result = await Promise.all([
            request.get(urlVideo, params),
            request.get(urlRating, { params: {} }),
            request.get(urlCast, { params: {} }),
            request.get(urlMedia, { params: {} }),
        ]).then((data) => {
            return data.reduce((acc, cur, index) => {
                if (labels[index] === 'detail') {
                    acc[labels[index]] = cur;
                } else if (labels[index] === 'rating') {
                    const find = cur.results.find((result) => result.iso_3166_1 === 'US');
                    acc[labels[index]] =
                        (category[cate] === category.movie && find?.release_dates[0].certification) ||
                        (category[cate] === category.tv && find?.rating) ||
                        '';
                } else if (labels[index] === 'casts') {
                    acc[labels[index]] = cur.cast;
                } else if (labels[index] === 'media') {
                    acc[labels[index]] = cur.results;
                }
                return acc;
            }, {});
        });
        return result;
    },
    detailTv: async (id, season, episode, params) => {
        const urlDetail = category.tv + '/' + id;
        const urlEpisode = category.tv + '/' + id + '/season/' + season + '/episode/' + episode;
        const labels = ['detail', 'episode'];

        const result = await Promise.all([
            request.get(urlDetail, params),
            request.get(urlEpisode, params),
        ]).then((data) => {
            return data.reduce((acc, cur, index) => {
                if (labels[index] === 'detail') {
                    acc[labels[index]] = cur;
                } else if (labels[index] === 'episode') {
                    acc[labels[index]] = cur.name;
                }
                return acc;
            }, {});
        });

        return result;
    },

    detailMovie: async (id, params) => {
        const url = category.movie + '/' + id;
        return request.get(url, params);
    },

    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return request.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return request.get(url, { params: {} });
    },
    recommend: (id) => {
        const url = 'movie/' + id + '/recommendations';
        return request.get(url, { params: {} });
    },
    season: (id, season) => {
        const url = 'tv/' + id + '/season/' + season;
        return request.get(url, { params: {} });
    },
};

export default tmdbApi;
