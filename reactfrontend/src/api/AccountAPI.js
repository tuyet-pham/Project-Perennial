import axios from 'axios';
import qs from "qs";


/** 
 * Adding a plant to the user's database
 * **/
export async function addPlant(params){
    await axios.post('account/addplants/', qs.stringify(params), { 
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    })
    .then(function(response) {
        console.log(response);
        return true;
    })
    .catch(function(error) {
        console.log(error);
        return false;
    });
}




/** 
 * Changing the user's notifcation settings
 * **/
export async function options(params){
    await axios.post('account/options/', qs.stringify(params), { 
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    })
    .then(function(response) {
        console.log(response);
        return true;
    })
    .catch(function(error) {
        console.log(error);
        return false;
    });
}

