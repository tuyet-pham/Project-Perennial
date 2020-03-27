import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';
import { FaSeedling } from 'react-icons/fa';

function Monitor() {
  // Dummy data - remove when API is integrated.
  // Reference: https://www.robinwieruch.de/conditional-rendering-react
  const demo_plants_list = [
    {key:0, name:"Ferngully", moisture:"31%", temperature:"75", humidity:"52", updated:"Wed Mar 25 2020 13:12:26", reservoirEmpty:0},
    {key:1, name:"Mr. Cactus", moisture:"25%", temperature:"80", humidity:"70", updated:"Tue Mar 24 2020 12:00:31", reservoirEmpty:1},
    {key:2, name:"Audrey 2.0", moisture:"69%", temperature:"95", humidity:"90", updated:"Mon Mar 23 2020 10:46:47", reservoirEmpty:0}
  ];

  return (
    <PageTemplate>
      <PlantCardList list={demo_plants_list}/>
    </PageTemplate>
  );
}

/* Props: expandStatus of an individual plant card */
function ExpandCollapseText(props) {
  const expanded = props.expanded;

  if(expanded === 0) {
    return (
      <div style={{color:"yellow"}}>
        Tap to expand
      </div>
    )
  }
  else {
    return (
      <div style={{color:"yellow"}}>
        Tap to collapse
      </div>
    )
  }
}


/* Props: list of plant objects */
function PlantCardList({ list }) {
  if (!list) {
    return (
      <h2>
        No plants have been registered yet.
      </h2>
    )
  }
  else {
    return (
      <div>
        {list.map(plant => (
          <PlantCard key={plant.key} plant={plant} />
        ))}
      </div>
    )
  }
}

function ReservoirStatus({ reservoirEmpty }) {
  if(reservoirEmpty === 1) {
    return (
      <div>
        <br />
        <div className="alert alert-danger">
          This plant's reservoir is empty.
        </div>
      </div>
    );
  }
  else {
    return (<p></p>);
  }
}

/* Props: individual plant object */
function PlantCard({ plant }) {
  const [expandStatus, setExpandStatus] = useState(0);

  if(expandStatus === 1) {
    return (
      <div className={"container " + ( expandStatus === 1 ? "monitor-plant-card-expanded" : "monitor-plant-card" )} onClick={() => expandStatus === 1 ? setExpandStatus(0) : setExpandStatus(1)}>
        <div className="row">
          <div className="col-3">
            <div className="empty-picture-icon" style={{color:"#72bb53"}}>
              <FaSeedling />
            </div>
          </div>
          <div className="col-9">
            <h3 style={{bottom:"0", position:"absolute"}}>
              {plant.name}
            </h3>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <b>Moisture: &nbsp;</b> 
            {plant.moisture}
          </div>
          <div className="row">
            <b>Temperature: &nbsp;</b> 
            {plant.temperature}
          </div>
          <div className="row">
            <b>Humidity: &nbsp;</b> 
            {plant.humidity}
          </div>
          <div className="row">
            <i> 
              Last updated {plant.updated}
            </i>
          </div>
        </div>

        <ReservoirStatus reservoirEmpty={plant.reservoirEmpty}/>

        <ExpandCollapseText expanded={expandStatus}/>
      </div>
    );
  }
  else {
    return (
      <div className={"container " + ( expandStatus === 1 ? "monitor-plant-card-expanded" : "monitor-plant-card" )} onClick={() => expandStatus === 1 ? setExpandStatus(0) : setExpandStatus(1)}>
        <div className="row">
          <div className="col-3">
            <div className="empty-picture-icon" style={{color:"#72bb53"}}>
              <FaSeedling />
            </div>
          </div>
          <div className="col-9">
            <h3 style={{bottom:"0", position:"absolute"}}>
              {plant.name}
            </h3>
          </div>
        </div>
        <ExpandCollapseText expanded={expandStatus}/>
      </div>
    );
  }
}

  export default Monitor;
