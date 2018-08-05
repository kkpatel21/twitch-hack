
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'
import SearchContainer from '../SearchContainer'


class VideoComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    let musicRender;
    if (!this.state.open) {
      musicRender = (
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={11}>

              <div className="music">
                <SearchContainer />
                Put The Library In Here

              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h5' icon='music' content='Queue' className='queue' />
              <Divider />
              <div>
                <MusicTable />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else {

    }
    return (
      <div>
          {musicRender}
      </div>
    );
  }
}

export default VideoComponent
