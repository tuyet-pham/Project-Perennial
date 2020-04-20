import React, { useState } from 'react';
import PageTemplate from '../PageTemplate';
import OptionButtons from '../components/OptionButtons';
import { options } from '../api/AccountAPI';

function Options() {
  const [notificationMethod, setNotificationMethod] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notificationBoxes, setNotificationBoxes] = useState ([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInput()) {
      const notificationTriggers = getNotificationTriggers();
      const username = localStorage.getItem('username');
      // console.log(username)

      const params = {
        username : `${username}`,
        emailAddress : `${emailAddress}`,
        phoneNum : `${phoneNum}`,
        notificationMethod : `${notificationMethod}`,
        notificationTriggers: `${notificationTriggers}`
      }
      
      options(params)
        // .then(api_response => {
        //   console.log(api_response);
        // });
        
      alert('Notification preferences updated.')
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
      alert(inputValid)
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