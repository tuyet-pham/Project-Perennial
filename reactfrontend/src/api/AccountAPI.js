import axios from 'axios';
import qs from "qs";


/**
 * Adding a plant to the user's database
 * **/
export async function addPlant(params, alert){
    await axios.post('account/addplants/', qs.stringify(params), {
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    })
    .then(function(response) {
        console.log(response);
        if(response.status === 200)
        {
            alert.success("Plant Added")
        }
        else if(response.status === 202)
        {
            alert.success("Plant Updated")
        }
        return true;
    })
    .catch(function(error) {
        console.log(error);
        alert.error("Something went WRONG!");
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


export async function changepassword(params){
    await axios.post('account/updatepassword/', qs.stringify(params), {
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
}
