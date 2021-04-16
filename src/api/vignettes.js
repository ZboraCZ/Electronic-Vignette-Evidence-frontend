import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postVignetteBuy = createAsyncThunk(
    'vignettes/postVignetteBuy',
    async ({ licensePlate, vignette }, { rejectWithValue }) => {
        try {
            const buyType = 'id_user' in vignette ? 'buy' : 'quick-buy'
            const response = await axios.post(`vignettes/${licensePlate}/${buyType}`, vignette)
            return response.data;
            
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})


export const fetchVignetteValidate = (licensePlate) => axios.get(`vignettes/${licensePlate}`)


