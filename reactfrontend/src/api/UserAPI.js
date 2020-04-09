import axios from 'axios';



export async function userLogin(user){
    await axios.get( '/users/login', {}, {
        auth : {
            username : user.username,
            password : user.password,
        }
    })
    .then(function(response) {
        /** This is where to recieve the token given by Django **/
        console.log(response);

        return response.data;
    })
    .catch(function(error) {
        console.log('Error on Authentication');
        return null;
    });
}


// function userLogout(user){
     
// }



// function userCurrent(user){
    
// }



// function userRegister(user){
    
// }


