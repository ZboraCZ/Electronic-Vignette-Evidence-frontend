import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (data, { rejectWithValue }) => {

        try {
            
            const response = await axios.get('users')
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
})

