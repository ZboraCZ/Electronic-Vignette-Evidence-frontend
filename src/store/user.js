import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, patchUser, fetchUserVignettes } from 'api/user';

// Reducer
export const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        vignettes: null,
        error: false,
        pending: false
    },
    reducers: {},
    extraReducers: {
        // Get User
        [fetchUser.pending]: (state, action) => {
            state.pending = true
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.pending = false
            state.user = action.payload

        },
        [fetchUser.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || action.error
        },
        
        // Edit User
        [patchUser.pending]: (state, action) => {
            state.pending = true
        },
        [patchUser.fulfilled]: (state, action) => {
            state.pending = false

            state.user = {
                ...state.user,
                ...action.payload
            }

        },
        [patchUser.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || action.error
        },

        // Get User Vignettes
        [fetchUserVignettes.pending]: (state, action) => {
            state.pending = true
        },
        [fetchUserVignettes.fulfilled]: (state, action) => {
            state.pending = false
            state.vignettes = action.payload
        },
        [fetchUserVignettes.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || action.error
        }
        
    }
});

// Selectors
export const getUser = state => state.user;
export const getVignettes = state => state.vignettes;
export const getIsAdmin = state => state?.user?.user?.role?.name === 'admin';

export default slice.reducer;
  