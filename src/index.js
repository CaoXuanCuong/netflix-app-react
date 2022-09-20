import 'swiper/css/bundle';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import 'nouislider/distribute/nouislider.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import AppContextProvider from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <AppContextProvider>
            <App /> 
        </AppContextProvider>
    </AuthContextProvider>
);
