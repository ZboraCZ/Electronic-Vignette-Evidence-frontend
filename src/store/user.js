import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from 'api/user';


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
        }
    }
});

// Selectors
export const getUser = state => state.user;
  
export default slice.reducer;
  