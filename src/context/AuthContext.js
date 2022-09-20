import { createContext, useEffect, useReducer } from 'react';
import { authReducer } from '~/reducers/authReducer';
import setAuthToken from '~/utils/setAuthToken';
import authApi from '~/api/authApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '~/utils/constants';
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const loadUser = async () => {
        try {
            const res = await authApi.getUser();
            if (res.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: res.user },
                });
            }
            else {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {},
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }

    };

    useEffect(() => {
        loadUser();
    },
    // eslint-disable-next-line
    [authState.isAuthenticated]);

    const loginUser = async (formInput) => {
        try {
            const res = await authApi.login(formInput);
            if (res.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.accessToken);
            }

            await loadUser();

            return res.data;
        } catch (error) {
            return error.response.data;
        }
    };

    const updateProfile = async (user) => {
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: true, user },
        });
    }
    const register = async (formInput) => {
        try {
            const res = await authApi.register(formInput);
            if (res.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.accessToken);
            }
            await loadUser();
            
            return res;
        } catch (error) {
            console.log(error)
            return error.response;
        }
    };
    const logout = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };
    const authContextData = { authState, loginUser, updateProfile, register, logout };
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
