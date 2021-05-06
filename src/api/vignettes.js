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
    async ({ vignetteId, days }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`vignettes/${vignetteId}/extend`, days)
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})

export const getUser = (userMail) => axios.get(`users/find/${userMail}`)

export const getUserLicensePlates = (userMail) => axios.get(`users/find/${userMail}`)

export const patchUserVignetteEdit = (vignette) => axios.patch(`vignettes/${vignette.id}/edit`, vignette)





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