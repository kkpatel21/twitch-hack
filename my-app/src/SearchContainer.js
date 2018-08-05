import React, { Component } from 'react';
import axios from 'axios';
import SongTile from './SongTile'

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
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

  render() {
    console.log("results", this.state.results);
    const {results} = this.state
    return (

        <div className="results-container">
          {results.map((song, i) => <SongTile src={song.track.release.image} title={song.track.title} key={i}/>)}
        </div>

    );
  }
}
