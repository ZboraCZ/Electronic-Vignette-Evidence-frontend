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

export const fetchLPValidator = (licensePlate) => axios.get(`vignettes/${licensePlate}/validate`)

export const postVignetteExtend = createAsyncThunk(
    'vignettes/postVignetteExtend',
    async ({ id, vignette_type_id}, { rejectWithValue }) => {

        try {
            const response = await axios.post(`vignettes/${id}/extend`, { vignette_type_id })
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }

        
})

export const postVignetteDelay = createAsyncThunk(
    'vignettes/postVignetteDelay',
    async ({ id, delay_date }, { rejectWithValue }) => {

        try {
            const response = await axios.post(`vignettes/${id}/delay`, {delay_date})
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

export const fetchLicencePlates = createAsyncThunk(
    'users/fetchUserLicencePlates',
    async (id, { rejectWithValue }) => {

        try {
            
            const response = await axios.get(`users/${id}/licence_plates`)
            return response.data;
            
        } catch (err) {
            return rejectWithValue(err.response.error || err)
        }
})

export const fetchVignetteByLicencePlate = (lp) => {
    return axios.get(`vignettes/${lp}`)
}


