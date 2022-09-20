import React from 'react';
import GenreFilter from './GenreFilter';
import ReleaseFilter from './ReleaseFilter';
import RuntimeFilter from './RuntimeFilter';
import ToggleFilter from './ToggleFilter';

const FilterBy = () => {
    return (
        <ToggleFilter title="Filter">
            <GenreFilter />
            <RuntimeFilter />
            <ReleaseFilter />
        </ToggleFilter>
    );
};

export default FilterBy;
