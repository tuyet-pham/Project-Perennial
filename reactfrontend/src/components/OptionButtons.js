import React, { useState } from 'react';
import NotificationCheckboxes from './NotificationCheckboxes';
import NotificationData from './NotificationData';
import { userLogout } from '../api/UserAPI';
import { useHistory } from "react-router-dom";


function OptionButtons(props) {
    // Top layer options or drilled down options
    const [menuString, setMenuString] = useState('toplayer');

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
        <NotificationOptions handleSubmit={props.handleSubmit} setMenuString={setMenuString} notificationMethod={props.notificationMethod} setNotificationMethod={props.setNotificationMethod} setPhoneNum={props.setPhoneNum} setEmailAddress={props.setEmailAddress} setNotificationBoxes={props.setNotificationBoxes}/>
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
    const history = useHistory();
    const handleLogout = (evt) => {
        evt.preventDefault();
        //alert user first?
        userLogout();
        history.push("/login");
    }


// Logout or change password
    return (
        <div>
        <div id="logout_button" className="button-container">
            <div className="home-buttons" onClick={handleLogout}>
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
            </div>
            <br />
            <div>
            <div id="notify_conditions">
                Notify me when:
                <div>
                <NotificationCheckboxes setNotificationBoxes={props.setNotificationBoxes}/>
                </div>
            </div>
            </div>
            <button type="submit" value="Submit" className="btn btn-primary" onClick={props.handleSubmit}>
                Update preferences
            </button>
        </div>
        <div id="back_button" className="button-container">
            <div className="home-buttons" onClick={() => props.setMenuString('toplayer')}>
            Back
            </div>
        </div>
        </div>
    );
}

export default OptionButtons;