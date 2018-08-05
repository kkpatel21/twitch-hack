import React, { Component } from 'react';
import { Card, Image, Search, Popup } from 'semantic-ui-react'
import './SongTile.css'


const CardExampleCard = ({title,src,artist}) => (
  <Card>
    <Popup
      trigger={<Image src={src} size="mini"/>}
      header={title}
      content={artist}

    />

    <Card.Content>
      <Card.Description>{title}</Card.Description>
    </Card.Content>
  </Card>
)

export default class SongTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('props', this.props);
    return (
      <div className="song-tile">
        <CardExampleCard title={this.props.title} src={this.props.src} artist={this.props.artist}/>
      </div>
    );
  }
}
