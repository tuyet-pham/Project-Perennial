import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import { FaLeaf } from 'react-icons/fa';

const LoginTemplate = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} component={matchProps => (
      <div className="LoginTemplate">
        <div className="container">
          <div className="row justify-content-center">
            <div className="login-circle">
            <FaLeaf size={108} className="login-icon" aria-label="Project Perennial Icon"/>
            </div>
          </div>
          <div className="row justify-content-center login-spacer-bot">
            <div className="col-12">
            <h1><b>Project Perennial</b></h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <h4>{ rest.pageName }</h4>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <Component {...matchProps} />
            </div>
          </div>
        </div>
      </div>
    )} />
  );
};

export default LoginTemplate;
