import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function RemoveFavouriteBlog(blogId,userId){
    try {
        let currUser = await axios.get(`${API_URL}/users/${userId}`);
        let removeIndex = currUser.data.Favourites.map(function(item) { return item.id; }).indexOf(parseInt(blogId));

        // remove object
        currUser.data.Favourites.splice(removeIndex, 1);

        
    return await axios.put(`${API_URL}/users/${userId}`,currUser.data).then(response => {return response});
    } catch (error) {
        return ({state: 500 , msg : "Internal Server Error"})
    }
} 