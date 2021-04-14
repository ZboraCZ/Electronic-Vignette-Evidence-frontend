import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postRegistration = createAsyncThunk(
    'auth/postRegistration',
    async (credentials, { rejectWithValue }) => {

        try {
            
            const response = await axios.post(`auth/registration`, credentials)
            return response.data;
            
        } catch (err) {
            return rejectWithValue(err.response.error || err)
        }
})
