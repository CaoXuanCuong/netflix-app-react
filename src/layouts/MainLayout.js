import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function MainLayout() {
    return (
        <div className="d-flex m-col">
            <Sidebar />
            <div className="container"> 
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
