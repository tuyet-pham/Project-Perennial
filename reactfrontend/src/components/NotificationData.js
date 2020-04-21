import React from 'react';

function NotificationData(props) {
    const notificationMethod = props.notificationMethod;
    
    if (notificationMethod === 'email') {
      return(
        <div>
          <input 
            type='text' 
            placeholder="Valid email address" 
            onChange={event => props.setEmailAddress(event.target.value)} 
            required 
          />
        </div>
      );
    }
    else if (notificationMethod === 'sms') {
      return(
        <div>
          <input 
            type='text' 
            placeholder="Valid phone number" 
            pattern="([0-9]{11}|[0-9]{10})" 
            onChange={event => props.setPhoneNum(event.target.value)} 
            required
          />
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

export default NotificationData;