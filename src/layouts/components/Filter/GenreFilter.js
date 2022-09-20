import React, { useContext, useEffect, useState } from 'react';
import tmdbApi from '~/api/tmdbApi';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { AppContext } from '~/context/AppContext';
import Button from '~/components/Button';
import { useSearchParams } from 'react-router-dom';
import useCurrentParams from '~/hooks/useCurrentParams';

const cx = classNames.bind(styles);
const GenreFilter = () => {
    const { category } = useContext(AppContext);
    const [genres, setGenres] = useState([]);

    let [searchParams, setSearchParams] = useSearchParams();
    const currentParams = useCurrentParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await tmdbApi.getGenres(category);
                setGenres(res.genres);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [category]);

    const handleAddGenre = (genre) => {
        const searchGenres = searchParams.get('with_genres')?.split(',') ?? [];
        setSearchParams({
            ...currentParams,
            with_genres: [...searchGenres, genre.id].join(','),
        });
    };

    const handleRemoveGenre = (genre) => {
        const genresArr = searchParams.get('with_genres').split(',');
        const searchGenres = genresArr.filter((selected) => Number(selected) !== genre.id);

        if (genresArr.length === 1) {
            searchParams.delete('with_genres');
            setSearchParams(searchParams);
            return;
        }
        setSearchParams({
            ...currentParams,
            with_genres: searchGenres.join(','),
        });
    };

    return (
        <div className={cx('section')}>
            <h3>Genres</h3>
            <ul className={cx('genres-list')}>
                {genres.map((genre) => {
                    let hasSelected = false;
                    if (searchParams.get('with_genres')) {
                        hasSelected = searchParams
                            .get('with_genres')
                            .split(',')
                            .find((g) => {
                                return Number(g) === genre.id;
                            });
                    }
                    if (hasSelected) {
                        return (
                            <li className={cx('genres-item')} key={genre.id}>
                                <Button
                                    onClick={() => handleRemoveGenre(genre)}
                                    className={cx('genres-btn', {
                                        active: true,
                                    })}
                                    typeBtn="outline small"
                                >
                                    {genre.name}
                                </Button>
                            </li>
                        );
                    }
                })}
                {genres.map((genre) => {
                    let hasSelected = false;
                    if (searchParams.get('with_genres')) {
                        hasSelected = searchParams
                            .get('with_genres')
                            .split(',')
                            .find((g) => {
                                return Number(g) === genre.id;
                            });
                    }
                    if (!hasSelected) {
                        return (
                            <li className={cx('genres-item')} key={genre.id}>
                                <Button
                                    onClick={() => handleAddGenre(genre)}
                                    className={cx('genres-btn')}
                                    typeBtn="outline small"
                                >
                                    {genre.name}
                                </Button>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default GenreFilter;
