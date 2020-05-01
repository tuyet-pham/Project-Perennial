import axios from 'axios';
import qs from "qs";

/**
 * Logs the user in, localstorage will sotre their username and their token
 * **/
export async function userLogin(params, alert){
    await axios.post('users/login/', qs.stringify(params))
    .then(function(response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        console.log(response);
        return true;
    })
    .catch(function(error) {
        alert.error("Wrong Credentials")
        console.log('Error on Authentication');
        return false;
    });
}


/**
 * Logs the user out, localstorage will remove their username and their token
 * **/
export async function userLogout(){

    await axios.post('users/logout/', qs.stringify(localStorage.getItem('username')), {
            headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
        })
    .then(function(response) {
        console.log(response);
        localStorage.clear();
        return true;
    })
    .catch(function(error) {
        console.log(error);
        localStorage.clear();
        return false;
    });
}



/**
 * Register the user, username taken or email taken
 * **/
export async function userRegister(params, alert){

    await axios.post('users/register/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
        alert.success("Successful signup!")
        return true
    })
    .catch(function(error) {
        if (error.response.data.type === '2'){
           alert.error("Username already exists.");
           return false;
        }
        else if (error.response.data.type === '3'){
           alert.error("Email already exists.");
           return false;
        }
    });
}
