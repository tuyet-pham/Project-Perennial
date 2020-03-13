import React from 'react';
import {
  NavLink
  // BrowserRouter as Router,
  // Switch,
  // Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageTemplate.css';
import { FaHome, FaChartBar, FaPlus, FaTools} from 'react-icons/fa';

const bottomNavStyle = {
  backgroundColor: "#72bb53",
  color: "white",
  borderTop: "1px solid white",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};

const containerStyle = {
  height: "100%",
  width: "100vw",
  padding: "0"
}

const rowStyle = {
  height: "100%",
  width: "100%",
  margin: "auto"
}


function BottomNav() {
  return (
    <div className="BottomNav" style={bottomNavStyle}>
      <div className="container" style={containerStyle}>
        <div className="row" style={rowStyle}>
          <NavLink to="/home" id="home" className="col-3 unselected" activeClassName="selected">
            <FaHome aria-label="Home"/>
          </NavLink>
          <NavLink to="/monitor" id="monitor" className="col-3 unselected"  activeClassName="selected">
            <FaChartBar aria-label="Monitor"/>
          </NavLink>
          <NavLink to="/add-plant" id="add-plant" className="col-3 unselected"  activeClassName="selected">
            <FaPlus aria-label="Add Plant"/>
          </NavLink>
          <NavLink to="/options" id="options" className="col-3 unselected"  activeClassName="selected">
            <FaTools aria-label="Options"/>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
