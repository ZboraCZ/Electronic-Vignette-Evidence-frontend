import { createSlice, createAction } from '@reduxjs/toolkit';
import { postRegistration } from 'api/auth';

import { set, get, remove } from 'utils/localstore'

export const login = createAction('auth/login')
export const logout = createAction('auth/logout')

const { isAuth } = get('auth') || {}

// Reducer
export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: !!isAuth,
        token: null,
        error: false,
        pending: false
    },
    reducers: {
        login(state, action) {
            state.isAuth = true;
            set('auth', { isAuth: state.isAuth, token: state.token })
        },
        logout(state) {
            state.isAuth = false;
            remove('auth')
        }

    },
    extraReducers: {
         // register User
         [postRegistration.pending]: (state, action) => {
            state.pending = true
        },
        [postRegistration.fulfilled]: (state, action) => {
            state.pending = false
            state.token = action.payload
        },
        [postRegistration.rejected]: (state, action) => {
            console.log(action)
            state.pending = false
            state.error = action.payload || action.error
        }
    }
});

// Selectors
export const getAuth = state => state.auth;
export const getIsAuth = state => state.auth.isAuth;
  
export default slice.reducer;
  