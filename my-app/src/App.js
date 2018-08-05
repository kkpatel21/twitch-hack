import React, { Component } from 'react';
import './App.css';
import VideoComponent from './components/VideoComponent'
import jwt from 'jsonwebtoken'


class App extends Component {

  constructor() {
    super()
    this.state= {
      user: ""
    }
  }

  componentDidMount() {
    this.twitch = window.Twitch.ext


    this.twitch.onAuthorized((auth)=> {
      let payload = jwt.decode(auth.token)
      if (payload.user_id) {
        this.setState({
          user: payload.user_id
        })
        console.log('Ayeeee', this.state.user)
      }
    })
  }

  render() {
    return (
      <div className="App">
          <VideoComponent user={this.state.user} />
      </div>
    );
  }
}

export default App;
