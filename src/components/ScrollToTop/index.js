import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ children }) {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname, location.search]);
    return children
}

export default ScrollToTop;