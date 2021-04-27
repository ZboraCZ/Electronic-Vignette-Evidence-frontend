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

export const postVignetteExtend = createAsyncThunk(
    'vignettes/postVignetteExtend',
    async ({ id, vignette_type_id, days}, { rejectWithValue }) => {

        try {
            const response = await axios.post(`vignettes/${id}/extend`, {vignette_type_id, days})
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }

        
})

export const postVignetteDelay = createAsyncThunk(
    'vignettes/postVignetteDelay',
    async ({ id, }, { rejectWithValue }) => {

        try {
            const response = await axios.post(`vignettes/${id}/delay`, {})
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }

        
})

export const deleteVignette = createAsyncThunk(
    'vignettes/deleteVignette',
    async (id , { rejectWithValue }) => {

        try {
            const response = await axios.delete(`vignettes/${id}/remove`)
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }

        
})

