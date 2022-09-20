import { useEffect } from 'react';

const useScrollTop = (deps = null) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [deps]);
};

export default useScrollTop;
