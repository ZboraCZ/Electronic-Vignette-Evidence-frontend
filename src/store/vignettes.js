import { createSlice } from '@reduxjs/toolkit';
import { fetchVignetteTypes } from 'api/vignette-types';

// Reducer
export const slice = createSlice({
    name: 'vignettes',
    initialState: {
        vignettes: [],
        types: [],
        error: false,
        pending: false
    },
    reducers: {},
    extraReducers: {
        [fetchVignetteTypes.pending]: (state, action) => {
            state.pending = true
        },
        [fetchVignetteTypes.fulfilled]: (state, action) => {
            state.pending = false
            state.types = action.payload
        },
        [fetchVignetteTypes.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || true
        }
    }
});

// Selectors
export const vignetteTypes = state => state.vignettes;
  
export default slice.reducer;
  