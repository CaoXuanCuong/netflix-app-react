import { useSearchParams } from 'react-router-dom';

const useCurrentParams = () => {
    const [searchParams] = useSearchParams();
    const currentParams = {};
    searchParams.forEach((value, key) => {
        currentParams[key] = value;
    });
    return currentParams;
};

export default useCurrentParams;
