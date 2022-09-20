import styles from './HeroSlide.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { movieType, tvType } from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import { useEffect, useState } from 'react';
import Button from '../Button';
import CardSkeleton from '../Card/CardSkeleton';

const cx = classNames.bind(styles);

function HeroSlide({ category }) {
    SwiperCore.use([Autoplay]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                let res;
                switch (category) {
                    case 'tv':
                        res = await tmdbApi.getTvList(tvType.popular, { params });
                        break;
                    case 'movie':
                        res = await tmdbApi.getMovieList(movieType.popular, { params });
                        break;
                    default:
                        return new Error('Invalid Category Type');
                }
                setMovies(res.results.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.log('Error');
            }
        };
        getMovies();
    }, [category]);
    return (
        <div className={cx('slider')}>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
            >
                {!loading ? (
                    <>
                        {movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                {({ isActive }) => (
                                    <HeroSlideItem movie={movie} category={category} className={`${isActive ? cx('active') : ''}`} />
                                )}
                            </SwiperSlide>
                        ))}
                    </>
                ) : (
                    <Loading />
                )}
            </Swiper>
        </div>
    );
}

const HeroSlideItem = ({movie, category, className}) => {
    const classes = cx('slide-item', {
        [className]: className,
    });
    let navigate = useNavigate();

    const background = apiConfig.originalImage(movie.backdrop_path ? movie.backdrop_path : movie.poster_path);

    return (
        <div className={classes} style={{ backgroundImage: `url(${background})` }}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{movie.title || movie.name}</h2>
                    <div className={cx('overview')}>{movie.overview}</div>
                    <div className={cx('btns')}>
                        <Button typeBtn="primary" onClick={() => navigate(`/${category}/${movie.id}/watch`)}>
                            Watch now
                        </Button>
                        <Button typeBtn="outline" onClick={() => navigate(`detail/${category}/${movie.id}`)}>
                            Detail
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Loading = () => {
    return <CardSkeleton className={cx('loading')} />;
};
export default HeroSlide;
