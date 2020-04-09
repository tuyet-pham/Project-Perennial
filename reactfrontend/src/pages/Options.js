import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';

function Options() {
  const [notificationMethod, setNotificationMethod] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = (event) => {
    console.log("Submitted")
    event.preventDefault();

    console.log(notificationMethod);
    console.log(phoneNum);
    console.log(emailAddress);
  }

  return (
    <PageTemplate>
        <div>
          <OptionButtons handleSubmit={handleSubmit} notificationMethod={notificationMethod} setNotificationMethod={setNotificationMethod} setEmailAddress={setEmailAddress} setPhoneNum={setPhoneNum} /> {/*I know it's ugly, please avert your eyes. */}
        </div>
    </PageTemplate>
  );
}

function OptionButtons(props) {
  const [menuString, setMenuString] = useState('toplayer');

  // Top layer options or drilled down options

  if (menuString === 'toplayer') {
    return (
      <TopLayerOptions setMenuString={setMenuString}/>
    );
  }
  else if (menuString === 'account') {
    return (
      <AccountOptions setMenuString={setMenuString}/>
    );
  }
  else if (menuString === 'notifications') {
    return (
      <NotificationOptions handleSubmit={props.handleSubmit} setMenuString={setMenuString} notificationMethod={props.notificationMethod} setNotificationMethod={props.setNotificationMethod} setPhoneNum={props.setPhoneNum} setEmailAddress={props.setEmailAddress} />
    );
  }
}

function TopLayerOptions(props) {
  // Account options or notification options

  return (
    <div>
      <div className="button-container">
        <div className="home-buttons" onClick={() => props.setMenuString('account')}>
          Account
        </div>
      </div>
      <div className="button-container">
        <div className="home-buttons" onClick={() => props.setMenuString('notifications')}>
          Notifications
        </div>
      </div>
    </div>
  );
}

function AccountOptions(props) {
  // Logout or change password
  return (
    <div>
      <div id="logout_button" className="button-container">
        <div className="home-buttons" onClick={() => alert('Logged out')}>
          Logout
        </div>
      </div>
      <div id="change_password_button" className="button-container">
        <div className="home-buttons" onClick={() => alert('Change password')}>
          Change password
        </div>
      </div>
      <div id="back_button" className="button-container">
        <div className="home-buttons" onClick={() => props.setMenuString('toplayer')}>
          Back
        </div>
      </div>
    </div>
  );
}

function NotificationOptions(props) {
  // What to notify (checklist) and email/SMS settings
  return (
    <div>
      <div className="options-container">
        <div id="contact_info">
          Preferred contact method:
          <div>
            <label>
              <input type="radio" name="contactmethod" value="email" onChange={() => props.setNotificationMethod('email')} /> Email
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="contactmethod" value="sms" onChange={() => props.setNotificationMethod('sms')} /> Text
            </label>
          </div>
          <NotificationData notificationMethod={props.notificationMethod} setEmailAddress={props.setEmailAddress} setPhoneNum={props.setPhoneNum}/>
          <button type="submit" value="Submit" className="btn btn-primary" onClick={props.handleSubmit}>
            Update preferences
          </button>
        </div>
      </div>
      {/* <div id="change_password_button">
        <div id="notify_conditions">
          Notify me when:
          <div>
            <label>
              <input type="radio" name="contactmethod" value="email" /> Email
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="contactmethod" value="sms" /> Text
            </label>
          </div>
        </div>
      </div> */}
      <div id="back_button" className="button-container">
        <div className="home-buttons" onClick={() => props.setMenuString('toplayer')}>
          Back
        </div>
      </div>
    </div>
  );
}

function NotificationData(props) {
  const notificationMethod = props.notificationMethod;
  
  if (notificationMethod === 'email') {
    return(
      <div>
        <input type='text' placeholder="Valid email address" onChange={event => props.setEmailAddress(event.target.value)} />
      </div>
    );
  }
  else if (notificationMethod === 'sms') {
    return(
      <div>
        <input type='text' placeholder="Valid phone number" onChange={event => props.setPhoneNum(event.target.value)} />
      </div>
    );
  }
  else {
    return (
      <div>
        Select a notification method to enable notifications.
      </div>
    );
  }
}
  
  export default Options;