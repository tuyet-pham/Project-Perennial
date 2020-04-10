import React, { useState, useEffect } from 'react';
import PageTemplate from '../PageTemplate';

function Options() {
  const [notificationMethod, setNotificationMethod] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [notificationBoxes, setNotificationBoxes] = useAsyncState ([]);

  const handleSubmit = (event) => {
    console.log("Submitted")
    event.preventDefault();

    console.log(notificationMethod);
    console.log(phoneNum);
    console.log(emailAddress);
    console.log(notificationBoxes);
  }

  return (
    <PageTemplate>
        <div>
          <OptionButtons handleSubmit={handleSubmit} notificationMethod={notificationMethod} setNotificationMethod={setNotificationMethod} setEmailAddress={setEmailAddress} setPhoneNum={setPhoneNum} setNotificationBoxes={setNotificationBoxes}/> {/*I know it's ugly, please avert your eyes. */}
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

// Allows for async use of setState, so values
// are updated in real time.
// Src: https://sung.codes/blog/2018/12/07/setting-react-hooks-states-in-a-sync-like-manner/
function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);

  const setter = x =>
    new Promise(resolve => {
      setValue(x);
      resolve(x);
    });

    return [value, setter];
}


function NotificationCheckboxes(props) {
  const [items, setItems] = useAsyncState([
    {
      label: "A plant is watered",
      name: "watered-plant",
      checked: false
    },
    {
      label: "A reservoir is empty",
      name: "empty-reservoir",
      checked: false
    }
  ]);

  useEffect(() => {props.setNotificationBoxes(items)});

  const handleChangedCheckbox = index => {
    toggleCheckbox(index)
  }

  const toggleCheckbox = index => {
    setItems(currentItems => 
      currentItems.map((item, itemIndex) => {
        if(itemIndex === index) {
          return {
            ...item,
            checked: !item.checked
          };
        }
        return item;
      }),
    )
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input
            type="checkbox"
            name={item.name}
            onChange={() => handleChangedCheckbox(index)}
            checked={item.checked}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
  
  export default Options;