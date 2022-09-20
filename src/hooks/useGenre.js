const useGenre = (selectedGenres) => {
    return selectedGenres.reduce((acc, cur) => `${acc},${cur}`);
};

export default useGenre;
