import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, patchUser } from 'api/user';
// Reducer
export const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
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
            delete action.payload.password;
            state.user = action.payload;

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
        }
        
    }
});

// Selectors
export const getUser = state => state.user;
export const getVignettes = state => state.vignettes;
export const getIsAdmin = state => state?.user?.user?.role?.name === 'admin';

export default slice.reducer;
  