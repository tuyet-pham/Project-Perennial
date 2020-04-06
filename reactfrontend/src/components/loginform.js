import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

function LoginForm(props) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [challenge, setChallenge] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(challenge === true){
      
      if (email != '' || password != '')
      {
        console.log('Submitting Form');
        const auth = { 
          username: {email},
          password: {password},
        };
        

      }
      else
      {
        alert("Please fill in the necessary fields.");
      }
    }
    else {
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
        name="email"
        placeholder="email"
        value={email}
        onChange={e =>
        setemail(e.target.value)}
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
