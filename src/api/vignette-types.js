import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVignetteTypes = createAsyncThunk(
    'users/fetchVignetteTypes',
    async (data, { rejectWithValue }) => {
        
    try {
        
        const response = await axios.get('vignettes/types')
        return response.data;
    
    } catch (err) {
        return rejectWithValue(err.response.error)
    }
        
})


