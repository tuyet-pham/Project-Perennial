import './login.css';
import React from 'react';
import LoginTemplate from '../LoginTemplate';
import RegisterForm from '../components/RegisterForm'

function Register() {
  return (
    <LoginTemplate>
      <RegisterForm />
    </LoginTemplate>
  )
}

export default Register;
