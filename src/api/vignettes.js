import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postVignetteBuy = createAsyncThunk(
    'vignettes/postVignetteBuy',
    async ({ licensePlate, vignette }, { rejectWithValue }) => {
        try {
            
            const response = await axios.post(`vignettes/${licensePlate}/buy`, vignette)
            return response.data;
            
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})


export const fetchVignetteValidate = (licensePlate) => axios.get(`vignettes/${licensePlate}`)


