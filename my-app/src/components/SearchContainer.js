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
    let songTileRender;
    results.map((song, i) => {
      if (i%3 === 0) {

      }
    })
    return (
      <div>
        <div className="searchBar">
          <ReactPlayer url={this.props.queue[this.props.queue.length-1].url}
          muted={this.state.muted}
          playing = {true}
          width = "0px"
          height = "0px"
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



      </div>
      <Results results={this.state.results}/>
    </div>


    );
  }
}
