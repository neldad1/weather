// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import About from './components/weather/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <About />
      </div>
    );
  }
}

export default App;
