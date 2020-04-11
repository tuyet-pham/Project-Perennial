import axios from 'axios';
import qs from "qs";

export async function userLogin(params){
    await axios.post('users/login/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log('Error on Authentication');
    });
}


// function userLogout(user){
     
// }



// function userCurrent(user){
    
// }



// function userRegister(user){
    
// }


