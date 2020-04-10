import axios from 'axios';

export async function addPlant(plant){
    console.log(plant);
    await axios.post( '/account/addplants', {}, {
        data : {
            name : plant.name,
            species : plant.species,
            geolocationCity : plant.geolocationCity,
            geolocationState : plant.geolocationState,
            indoorsOutdoors : plant.indoorsOutdoors,
            wateringConditionTrigger : plant.wateringConditionTrigger,
            wateringConditionValue : plant.wateringConditionValue,
            additionalNotes : plant.additionalNotes,
        }
    })
    .then(function(response) {
        /** This is where to recieve the token given by Django **/
        console.log(response);

        return response.data;
    })
    .catch(function(error) {
        console.log(error);
        return null;
    });
}