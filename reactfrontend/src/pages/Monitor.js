import React, { useState, useEffect } from 'react';
import qs from "qs";
import axios from 'axios';
import { FaSeedling } from 'react-icons/fa';
import PageTemplate from '../PageTemplate';
import { useHistory } from "react-router-dom";
import { deletePlant } from '../api/AccountAPI'

function Monitor() {
  // Dummy data - remove when API is integrated.
  // Reference: https://www.robinwieruch.de/conditional-rendering-react

  const [plantList, setPlantList] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      alert("Your session has timed out");
      history.push("/login");
      localStorage.clear();
    }
    async function fetchPlants() {
      // Fetch plants from back end
      let params = {
        username: localStorage.getItem('username')
      }
      console.log(params)
      let tmpPlantList = []

      // Get plants using post to django
      await axios.post('account/monitorplants/', qs.stringify(params), {
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
      })
      .then(function(response) {
          console.log(response.data);
          tmpPlantList = response.data.plants;
      })
      .catch(function(error) {
          console.log(error);
      });

      // If there are plants set the plants object
      if (tmpPlantList) {
        console.log(tmpPlantList);
        setPlantList(tmpPlantList);
      } else {
        console.log("No plants found for this user!")
        setPlantList([]);
      }


    }
    // Get readings for each idx

    fetchPlants();
  }, []);

  return (
    <PageTemplate>
      <PlantCardList list={plantList}/>
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
        Loading plant list...
      </h2>
    )
  } else if(list.length === 0) {
    return (
      <h2>
        <br />
        <br />
        No plants found. Try adding a plant!
      </h2>
    )
  } else {
    console.log(list)
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
  const history = useHistory();
  const handleDelete = (event) => {
    event.preventDefault()
    
    const params = { 
      name: `${plant.name}`,
      username: `${localStorage.getItem('username')}`,
    }
    
    if (localStorage.getItem('token') === null) {
      alert("Your session has timed out");
      history.push("/login");
      localStorage.clear();
    }
    else{
      deletePlant(params);
      window.location.reload();
    }
  }

  if(expandStatus === 1) {
    return (
      <div>
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
              {plant.moisture}%
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
              <b>Last Watered: &nbsp;</b>
              {plant.last_watered}
            </div>
            <div className="row">
              <b>Status: &nbsp;</b>
              {plant.online}
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
        <div className="button-container">
          <div className="delete-buttons" onClick={handleDelete}>
          Delete
        </div>
      </div>
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
