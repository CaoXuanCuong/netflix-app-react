import { category as cate, movieType, tvType } from '~/api/tmdbApi';
import Header from '~/components/Header';
import React, { useContext } from 'react';
import HeroSlide from '~/components/HeroSlide';
import MovieList from '~/components/Card/MovieList';
import { AppContext } from '~/context/AppContext';

function Home() {
    const { category, handleSetCategory } = useContext(AppContext);

    let movies = cate.movie === category ? movieType : tvType;

    return (
        <>
            <Header category={category} onChangeCate={handleSetCategory} />

            <HeroSlide category={category} />

            {Object.keys(movies).map((movie, index) => {
                const newTitle = movie.replaceAll('_', ' ').toUpperCase();
                return (
                    <div key={index} className="mb-4">
                        <div className="section__header mb-2">
                            <h2>{newTitle}</h2>
                        </div>
                        <MovieList category={category} type={movie} />
                    </div>
                );
            })}
        </>
    );
}

export default Home;
