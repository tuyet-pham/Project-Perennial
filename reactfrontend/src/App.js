import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  // Route
} from 'react-router-dom';
import PageTemplate from './PageTemplate';
import LoginTemplate from './LoginTemplate'
import Monitor from './pages/Monitor';
import AddPlant from './pages/AddPlant';
import Options from './pages/Options';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  const isLoggedIn = false;

  return (
    <div className="App">
      <Router>
        {/* <PageTemplate path="/" component={Home} /> */}
        <PageTemplate path="/home" component={Home} pageName="Project Perennial" isLoggedIn={isLoggedIn}/>
        <PageTemplate path="/monitor" component={Monitor} pageName="Monitor" isLoggedIn={isLoggedIn}/>
        <PageTemplate path="/add-plant" component={AddPlant} pageName="Add A Plant" isLoggedIn={isLoggedIn}/>
        <PageTemplate path="/options" component={Options} pageName="Options" isLoggedIn={isLoggedIn}/>
        <LoginTemplate path="/login" component={Login} pageName="Login"/>
        <LoginTemplate path="/sign-up" component={Register} pageName="Sign Up" />
      </Router>
    </div>
  );
}

export default App;
