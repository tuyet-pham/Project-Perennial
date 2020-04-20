import axios from 'axios';
import qs from "qs";

/** 
 * Logs the user in, localstorage will sotre their username and their token
 * **/
export async function userLogin(params){
    await axios.post('users/login/', qs.stringify(params))
    .then(function(response) {
        setToken(response.data.token);
        setUsername(response.data.username);

        console.log(getToken());
        console.log(getUsername());
        
    })
    .catch(function(error) {
        clearUser();
        console.log('Error on Authentication');
        
    });
}


/** 
 * Logs the user out, localstorage will remove their username and their token
 * **/
export async function userLogout(){
    const params = {
          username : getUsername(),
          Authentication : 'Token ' + getToken(),
    }

    await axios.post('users/logout/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
        clearUser();
    })
    .catch(function(error) {
        console.log('Error on Authentication, Token not accept to logout');
    });
}



/** 
 * Register the user, username taken or email taken
 * **/
export async function userRegister(params){
    await axios.post('users/register/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
        alert("Successful signup!")
        return '/login';
    })
    .catch(function(error) {
        if (error.response.data.type === '2'){
           alert("Username already exists.");
           return false;
        }
        else if (error.response.data.type === '3'){
           alert("Email already exists.");
           return false;
        }
    });
}



//Setting a token object on Logging in correctly
function setToken(token){
    localStorage.setItem('token', token);

}


//Setting a username object on Logging in correctly
function setUsername(thisUser){
    localStorage.setItem('username', thisUser);

}


//Getting a username object on Logging in correctly
function getUsername(){
    return localStorage.getItem('username');
}


//Getting a Token object on Logging in correctly
function getToken(){
    return localStorage.getItem('token');
}


function clearUser(){
    localStorage.clear();
}
