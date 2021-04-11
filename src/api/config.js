import axios from 'axios'

console.log(process.env.NODE_ENV);

const baseURL = (process.env.NODE_ENV !== 'production') ? 
    'http://localhost:8000/' 
    : 
    'https://app-eve.herokuapp.com/';

export default axios.create({
    baseURL: baseURL
});