import { createSlice, createAction } from '@reduxjs/toolkit';

import { postRegistration, postLogin } from 'api/auth';
import { set, get, remove } from 'utils/localstore'
import axios, { setAuthHeader, removeAuthHeader } from 'api/config';

export const login = createAction('auth/login')
export const logout = createAction('auth/logout')

const token = get('token') || null;
const userId = get('userId') || null;
if (token && userId) 
    setAuthHeader(axios, token)

// Reducer
export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: !!(!!token && userId),
        token: token,
        userId: userId,
        error: false,
        pending: false
    },
    reducers: {
        login(state, action) {
            state.isAuth = true;
            set('token', state.token)
            set('userId', state.userId)
            setAuthHeader(axios, state.token)
        },
        logout(state) {
            state.isAuth = false;
            state.userId = null;
            state.token = null;
            remove('token')
            remove('userId')
            removeAuthHeader(axios)
        }
    },
    extraReducers: {

        // Register User
        [postRegistration.pending]: (state, action) => {
            state.pending = true
        },
        [postRegistration.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.token = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.isAuth = false;
            state.newly_registered = true;
            set('token', state.token)
            set('userId', state.userId)
            setAuthHeader(axios, state.token)
        },
        [postRegistration.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload.response.data || action.error
            removeAuthHeader(axios)
            remove('token')
            remove('userId')
        },

        // Login User
        [postLogin.pending]: (state, action) => {
            state.pending = true
        },
        [postLogin.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.token = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.isAuth = true
            set('token', state.token)
            set('userId', state.userId)
            setAuthHeader(axios, state.token)
        },
        [postLogin.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload.response.data || action.error
            removeAuthHeader(axios)
            remove('token')
            remove('userId')
        },
        
    }
});

// Selectors
export const getAuth = state => state.auth;
export const getIsAuth = state => state.auth.isAuth;
export const getUserId = state => state.auth.userId;
export const getAuthError = state => state.auth.error;
export const isNewlyRegistered = state => state.auth.newly_registered;

export default slice.reducer;
  