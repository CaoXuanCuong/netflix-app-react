import './App.scss';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Detail from './pages/Detail';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import config from '~/configs';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Watch from './pages/Watch';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import History from './pages/History';
import WatchList from './pages/WatchList';
import Protected from './components/Auth/Protected';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
function App() {
    const { routes } = config;
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route path={routes.home} exact element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path={routes.search} element={<Search />} />
                        <Route path={routes.history} element={<History />} />
                        <Route
                            path={routes.watchlist} 
                            element={<Protected><WatchList /></Protected>} 
                        />
                        <Route
                            path={routes.profile} 
                            element={<Protected><Profile /></Protected>} 
                        />
                   </Route>
                        <Route path={routes.signin} element={<AuthLayout />}>
                        <Route index element={<SignIn />} />
                        <Route path={routes.signup} element={<SignUp />} />
                    </Route>
                    <Route path={routes.explore} element={<Explore />} />
                    <Route path={routes.detail} element={<Detail />} />
                    <Route path={routes.watch} element={<Watch />} />
                </Routes>
            </ScrollToTop>
        </Router>
    );
}

export default App;
