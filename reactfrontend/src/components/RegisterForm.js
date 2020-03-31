import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const validEmailRegex = RegExp(/^(([^<>()[].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);

function RegisterForm(props) {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ rePassword, setRepassword ] = useState("");
  const [ challenge, setChallenge ] = useState(false);
  const [ fullName, setFullName ] = useState("");
  const [ errors, setErrors ] = useState({
      fullName: '',
      email: '',
      password_len: '',
      password_conf: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log({errors})
    console.log({challenge})
    console.log({rePassword});
    console.log({fullName});
  }

  const capChange = (val) => {
    console.log("Captcha Value: ", val);
    val === null
    ? setChallenge(false)
    : setChallenge(true);
  }

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(errors);
    let curerrors = errors;

    switch(name) {
      case 'fullName':
        curerrors.fullName =
          value.length < 5
          ? 'Full Name must be 5 characters long!'
          : '';
        setFullName(value);
        break;
      case 'email':
        curerrors.email =
          validEmailRegex.test(value)
          ? ''
          : 'Email is invalid!';
        setEmail(value);
        break;
      case 'password':
        curerrors.password_len =
          value.length < 10
            ? 'Password must be at least 10 characters!'
            : '';
        setPassword(value);
        break;
      case 'password_conf':
        curerrors.password_conf =
          value === { password }
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
        name="fullName"
        placeholder="full name"
        value={fullName}
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
