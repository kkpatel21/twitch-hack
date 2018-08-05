
import React from 'react'
import { Divider, Header, Image, Table, Label, Popup } from 'semantic-ui-react'
import './MusicTable.css'


class MusicTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    console.log('queue',this.props.queue);
    return (
      <Table celled>
        <Table.Row>
          <Popup
            trigger={<Table.Cell>
            <Label ribbon>Current</Label>{this.props.queue[this.props.queue.length-1].name}
          </Table.Cell>} flowing hoverable>
          <Header as='h5'>{this.props.queue[this.props.queue.length-1].name}</Header>
          <Header as='h6'>User: {this.props.queue[this.props.queue.length-1].user} Score: </Header>
         </Popup>
          <Divider />
          {this.props.queue.slice(0,this.props.queue.length-1).reverse().map((song) => {
            return (
              <span>
                <Popup
                  trigger={<Table.Cell>
                  {song.name}
                </Table.Cell>} flowing hoverable>
                <Header as='h5'>{song.name}</Header>
                <Header as='h6'>{song.user}</Header>
                </Popup>
                <Divider />
              </span>
            )
          })}
        </Table.Row>
      </Table>
    );
  }
}

export default MusicTable
