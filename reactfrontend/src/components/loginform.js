import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { userLogin } from '../api/UserAPI'
import { useHistory } from "react-router-dom";


function LoginForm(props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [challenge, setChallenge] = useState(false)
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(challenge === true){

      console.log('Submitting Form...');
      
      const params = {
        username : `${username}`,
        password : `${password}`,
      }
      
      userLogin(params);
        
      setTimeout(() => {
        if (localStorage.getItem('token') !== null){
          history.push("/home");
        }
      }, 1000);
    }
    else{
      alert("You forgot about the Recaptcha!");
    }
  }

  const capChange = (val) => {
    console.log("Captcha Value: ", val);
    val === null
    ? setChallenge(false)
    : setChallenge(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="login-input"
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={e =>
        setusername(e.target.value)}
        required
      />
      <br/>
      <input
        className="login-input"
        type="password" name="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
      <input className="login-submit" type="submit" value="Sign In"/>
      <br/>
      <div className="login-link">
        <a className="login-link" href="/sign-up">Sign Up</a>
      </div>
    </form>
  );
}

export default LoginForm;
