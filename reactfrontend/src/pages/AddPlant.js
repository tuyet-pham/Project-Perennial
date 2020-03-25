import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';
import { FaCamera} from 'react-icons/fa';

function AddPlant() {
    const [wateringCondition, setWateringCondition] = useState("");

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
                    onChange={handleChange}
                    placeholder="Name..."
                  />
                </div>
              </div>

              <br />

              <h2>
                Species
              </h2>
              <div id="species-info" className="row">
                <div className="col">
                  <select name="species" onChange={handleChange}>
                    <option value="" disabled selected>Select species...</option>
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
                    onChange={handleChange}
                    placeholder="City name..."
                  />
                </div>
                <div className="col">
                <select name="species" onChange={handleChange}>
                    <option value="" disabled selected>State</option>
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
                    <input type="radio" name="indoorsoutdors" value="indoors" onChange={handleChange} />Indoors
                  </label>
                </div>
                <div className="col">
                  <label>
                    <input type="radio" name="indoorsoutdors" value="outdoors" onChange={handleChange} />Outdoors
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
                      <input defaultChecked type="radio" name="condition" value="moisture" onChange={() => setWateringCondition("moisture")} />Moisture level
                    </label>
                  </div>
                  <div className="row">
                    <label>
                      <input type="radio" name="condition" value="time" onChange={() => setWateringCondition("time")} />Time elapsed
                    </label>
                  </div>
                </div>
              </div>
              <div>
                  <SetWateringConditions wateringCondition={wateringCondition}/>
                  {/* Conditional render */}
              </div>

              <br />

              <h2>
                Additional notes
              </h2>
              <div id="additional-notes" className="row">
                <div className="col">
                  <label>
                    <textarea onChange={handleChange} placeholder="Add a note..." />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </PageTemplate>
    );
}

function addPlantIcon() {
  alert("Add plant icon");
}

function handleChange(props) {
  console.log("Changed")
  console.log(props)
  if(props.name == "condition")
  {
    console.log("set watering conditions")
    SetWateringConditions(props.wateringCondition);
  }
}
  
function SetWateringConditions(props) {
  //const wateringCondition="time"
  // const wateringCondition="moisture"

  if(props.wateringCondition == "time") {
    return (
      <b>
        Water after X days.
      </b>
    )
  }
  else {
    return (
      <b>
        Water at X % moisture.
      </b>
    )
  }

}

export default AddPlant;