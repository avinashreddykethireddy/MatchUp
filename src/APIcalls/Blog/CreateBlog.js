import axios from 'axios';
import { mockImgCover } from '../../utils/mockImages';

import {API_URL} from '../Backend_URL';

export default async function CreateBlog(blogtitle,blogDescription){
    let today = new Date();
    const blog = {
        "title" : blogtitle,
        "description" : blogDescription,
        "cover": mockImgCover(Math.floor(Math.random() * (24)  + 1)),
        "avatarUrl": `/static/mock-images/avatars/avatar_${Math.floor(Math.random() * (24) + 1)}.jpg`,
        "popularity" : Math.floor(Math.random() * (11)),
        "createdAt" : today,
    }
    if(blogtitle) {
        return await axios.post(`${API_URL}/blogs`,blog)
    }
    return null;
}