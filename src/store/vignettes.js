import { createSlice } from '@reduxjs/toolkit';
import { fetchVignetteTypes, patchVignetteType } from 'api/vignette-types';
import { fetchLicencePlates } from 'api/vignettes'
import { fetchUserHistory } from 'api/user'

// Reducer
export const slice = createSlice({
    name: 'vignettes',
    initialState: {
        vignettes: [],
        types: [],
        history: [],
        error: false,
        pending: false
    },
    reducers: {},
    extraReducers: {
        // fetch vignette types
        [fetchVignetteTypes.pending]: (state, action) => {
            state.pending = true
            state.error = false
        },
        [fetchVignetteTypes.fulfilled]: (state, action) => {
            state.pending = false
            state.types = action.payload
        },
        [fetchVignetteTypes.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || true
        },
        
        // patch vignette types 
        [patchVignetteType.pending]: (state, action) => {
            state.pending = true
            state.error = false
        },
        [patchVignetteType.fulfilled]: (state, action) => {
            state.pending = false
            const newArr = state.types;
            const index = newArr.findIndex(type => type.id == action.payload.id);
            newArr[index] = action.payload
            state.types = [...newArr];
        },
        [patchVignetteType.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || true
        },

        // Get User Vignettes
        [fetchLicencePlates.pending]: (state, action) => {
            state.pending = true
        },
        [fetchLicencePlates.fulfilled]: (state, action) => {
            state.pending = false
            state.vignettes = action.payload
        },
        [fetchLicencePlates.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || action.error
        },

        // Get User History
        [fetchUserHistory.pending]: (state, action) => {
            state.pending = true
        },
        [fetchUserHistory.fulfilled]: (state, action) => {
            state.pending = false
            state.history = action.payload
        },
        [fetchUserHistory.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || action.error
        }

    }
});

// Selectors
export const vignetteTypes = state => state.vignettes;
export const vignetteTypeById = (state, id) => state.vignettes.types.find(type => type.id === id)

export default slice.reducer;
  