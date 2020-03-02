import React from 'react';
import {
  NavLink
  // BrowserRouter as Router,
  // Switch,
  // Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaChartBar, FaPlus, FaTools} from 'react-icons/fa';

const bottomNavStyle = {
  backgroundColor: "black",
  color: "white",
  borderTop: "1px solid white",
  padding: "10px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};


function BottomNav() {
  return (
    <div className="BottomNav">
      <div style={bottomNavStyle}>
        <div className="container">
          <div className="row">
            <div className="col">
              <NavLink to="/home" id="home">
                <FaHome aria-label="Home"/>
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/monitor" id="monitor">
                <FaChartBar aria-label="Monitor"/>
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/add-plant" id="add-plant">
                <FaPlus aria-label="Add Plant"/>
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/options" id="options">
                <FaTools aria-label="Options"/>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BottomNav;
