
import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'




class MusicTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      songsPicked: [{position: 1, song: 'hello', artist: 'world', bits: 3}]
    };
  }

  render() {
    return (
      <div>placeholder</div>
    );
  }
}

export default MusicTable
