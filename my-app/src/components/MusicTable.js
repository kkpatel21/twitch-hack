
import React from 'react'
import { Divider, Header, Image, Table, Label, Popup } from 'semantic-ui-react'
import './MusicTable.css'


class MusicTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      songsPicked: [{position: 1, song: 'hello', artist: 'world', bits: 3}]
    };
  }

  render() {
    return (
      <Table celled>
        <Table.Row>
          <Popup
            trigger={<Table.Cell>
            <Label ribbon>Current</Label> Song Name
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
          <Divider />
          <Popup
            trigger={<Table.Cell>
            Some Song
          </Table.Cell>}
          content="In this popup, the artist and song should show up"
          size="tiny"
          />
        </Table.Row>
      </Table>
    );
  }
}

export default MusicTable
