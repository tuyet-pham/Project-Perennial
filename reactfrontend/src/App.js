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

function App() {
  return (
    <div className="App">
      <Router>
        {/* <PageTemplate path="/" component={Home} /> */}
        <PageTemplate path="/home" component={Home} pageName="Project Perennial" />
        <PageTemplate path="/monitor" component={Monitor} pageName="Monitor" />
        <PageTemplate path="/add-plant" component={AddPlant} pageName="Add A Plant" />
        <PageTemplate path="/options" component={Options} pageName="Options" />
        <LoginTemplate path="/login" component={Login} pageName="Login" />
      </Router>
    </div>
  );
}

export default App;

// import React from 'react';
// import axios from 'axios';
// import './App.css';

// function handleSubmit(event) {
//   const text = document.querySelector('#char-input').value

//   axios
//     .get(`/login?text=${text}`).then(({data}) => {
//       document.querySelector('#char-count').textContent = `${data.count} characters!`
//     })
//     .catch(err => console.log(err))
// }

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <label htmlFor='char-input'>How many characters does</label>
//         <input id='char-input' type='text' />
//         <button onClick={handleSubmit}>have?</button>
//       </div>

//       <div>
//         <h3 id='char-count'></h3>
//       </div>
//     </div>
//   );
// }

// export default App;
