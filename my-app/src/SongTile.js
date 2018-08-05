import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

const CardExampleCard = ({title,src}) => (
  <Card>
    <Image src={src} size="mini"/>
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
    console.log('props', this.props);
    return (
      <div className="song-tile">
        {/* <p>{this.props.title}</p>
        <img src={this.props.src}/> */}
        <CardExampleCard title={this.props.title} src={this.props.src}/>
      </div>
    );
  }
}
