import React, { Component } from 'react';
import { Card, Image, Search, Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
import SongTile from './SongTile'
import ReactPlayer from 'react-player'
import './SearchContainer.css'

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchValue:"",
      playing: true,
    }
  }

  componentDidMount () {
    axios.get('http://localhost:4000/searchSong?song=a')
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
    axios.get('http://localhost:4000/searchSong' + '?song=' + this.state.searchValue)
      .then(res => {
        console.log('results of search', res);
        this.setState({
          results: res.data.searchResult
        })
      })
  }

  playMusic () {
  //   axios({
  //     method:'get',
  //     url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=880196878&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533456014&oauth_version=1.0&shopId=2020&trackId=5508078&oauth_signature=rpmcGlWwgCaj4PZfe1VQqAGkyNI%3D',
  //     headers: {
  //       accept: 'stream',
  //     },
  //   })
  //   .then(responseJson => {
  //     res.send(responseJson.data)
  // })
  //   .catch(function(error){
  //     console.log("error", error)
  //     res.send(error)
  //   })
  }


  render() {
    console.log("results", this.state.results);
    console.log("yo momsz",this.state.searchValue)
    const {results} = this.state
    return (
        <div className="searchBar">
          <ReactPlayer url='https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=690235746&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533458085&oauth_version=1.0&shopId=2020&trackId=2447235&oauth_signature=sWviPi7aCvIvsgDqwzNJSUGA0hY%3D'
          playing={this.state.playing}
          width = "0px"
          height = "0px"
         />
        <Search
         onSearchChange={(e)=>this.handleSearchChange(e)}
        />
        <Button animated onClick={()=>this.onSubmit()}>
          <Button.Content visible>Search</Button.Content>
          <Button.Content hidden>
          <Icon name='search' />
          </Button.Content>
        </Button>

       <Button onClick={()=>this.setState({playing: !this.state.playing})}>{this.state.playing ? 'Pause' : 'Mute'} </Button>

        <div className="results-container">
          {results.map((song, i) => <SongTile src={song.track.release.image} title={song.track.title} artist={song.track.artist.name} key={i}/>)}
        </div>

      </div>


    );
  }
}
