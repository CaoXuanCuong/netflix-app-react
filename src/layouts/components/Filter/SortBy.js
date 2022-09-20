import React from 'react';
import Select from 'react-select';
import ToggleFilter from './ToggleFilter';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import useCurrentParams from '~/hooks/useCurrentParams';

const cx = classNames.bind(styles);
const SortBy = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const currentParams = useCurrentParams();
    const options = [
        { value: 'popularity.desc', label: 'Most popular' },
        { value: 'vote_average.desc', label: 'Most rating' },
        { value: 'release_date.desc', label: 'Most recent' },
    ];

    const handleChangeSortBy = (option) => {
        setSearchParams({
            ...currentParams,
            sort_by: option.value,
        });
    };

    const sortType = searchParams.get('sort_by') || 'popularity.desc';

    const customStyles = {
        control: (provided) => ({ ...provided, backgroundColor: '#49494B', border: 0, boxShadow: 'none' }),
        option: (provided, state) => ({
            ...provided,
            padding: 12,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            backgroundColor: state.isDisabled
                ? '#49494B'
                : state.isSelected
                ? '#717171'
                : state.isFocused
                ? '#5a5a5a'
                : undefined,
            color: state.isSelected ? '#ffffff' : '#989898',

            ':active': {
                ...provided[':active'],
                backgroundColor: !state.isSelected && '#717171',
                color: !state.isSelected && '#ffffff',
            },
        }),
        input: (base) => ({
            ...base,
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
        }),
        placeholder: (provided) => ({ ...provided, fontSize: 14, fontWeight: 500, color: '#ffffff' }),

        menuList: () => ({
            backgroundColor: '#49494B',
            position: 'relative',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            opacity: state.isDisabled ? 0.5 : 1,
            transition: 'opacity 300ms',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
        }),
    };

    return (
        <ToggleFilter title="Sort">
            <div className={cx('section')}>
                <h3>Sort results by</h3>
                <Select
                    defaultValue={options[0]}
                    value={options.find((option) => option.value === sortType)}
                    onChange={handleChangeSortBy}
                    options={options}
                    styles={customStyles}
                    placeholder={<div>Type to search...</div>}
                    menuPortalTarget={document.querySelector('body')}
                />
            </div>
        </ToggleFilter>
    );
};

export default SortBy;
