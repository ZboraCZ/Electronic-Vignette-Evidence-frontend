import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000/'
    
});


/*
export default axios.create({
    baseURL: 'https://app-eve.herokuapp.com/'
});
*/