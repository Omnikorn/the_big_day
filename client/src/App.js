import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Guests from './components/Guests'
import Home from './components/Home'



    function App() {
      return (
        <Router>
        <div className="App">
          <Route exact path='/' component={Guests} /> 
          <Route exact path='/Home' component={Home} />
        </div>
        </Router>
      );
      
    }
    
  export default App;