import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (id, { rejectWithValue }) => {

        try {
            
            const response = await axios.get(`users/${id}`)
            return response.data;
            
        } catch (err) {
            return rejectWithValue(err.response.error || err)
        }
})

