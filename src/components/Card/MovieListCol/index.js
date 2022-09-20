import React, { useEffect, useState } from 'react';
import Horizontal from '~/components/Card/HorizontalCard';
import tmdbApi from '~/api/tmdbApi';
import { useParams } from 'react-router-dom';

const MovieListCol = ({ get }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category, id } = useParams();

    useEffect(
        () => {
            setLoading(true);
            const getList = async () => {
                let res = null;

                switch (get) {
                    case 'similar':
                        res = await tmdbApi.similar(category, id);
                        break;
                    case 'recommend':
                        res = await tmdbApi.recommend(id);
                        break;
                    default:
                        throw new Error('Invalid Type');
                }
                setMovies(res.results.slice(0, 5));
                setLoading(false);
            };
            getList();
        },
        // eslint-disable-next-line
        [category, id],
    );

    return (
        <div>
            <div>
                {!loading ? (
                    movies.map((movie) => <Horizontal key={movie.id} category={category} movie={movie} />)
                ) : (
                    <>
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <Horizontal.Loading key={index} />
                            ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieListCol;
