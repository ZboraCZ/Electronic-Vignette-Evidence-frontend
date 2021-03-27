//import axios from './config'
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

export const fetchVignetteValidate = (licensePlate) => {
    //axios.get(`vignettes/${licensePlate}/validate`)
    return new Promise((res, rej) => {

        //simulate if is valid
        const isActive = Boolean(Math.random() < 0.5);

        if (isActive) {
            const data = {
                valid: true,
                vignette: {
                    vignetteId: 0,
                    licensePlate: '4A2 3000',
                    serialNumber: 0,
                    vignetteType: {
                        id: 1,
                        name: "10denni",
                        display_name: "10ti denní",
                        price: 310,
                        duration: "10 00:00:00"
                    },
                    userId: 0,
                    validFrom: "2021-03-27"
                }
            };
            res(data)
        } else {
            const data = {
                valid: false,
                vignette: {}
            }; 
            res(data)
        }
    });
}


