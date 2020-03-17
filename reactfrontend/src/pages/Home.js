import React from 'react';
import PageTemplate from '../PageTemplate';

const notificationsStyle = {
  color: "yellow"
};

function Home() {
    return (
      <PageTemplate>
          <div>
            <br />
            <Greeting />
            <Notifications />
          </div>
      </PageTemplate>
    );
}

////////////////////////////////////////
/* Greet the user with their username */
////////////////////////////////////////

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn; /*In theory, user should always be logged in on this page. */
  if(isLoggedIn) {
    return <UserGreeting />
  }
  else {
    return <GuestGreeting />
  }
}

function UserGreeting(props) {
  const username = props.username;
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
  if(notif_count == 0) {
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