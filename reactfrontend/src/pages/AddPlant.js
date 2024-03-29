import React, { useState, useEffect } from 'react';
import PageTemplate from '../PageTemplate';
import { addPlant } from '../api/AccountAPI'
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
import './addplant.css';
import qs from "qs";
import axios from 'axios';


function AddPlant() {
    // Hooks for form values: name, species, geolocation, indoorsoutdoors, wateringConditionTrigger, wateringConditionValue, additionalNotes
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [geolocationCity, setGeolocationCity] = useState("");
    const [geolocationState, setGeolocationState] = useState("");
    const [indoorsOutdoors, setIndoorsOutdoors] = useState("indoors");
    const [wateringConditionTrigger, setWateringConditionTrigger] = useState("moisture");
    const [wateringConditionValue, setWateringConditionValue] = useState(0);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const history = useHistory();

    const alert = useAlert()

    // Handle submission
    const handleSubmit = (event) => {
      event.preventDefault()

      const params = {
        name : `${name}`,
        username: `${localStorage.getItem('username')}`,
        species : `${species}`,
        geolocationCity :`${geolocationCity}`,
        geolocationState :`${geolocationState}`,
        indoorsOutdoors :`${indoorsOutdoors}`,
        wateringConditionTrigger :`${wateringConditionTrigger}`,
        wateringConditionValue :`${wateringConditionValue}`,
        additionalNotes :`${additionalNotes}`
      }

      if (localStorage.getItem('token') === null) {
        alert.error("Your session has timed out");
        history.push("/login");
        localStorage.clear();
      }
      else{
        addPlant(params, alert);
      }

    }

    const handleSuggestion = (event) => {
      if (localStorage.getItem('token') === null) {
        alert("Your session has timed out");
        history.push("/login");
        localStorage.clear();
      }
      const { name, value } = event.target;

      setSpecies(value)

      const params = {
        planttype : `${value}`,
      }

        // Get plants using post to django
      axios.post('account/getsuggested/', qs.stringify(params), {
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
      })
      .then(function(response) {
          document.getElementById('moistureValue').value = parseFloat(response.data.suggestedmoisture)*100;
      })
      .catch(function(error) {
          console.log(error);
      });
    };



    // Forms with hooks reference: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
    return (
      <PageTemplate>
        <form>
          <div className="container-fluid">
            <div className="col form-container">
              <div id="basic-info" className="row">
                <div className="col">
                  <input
                    type="text"
                    placeholder="Plant Name"
                    onChange={event => setName(event.target.value)}
                  />
                </div>
              </div>

              <h2>
                Species
              </h2>
              <div id="species-info" className="row" >
                <div className="col">
                  <select name="species" defaultValue="" onChange={handleSuggestion}>
                    <option value="" disabled>Select species...</option>
                    <option value="African violet">African violet</option>
                    <option value="Baby’s tears">Baby’s tears</option>
                    <option value="Begonia">Begonia</option>
                    <option value="Coleus">Coleus</option>
                    <option value="Impatiens">Impatiens</option>
                    <option value="Lucky Bamboo">Lucky Bamboo</option>
                    <option value="Philodendron">Philodendron</option>
                    <option value="Spiderwort">Spiderwort</option>
                    <option value="Tropicanna Canna">Tropicanna Canna</option>
                    <option value="Blue Camassia">Blue Camassia</option>
                    <option value="Bee Balm">Bee Balm</option>
                    <option value="Phlox carolina">Phlox carolina</option>
                    <option value="Butterfly weed">Butterfly weed</option>
                    <option value="Siberian iris">Siberian iris</option>
                    <option value="Hibiscus">Hibiscus</option>
                    <option value="Meadow rue">Meadow rue</option>
                    <option value="Ostrich fern">Ostrich fern</option>
                    <option value="Cardinal flower">Cardinal flower</option>
                    <option value="Ligularia">Ligularia</option>
                    <option value="Carex">Carex</option>
                    <option value="Blue flag">Blue flag</option>
                    <option value="Bog arum">Bog arum</option>
                    <option value="Cattail">Cattail</option>
                    <option value="Cordgrass">Cordgrass</option>
                    <option value="Flowering rush">Flowering rush</option>
                    <option value="Golden club">Golden club</option>
                    <option value="Hardy arum">Hardy arum</option>
                    <option value="Horsetail">Horsetail</option>
                    <option value="Japanese water iris">Japanese water iris</option>
                    <option value="Marsh marigold">Marsh marigold</option>
                    <option value="Southern blue flag">Southern blue flag</option>
                    <option value="Spike rush">Spike rush</option>
                    <option value="Sweet flag">Sweet flag</option>
                    <option value="Water canna">Water canna</option>
                    <option value="Water iris">Water iris</option>
                    <option value="Yellow flag">Yellow flag</option>
                    <option value="Button bush">Button bush</option>
                    <option value="Red osier dogwood">Red osier dogwood</option>
                    <option value="Tartarian dogwood">Tartarian dogwood</option>
                    <option value="Winterberry">Winterberry</option>
                    <option value="Yaupon holly">Yaupon holly</option>
                    <option value="Calla lily">Calla lily</option>
                    <option value="Louisiana iris">Louisiana iris</option>
                    <option value="Chinese globeflower">Chinese globeflower</option>
                    <option value="Egyptian papyrus">Egyptian papyrus</option>
                    <option value="Iris">Iris</option>
                    <option value="Aloe vera">Aloe vera</option>
                    <option value="Succulent">Succulent</option>
                    <option value="Aloe spirillis">Aloe spirillis</option>
                    <option value="Cactus">Cactus</option>
                    <option value="Candelabra">Candelabra</option>
                    <option value="Spider plant">Spider plan</option>
                    <option value="Green onion">Green onion</option>
                    <option value="Basil">Basil</option>
                    <option value="Rosemary">Rosemary</option>
                    <option value="Rubber plant">Rubber plant</option>
                    <option value="Orchid">Orchid</option>
                    <option value="Snake plant">Snake plant</option>
                    <option value="Pothos">Pothos</option>
                    <option value="Dracaena">Dracaena</option>
                  </select>
                </div>
              </div>

              <h2>
                Geographic location
              </h2>
              <div id="geographic-data" className="row">
                <div className="col">
                  <input
                    type="text"
                    placeholder="City name..."
                    onChange={event => setGeolocationCity(event.target.value)}
                  />
                </div>

                <div className="col">
                  <select name="state" onChange={event => setGeolocationState(event.target.value)}>
                    <option value="" disabled>State</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
              </div>
              <div id="outdoor-mode" className="row">
                <div className="col">
                  <p>The plant is:</p>
                </div>
                <div className="col">
                  <label>
                    <input defaultChecked type="radio" name="indoorsoutdors" value="indoors" onChange={event => setIndoorsOutdoors(event.target.value)} />Indoors
                  </label>
                </div>
                <div className="col">
                  <label>
                    <input type="radio" name="indoorsoutdors" value="outdoors" onChange={event => setIndoorsOutdoors(event.target.value)} />Outdoors
                  </label>
                </div>
              </div>

              <br />

              <h2>
                Watering conditions
              </h2>
              <div id="watering-conditions" className="row">
                <div className="col">
                  <p>Water based on:</p>
                </div>
                <div className="col">
                  <div className="row">
                    <label>
                      <input defaultChecked type="radio" name="condition" value="moisture" onChange={() => setWateringConditionTrigger("moisture")} />Moisture level
                    </label>
                  </div>
                  <div className="row">
                    <label>
                      <input type="radio" name="condition" value="time" onChange={() => setWateringConditionTrigger("time")} />Time elapsed
                    </label>
                  </div>
                </div>
              </div>
              <div>
                  <SetWateringConditions wateringConditionTrigger={wateringConditionTrigger} setWateringConditionValue={setWateringConditionValue}/>
                  {/* Conditional render */}
              </div>

              <h2>
                Additional notes
              </h2>
              <div id="additional-notes" className="row" onChange={event => setAdditionalNotes(event.target.value)} >
                <div className="col">
                    <textarea placeholder="Add a note..." />
                </div>
              </div>

              <button type="submit" value="Submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </PageTemplate>
    );
}

// Conditional watering trigger text
function SetWateringConditions(props) {

  if(props.wateringConditionTrigger === "time") {
    return (
      <b>
        Water after
        <input
          type="number"
          placeholder="14 days"
          min="1"
          max="365"
          onChange={event => props.setWateringConditionValue(event.target.value)}
        />
      </b>
    )
  }
  else {
    return (
      <b>
        Water at
        <br/>
        <input
          id="moistureValue"
          type="number"
          placeholder="0 % moisture"
          min="0"
          max="99"
          onChange={event => props.setWateringConditionValue(event.target.value)}
        />
      </b>
    )
  }

}


export default AddPlant;
