import axios from 'axios';

import {API_URL} from '../Backend_URL';

export default async function GetBlogs(totalBlogs){
    return await axios.get(`${API_URL}/blogs/?_start=0&_end=${parseInt(totalBlogs)}`);
}