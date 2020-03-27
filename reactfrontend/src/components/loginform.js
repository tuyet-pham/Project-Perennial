import React, { useState } from "react";

function LoginForm(props) {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('Submitting Form');
        console.log({email});
        console.log({password})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="login-input" type="text" name="email" placeholder="email" value={email} onChange={e => setemail(e.target.value)} required/>
            <br/>
            <input className="login-input" type="password" name="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <br/><br/>
            <input className="login-submit" type="submit" value="Sign In"/>
            <br/>
            <div className="login-link">
                <a className="login-link" href="/sign-up">Sign Up</a>
            </div>
        </form>
    );
}

export default LoginForm;