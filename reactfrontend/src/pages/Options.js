import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';
import OptionButtons from '../components/OptionButtons';
import { options } from '../api/AccountAPI';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'


function Options() {
  const [notificationMethod, setNotificationMethod] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notificationBoxes, setNotificationBoxes] = useState ([]);
  const history = useHistory();
  const alert = useAlert()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInput()) {
      const notificationTriggers = getNotificationTriggers();
      const username = localStorage.getItem('username');

      const params = {
        username : `${username}`,
        emailAddress : `${emailAddress}`,
        phoneNum : `${phoneNum}`,
        notificationMethod : `${notificationMethod}`,
        notificationTriggers: `${notificationTriggers}`
      }

      if (localStorage.getItem('token') === null) {
        alert.error("Your session has timed out");
        history.push("/login");
        localStorage.clear();
      }
      else{
        const status = options(params)
        if(status === false){
          alert.error("Failed to update : Unauthorized");
        }
        else{
          alert.success('Notification preferences updated.')
        }
      }
    }
  }

  const getNotificationTriggers = () => {
    const notificationTriggers = []

    if (notificationBoxes[0].checked === true) {
      notificationTriggers.push('wateredPlant')
    }

    if (notificationBoxes[1].checked === true) {
      notificationTriggers.push('emptyreservoir')
    }

    return notificationTriggers;
  }

  const validateInput = () => {
    // Define regular expression patterns.
    var phoneNumRegex = new RegExp("([0-9]{11}|[0-9]{10})");
    var emailRegex = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\\.][a-zA-Z]{2,}");

    let inputValid = ''

    // Check for valid input.
    if (notificationMethod === '') {
      inputValid = "Please select a notification method."
    }
    else {
      if (notificationMethod === 'sms' && phoneNumRegex.test(phoneNum) === false) {
        inputValid = "Please input a valid phone number."
      }
      if (notificationMethod === 'email' && emailRegex.test(emailAddress) === false) {
        inputValid = "Please input a valid email address."
      }
    }

    if(inputValid !== '') {
      alert.error(inputValid)
      return(false)
    }

    return(true)
  }

  return (
    <PageTemplate>
        <div>
          <OptionButtons handleSubmit={handleSubmit} notificationMethod={notificationMethod} setNotificationMethod={setNotificationMethod} setEmailAddress={setEmailAddress} setPhoneNum={setPhoneNum} setNotificationBoxes={setNotificationBoxes}/> {/*I know it's ugly, please avert your eyes. */}
        </div>
    </PageTemplate>
  );
}

export default Options;
