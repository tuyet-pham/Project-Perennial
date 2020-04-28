import axios from 'axios';
import qs from "qs";

export async function addPlant(params){
    await axios.post('account/addplants/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
}


export async function options(params){
    await axios.post('account/options/', qs.stringify(params))
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
}
