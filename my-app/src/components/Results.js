import React, { Component } from 'react';
import { Card, Image, Search, Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
import SongTile from './SongTile'
import './SearchContainer.css'
import './Results.css'


export default class SearchContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div className="results">
          {this.props.results.map((song, i) => <SongTile src={song.track.release.image} title={song.track.title} artist={song.track.artist.name} key={i}/>)}
        </div>
    );
  }
}
