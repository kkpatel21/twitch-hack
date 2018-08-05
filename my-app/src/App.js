import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoComponent from './components/VideoComponent'
import Library from './components/Library'

class App extends Component {
  render() {
    return (
      <div className="App">
          <VideoComponent />
      </div>
    );
  }
}

export default App;
