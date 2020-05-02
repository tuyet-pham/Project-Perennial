import React from 'react';
import {
  Link
} from 'react-router-dom';
import PageTemplate from '../PageTemplate';
import { FaChartBar, FaPlus, FaTools} from 'react-icons/fa';

const notificationsStyle = {
  color: "yellow"
};



function Home() {
    return (
      <PageTemplate>
        <br />
        <br />
          <div>
            <br />
            <Greeting />
            {/* <Notifications /> */}
          </div>
          <br />
          <br />
          <br />
          <div id="buttons-block">
            <div id="button-monitor" className="button-container">
              <Link to="/monitor" className="home-buttons" id="monitor">
                <a className="circle-icon">
                  <FaChartBar />
                </a>
                Monitor Plants
              </Link>
            </div>
            <div id="button-add" className="button-container">
              <Link to="/add-plant" className="home-buttons" id="monitor">
                <a className="circle-icon">
                  <FaPlus />
                </a>
                Add a Plant
              </Link>
            </div>
            <div id="button-options" className="button-container">
              <Link to="/options" className="home-buttons" id="monitor">
                <a className="circle-icon">
                  <FaTools />
                </a>
                Options
              </Link>
            </div>
          </div>
      </PageTemplate>
    );
}

////////////////////////////////////////
/* Greet the user with their username */
////////////////////////////////////////

function Greeting() {
  if(localStorage.getItem('username') !== null) {
    return <UserGreeting />
  }
  else {
    return <GuestGreeting />
  }
}

function UserGreeting() {
  const username = localStorage.getItem('username');
  return (
    <h1>Welcome, {username}!</h1>
  );
}

function GuestGreeting(props) {
  return (
    <h1> Welcome, Guest! </h1>
  );
}

////////////////////////////////////////////////////
/* Give the user a summary of their notifications */
////////////////////////////////////////////////////

function Notifications(props) {
  const notif_count = props.notifications;
  if(notif_count === 0) {
    return (
      <br />
    );
  }
  else {
    return (
      <p style={notificationsStyle}> You have {notif_count} notifications. </p>
    );
  }
}

export default Home;
