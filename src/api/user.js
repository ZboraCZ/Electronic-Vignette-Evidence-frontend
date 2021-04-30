import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from 'store/auth';

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (id, { rejectWithValue }) => {

        try {
            
            const response = await axios.get(`users/${id}`)
            return response.data;
            
        } catch (err) {
            logout()
            return rejectWithValue(err.response.error || err)
        }
})

export const patchUser = createAsyncThunk(
    'users/patchUser',
    async (user, { rejectWithValue }) => {

        try {
            
            const response = await axios.patch(`users/${user.id}`, user)
            return response.data;
            
        } catch (err) {
            return rejectWithValue(err.response.error || err)
        }
})
