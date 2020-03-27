import '../components/PageTemplate.css';
import './login.css';
import React from 'react';
import LoginTemplate from '../LoginTemplate';
import { FaLeaf } from 'react-icons/fa';
import LoginForm from '../components/loginform'

function Login() {
    return (
      <LoginTemplate>
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
              <h4>Sign In</h4>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </LoginTemplate>
    )
}

export default Login;
