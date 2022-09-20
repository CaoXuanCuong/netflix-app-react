import React, { createContext, useState } from 'react';
import { category as cate } from '~/api/tmdbApi';
export const AppContext = createContext('');
const AppContextProvider = ({ children }) => {
    const [category, setCategory] = useState(cate.movie);

    const handleSetCategory = (cate) => {
        setCategory(cate);
    };
    const contextValue = {
        category,
        handleSetCategory,
    };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
