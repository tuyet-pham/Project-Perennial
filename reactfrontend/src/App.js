import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  // Route
  Redirect
} from 'react-router-dom';
import PageTemplate from './PageTemplate';
import LoginTemplate from './LoginTemplate'
import Monitor from './pages/Monitor';
import AddPlant from './pages/AddPlant';
import Options from './pages/Options';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import axios from 'axios';
import qs from "qs";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [isUserChecked, setIsUserChecked] = useState(false);

  async function userAuthenticate(){
    await axios.post('users/authenticate/', qs.stringify(localStorage.getItem('username')), { 
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    })
    .then(function(response) {
        console.log(response)
        setIsLoggedIn(true)
        setIsUserChecked(true)
      })
    .catch(function(response) {
        console.log(response)
        setIsLoggedIn(false)
        setIsUserChecked(true)
    })
  }

  useEffect(() => {
    userAuthenticate()
  }, [])

  if(isUserChecked) {
    return (
      <div className="App">
        <Router>
          {/* <Redirect path="/"  to={{pathname:"/home"}} /> */}
          {/* <PageTemplate path="/home" component={Home} pageName="Project Perennial" isLoggedIn={isLoggedIn}/> */}
          <PageTemplate path="/(home|)/" component={Home} pageName="Project Perennial" isLoggedIn={isLoggedIn}/>
          <PageTemplate path="/monitor" component={Monitor} pageName="Monitor" isLoggedIn={isLoggedIn}/>
          <PageTemplate path="/add-plant" component={AddPlant} pageName="Add A Plant" isLoggedIn={isLoggedIn}/>
          <PageTemplate path="/options" component={Options} pageName="Options" isLoggedIn={isLoggedIn} />
          <LoginTemplate path="/login" component={Login} pageName="Login" isLoggedIn={isLoggedIn}/>
          <LoginTemplate path="/sign-up" component={Register} pageName="Sign Up" isLoggedIn={isLoggedIn} />
        </Router>
      </div>
    );
  }
  else {
    return(<div></div>)
  }
}

export default App;
