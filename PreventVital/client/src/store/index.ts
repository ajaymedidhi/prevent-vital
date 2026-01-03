import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types/auth';

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

// Validating localStorage data safety
const loadState = (): AuthState => {
    try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            return {
                token,
                user: JSON.parse(user),
                isAuthenticated: true
            };
        }
    } catch (err) {
        console.error("Failed to load auth state", err);
    }
    return initialState;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: loadState(),
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

import shopReducer from './shopSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        shop: shopReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
