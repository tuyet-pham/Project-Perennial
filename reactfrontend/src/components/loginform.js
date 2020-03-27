import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm(props) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [challenge, setChallenge] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('Submitting Form');
    console.log({challenge})
    console.log({email});
    console.log({password})
  }

  const capChange = (val) => {
    console.log("Captcha Value: ", val);
    setChallenge(true);
  }

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
      <div className="reCapcha">
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