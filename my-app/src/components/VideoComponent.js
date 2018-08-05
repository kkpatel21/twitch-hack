
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'


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
                Put The Library In Here
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                heeling How You Been Yeah Dog Yeah Dog Yeah Dog
                ey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been
                ey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h5' icon='music' content='Queue' className='queue' />
              <Divider />
              <div>
                Put The Music Table In Here
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                heeling How You Been Yeah Dog Yeah Dog Yeah Dog
                ey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been
                ey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been Cheeling How You Been Yeah Dog Yeah Dog Yeah Dog
                Hey Whats Up Dog I been
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
