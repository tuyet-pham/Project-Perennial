import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  // Route
} from 'react-router-dom';
//import BottomNav from './components/BottomNav';
import PageTemplate from './PageTemplate';
//import Monitor from './pages/Monitor';
// import AddPlant from './pages/AddPlant';
// import Options from './pages/Options';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <PageTemplate path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
