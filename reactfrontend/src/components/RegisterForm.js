import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { userRegister } from '../api/UserAPI'
import { useHistory } from "react-router-dom";

const validEmailRegex = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g);

const validateForm = (errors, challenge) => {
  let valid = true;
  if(errors.username.length > 0) {
    console.log("username error")
    valid = false;
  } else if (errors.email.length > 0) {
    console.log("email error")
    valid = false;
  } else if (errors.password_len.length > 0) {
    console.log("password error")
    valid = false;
  } else if (errors.password_conf.length > 0) {
    console.log("password confirm error")
    valid = false;
  } else if (challenge === false) {
    console.log("challenge error")
    valid = false;
  }

  return valid;
}


function RegisterForm(props) {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ rePassword, setRepassword ] = useState("");
  const [ challenge, setChallenge ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ errors, setErrors ] = useState({
      username: '',
      email: '',
      password_len: '',
      password_conf: '',
  });
  const history = useHistory();



  const handleSubmit = (evt) => {

    evt.preventDefault();
    const valid_form = validateForm(errors, challenge)
    console.log("Valid Form: " + valid_form)
    if(valid_form){
      console.log('Submitting Form...');
      const params = {
          username : `${username}`,
          email : `${email}`,
          password : `${password}`,
      }


      const route = userRegister(params);
      if (route !== false) {
          history.push("/login");
      }

    } else if (!challenge) {
      alert("You forgot about the Recaptcha!");
    } else {
      console.log(errors)
      alert(errors.email + '\n' + errors.username + '\n' + errors.password_len + '\n' + errors.password_conf)
    }
  };

  const capChange = (val) => {
    console.log("Captcha Value: ", val);
    val === null
    ? setChallenge(false)
    : setChallenge(true);
  };

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(errors);
    let curerrors = errors;

    switch(name) {
      case 'username':
        curerrors.username =
          value.length < 5
          ? 'Username must be 5 characters long!'
          : '';
        setUsername(value);
        break;
      case 'email':
        curerrors.email =
          validEmailRegex.test(value)
          ? ''
          : 'Email is invalid!';
        setEmail(value);
        console.log(validEmailRegex.test(value))
        break;
      case 'password':
        curerrors.password_len =
          value.length < 8
            ? 'Password must be at least 8 characters!'
            : '';
        curerrors.password_conf =
          rePassword === password
          ? ''
          : 'Passwords must match!';
        setPassword(value);
        break;
      case 'password_conf':
        curerrors.password_conf =
          value === password
          ? ''
          : 'Passwords must match!';
        setRepassword(value);
        break;
      default:
        break;
    }

    setErrors(curerrors);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="login-input"
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={onChange}
        required
      />
      <br/>
      <input
        className="login-input"
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={onChange}
        required
      />
      <br/>
      <input
        className="login-input"
        type="password" name="password"
        placeholder="password"
        value={password}
        onChange={onChange}
        required
      />
      <br/>
      <input
        className="login-input"
        type="password" name="password_conf"
        placeholder="confirm password"
        value={rePassword}
        onChange={onChange}
        required
      />
      <br/><br/>
      <div className="reCaptcha">
        <ReCAPTCHA
          sitekey="6Ldai-QUAAAAAGvooVJS9gsjMZvwjj2aO4BzjBxg"
          onChange={capChange}
        />
      </div>
      <br/>
      <input className="login-submit" type="submit" value="Sign Up"/>
      <br/>
      <div className="login-link">
        <a className="login-link" href="/login">Sign In</a>
      </div>
    </form>
  );
}

export default RegisterForm;
