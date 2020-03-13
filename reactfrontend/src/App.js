import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  // Route
} from 'react-router-dom';
import PageTemplate from './PageTemplate';
//import Monitor from './pages/Monitor';
// import AddPlant from './pages/AddPlant';
// import Options from './pages/Options';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <PageTemplate path="/" component={Home} /> */}
        <PageTemplate path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
