import PropTypes from 'prop-types';

import './MovieList.scss';

import { SwiperSlide, Swiper } from 'swiper/react';

import tmdbApi, { category as cate } from '~/api/tmdbApi';
import { useEffect, useState } from 'react';
import MovieCard from '~/components/Card/MovieCard';
import { Navigation } from 'swiper';

function MovieList({ type, category }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {
            const getList = async () => {
                let res = null;
                const params = {};
                switch (category) {
                    case cate.movie:
                        res = await tmdbApi.getMovieList(type, { params });
                        break;
                    default:
                        res = await tmdbApi.getTvList(type, { params });
                }

                setMovies(res.results);
                setLoading(false);
            };
            getList();
        },
        // eslint-disable-next-line
        [category],
    );
    return (
        <div className="movie-list">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                modules={[Navigation]}
                navigation={true}
                loop={true}
                grabCursor={true}
                spaceBetween={20}
                onNavigationNext={(swiper) => {
                    swiper.slideToLoop(swiper.loopedSlides + (swiper.realIndex - 1), 300);
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1239: {
                        slidesPerView: 6,
                    },
                }}
            >
                {!loading ? (
                    movies.map((movie, index) => (
                        <SwiperSlide key={index}>{<MovieCard movie={movie} category={category} />}</SwiperSlide>
                    ))
                ) : (
                    <>
                        {Array(Math.ceil(window.innerWidth / 200))
                            .fill(0)
                            .map((_, index) => (
                                <SwiperSlide key={index}>
                                    <MovieCard.Loading />
                                </SwiperSlide>
                            ))}
                    </>
                )}
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
