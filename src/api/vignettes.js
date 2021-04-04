import axios from './config'
//import { createAsyncThunk } from '@reduxjs/toolkit';
/*
export const fetchVignetteValidate = createAsyncThunk(
    'vignette/fetchVignetteValidate',
    async (licensePlate, { rejectWithValue }) => {
        try {
            
            //const response = await axios.get(`vignettes/${licensePlate}/validate`)
            //return response.data;
            
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})
*/

export const fetchVignetteValidate = (licensePlate) => axios.get(`vignettes/${licensePlate}`)


