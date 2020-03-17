import React from 'react';
import PageTemplate from '../PageTemplate';
import { FaCamera} from 'react-icons/fa'

function AddPlant() {
    return (
      <PageTemplate>
          <div className="container-fluid">
            <div className="col form-container">
              <div id="basic-info" className="row">
                <div className="col-3">
                  <div className="empty-picture-icon">
                    <FaCamera />
                  </div>
                </div>
                <div className="col-9">
                  Name
                </div>
              </div>

              <br />

              <h2>
                Species
              </h2>
              <div id="species-info" className="row">
                <div className="col-8">
                  Dropdown
                </div>
              </div>
              <div className="row">
                <div className="col">
                  View suggested watering conditions...
                </div>
              </div>

              <br />

              <h2>
                Geographic location
              </h2>
              <div id="geographic-data" className="row">
                <div className="col">
                  City text input
                </div>
                <div className="col">
                  State dropdown
                </div>
              </div>
              <div id="outdoor-mode" className="row">
                <div className="col">
                  Indoors radio
                </div>
                <div className="col">
                  Outdoors radio
                </div>
              </div>

              <br />

              <h2>
                Watering conditions
              </h2>
              <div id="watering-conditions" className="container">
                <div className="row">
                  Moisture level radio
                </div>
                <div className="row">
                  Time elapsed level radio
                </div>
                <div className="row">
                  Water after X time
                  {/* Conditional render */}
                </div>
              </div>

              <br />

              <h2>
                Additional notes
              </h2>
              <div id="additional-notes" className="row">
                <div className="col">
                  Add a Note
                </div>
              </div>
            </div>
          </div>
      </PageTemplate>
    );
}
  
  export default AddPlant;