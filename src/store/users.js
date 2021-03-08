import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from 'api/users';


// Reducer
export const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        error: false,
        pending: false
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.pending = true
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.pending = false
            state.users = action.payload
        },
        [fetchUsers.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload
        }
    }
});

export const selectUsers = state => state.users;
  
export default slice.reducer;
  







/*
// Actions
const PENDING = 'users/FETCH_USERS_PENDING';
const SUCCESS = 'users/FETCH_USERS_SUCCESS';
const ERROR   = 'users/FETCH_USERS_ERROR'
  
// Reducer
const initialState = {
    users: [],
    error: false,
    pending: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                pending: true
            }
        case SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.payload
            }
        case ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }  
        default:
            return state
    }
}

// widgets.js



// Action Creators
export const fetchUserPending = () => ({
    type: PENDING
})

export const fetchUserSuccess = (data) => ({
    type: SUCCESS, 
    payload: data
})

export const fetchUserError = (error) => ({
    type: ERROR, 
    error
})

*/