
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
    let queue = this.props.queue.slice();
    queue.sort(function(a, b){return a.score - b.score})
    return (
      <Table celled>
        <Table.Row>
          <Popup
            trigger={<Table.Cell>
            <Label ribbon>Current</Label>{queue[queue.length-1].name}
          </Table.Cell>} flowing hoverable>
          <Header as='h6'>User: {queue[queue.length-1].user} - Score: {queue[queue.length-1].score}</Header>
         </Popup>
          <Divider />
          {queue.slice(0,queue.length-1).reverse().map((song) => {
            return (
              <span>
                <Popup
                  trigger={<Table.Cell>
                  {song.name}
                </Table.Cell>} flowing hoverable>
                <Header as='h6'>User: {song.user} - Score: {song.score}</Header>
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
