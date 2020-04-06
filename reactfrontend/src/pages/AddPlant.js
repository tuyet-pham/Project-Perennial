import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';
import { FaCamera} from 'react-icons/fa';

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

    // Handle submission 
    const handleSubmit = (event) => {
      event.preventDefault()
      
      const plant = { 
        name: {name},
        species: {species},
        geolocationCity:{geolocationCity},
        geolocationState:{geolocationState},
        indoorsOutdoors:{indoorsOutdoors},
        wateringConditionTrigger:{wateringConditionTrigger},
        wateringConditionValue:{wateringConditionValue},
        additionalNotes:{additionalNotes},
      };

      addPlantIcon(plant);
      
    }

    // Forms with hooks reference: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
    return (
      <PageTemplate>
        <form>
          <div className="container-fluid">
            <div className="col form-container">
              <div id="basic-info" className="row">
                <div className="col-3">
                  <div className="empty-picture-icon" onClick={addPlantIcon}>
                    <FaCamera />
                  </div>
                </div>
                <div className="col-9">
                  <input 
                    type="text"
                    placeholder="Name..."
                    onChange={event => setName(event.target.value)}
                  />
                </div>
              </div>

              <br />

              <h2>
                Species
              </h2>
              <div id="species-info" className="row">
                <div className="col">
                  <select name="species" defaultValue="" onChange={event => setSpecies(event.target.value)}>
                    <option value="" disabled>Select species...</option>
                    <option value="Aloe vera">Aloe Vera</option>
                    <option value="Iris">Iris</option>
                    <option value="Grass">Grass</option>
                    <option value="Orchid">Orchid</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <a href="/add-plant">
                    View suggested watering conditions...
                  </a>
                </div>
              </div>

              <br />

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
                  <select name="state" defaultValue="" onChange={event => setGeolocationState(event.target.value)}>
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

              <br />

              <h2>
                Additional notes
              </h2>
              <div id="additional-notes" className="row" onChange={event => setAdditionalNotes(event.target.value)} >
                <div className="col">
                  <label>
                    <textarea placeholder="Add a note..." />
                  </label>
                </div>
              </div>

              <br />

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
          placeholder="14"
          min="1"
          max="365"
          onChange={event => props.setWateringConditionValue(event.target.value)}
        />
        days.
      </b>
    )
  }
  else {
    return (
      <b>
        Water at 
        <input 
          type="number"
          placeholder="0"
          min="0"
          max="99"
          onChange={event => props.setWateringConditionValue(event.target.value)}
        />
        % moisture.
      </b>
    )
  }

}

function addPlantIcon() {
  alert("Add plant icon");
}

export default AddPlant;
