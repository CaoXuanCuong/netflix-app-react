import { SET_AUTH } from './constants';

export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated = false, user = null, authLoading = false },
    } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading,
                isAuthenticated,
                user,
            };
        default:
            return state;
    }
};
