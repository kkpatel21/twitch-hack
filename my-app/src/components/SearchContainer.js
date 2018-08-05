import React, { Component } from 'react';
import { Card, Image, Search, Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
import SongTile from './SongTile'
import ReactPlayer from 'react-player'
import './SearchContainer.css'
import Results from './Results'

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchValue:"",
      muted: false,
    }
  }

  componentDidMount () {
    axios.get('https://4167c069.ngrok.io/searchSong?song=a')
      .then((res)=>{
        console.log(res)
        this.setState({
          results: res.data.searchResult
        })
      })
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value})
  }

  onSubmit = () => {
    console.log('clicked submit');
    axios.get('https://4167c069.ngrok.io/searchSong' + '?song=' + this.state.searchValue)
      .then(res => {
        console.log('results of search', res);
        this.setState({
          results: res.data.searchResult
        })
      })
  }

  render() {
    console.log("results", this.state.results);
    console.log("yo momsz",this.state.searchValue)
    const {results} = this.state
    return (
      <div>
        <div className="searchBar">
          <ReactPlayer url={this.props.queue[this.props.queue.length-1].url}
          muted={this.state.muted}
          playing = {true}
          width = "100px"
          height = "50px"
          volume = "1"
          onPlay ={()=>{this.props.delayedPop()}}
         />
          <Search
           onSearchChange={(e)=>this.handleSearchChange(e)}
          />

          <Button onClick={()=>this.setState({muted: !this.state.muted})}>{this.state.muted ? <Icon name="mute" /> : <Icon name="unmute" />}</Button>
          <Button animated onClick={()=>this.onSubmit()}>
            <Button.Content visible>Search</Button.Content>
            <Button.Content hidden>
            <Icon name='search' />
            </Button.Content>
          </Button>

          {/* <Button onClick={(a,b)=>this.props.queueSong(a,b)}>press me!</Button> */}



      </div>
<<<<<<< HEAD
      <Results user={this.props.user} results={this.state.results} queueSong={(a,b,c)=>this.props.queueSong(a,b,c)}/>
=======
      <Results results={this.state.results} user={this.props.user} queueSong={(a,b)=>this.props.queueSong(a,b)}/>
>>>>>>> 474023b64d6af51e3abc3ff70d54c852e256f6b0
    </div>


    );
  }
}
