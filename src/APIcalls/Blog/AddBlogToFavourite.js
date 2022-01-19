import axios from 'axios';

import {API_URL} from '../Backend_URL';

export default async function AddBlogToFavourite(blog,userId){
    try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        if(res.data.Favourites === undefined){
            return ({status: 500,msg : 'Interall Server Error'});
        }

        let found = res.data.Favourites.some(function(value) {
            return value.id === parseInt(blog.id);
        });
        if(!found) {

            res.data.Favourites.push(blog);
            console.log(res.data)
            await axios.put(`${API_URL}/users/${userId}`,res.data);
            return ({status: 200,msg : 'Blog Successfully Added'});
        }
        else{
            return ({status: 401,msg : 'Blog Already Exists'});
        }
    } catch (error) {
        return ({status: 500,msg : 'Internal Server Error'});
    }
}