import React, { Component } from 'react';
import { Card, Image, Search, Popup, Button, Header } from 'semantic-ui-react'
import './SongTile.css'


export default class SongTile extends Component {
  render() {
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
                  </Card>} flowing hoverable>
        <Header as='h4'>{title}</Header>
        <Header as='h5'>{artist}</Header>
        <p>{this.props.user}</p>
        <Button onClick={()=>{console.log('clicked');this.props.queueSong('hi',title, this.props.user)}}>Add To Queue</Button>
        </Popup>
      )
    }
    return (
      <div className="song-tile">
        <CardExampleCard title={this.props.title} src={this.props.src} artist={this.props.artist}/>
      </div>
    );
  }
}
