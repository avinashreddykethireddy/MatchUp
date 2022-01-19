import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function RemoveFromCart(productId,userId){
    try {
        console.log(userId);
        let currUser = await axios.get(`${API_URL}/users/${userId}`);
        let removeIndex = currUser.data.CartProducts.map(function(item) { return item.id; }).indexOf(parseInt(productId));

        // remove object
        currUser.data.CartProducts.splice(removeIndex, 1);

        
    return await axios.put(`${API_URL}/users/${userId}`,currUser.data).then(response => {return response});
    } catch (error) {
        return ({state: 500 , msg : "Internal Server Error"})
    }
} 