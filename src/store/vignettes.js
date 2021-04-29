import { createSlice } from '@reduxjs/toolkit';
import { fetchVignetteTypes, patchVignetteType } from 'api/vignette-types';
import { fetchLicencePlates } from 'api/vignettes'

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
            state.types = action.payload
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
        }

    }
});

// Selectors
export const vignetteTypes = state => state.vignettes;
export const vignetteTypeById = (state, id) => state.vignettes.types.find(type => type.id === id)

export default slice.reducer;
  