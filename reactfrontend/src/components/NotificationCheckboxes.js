import React, { useState, useEffect } from 'react';

function NotificationCheckboxes(props) {
    const [items, setItems] = useState([
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
      <ul className="checkboxes">
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

  export default NotificationCheckboxes;