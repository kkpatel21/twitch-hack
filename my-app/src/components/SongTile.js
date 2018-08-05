import React, { Component } from 'react';
import { Card, Image, Search, Popup } from 'semantic-ui-react'
import './SongTile.css'


const CardExampleCard = ({title,src,artist}) => {
  let tempTitle = title
  if (title.length > 12) {
    tempTitle = title.substring(0, 7) + '...'
  }

  return (
    <Popup
      trigger={<Card>
                <Image src={src} size="mini"/>
                <Card.Content>
                  <Card.Description>{tempTitle}</Card.Description>
                </Card.Content>
              </Card>}
      header={title}
      content={artist}

    />
  )
}

export default class SongTile extends Component {
  render() {
    // console.log('props', this.props);
    return (
      <div className="song-tile">
        <CardExampleCard title={this.props.title} src={this.props.src} artist={this.props.artist}/>
      </div>
    );
  }
}
