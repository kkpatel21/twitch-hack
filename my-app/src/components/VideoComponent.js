
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'
import SearchContainer from './SearchContainer'

let queue = [
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=533838273&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533463605&oauth_version=1.0&shopId=2020&trackId=5508078&oauth_signature=sr1kOwLu%2FFdjrh3LUmKloBCTJeg%3D', name: 'Sweet Caroline'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=533838273&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533463605&oauth_version=1.0&shopId=2020&trackId=2447235&oauth_signature=XoxvTTnzxTdXDVeAbSN5OMrHjrM%3D', name: 'A thousand miles'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=533838273&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533463605&oauth_version=1.0&shopId=2020&trackId=2675967&oauth_signature=wX8ko%2BPJxcXy%2FrnfsZfJrK8DWsw%3D', name: 'A Little Less Talk And A Lot More Action'}
]


class VideoComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      queue: queue,
    };

    this.queueSong = this.queueSong.bind(this);
  }

  queueSong(trackId) {
    //make ajax request to get url
    let queue = this.state.queue.slice();
    queue.push(/**/); //push song object
    this.setState({
      queue: queue,
    })
  }

  popSong(){
    let queuePop = this.state.queue.slice();
    queuePop.pop();
    this.setState({
      queue: queuePop,
    })
  }

  delayedPop(){
    setTimeout(()=>{this.popSong();console.log('new song after 60')}, 60000)
  }

  render() {
    return (
      <div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={11}>

              <div className="music">
                <SearchContainer queueSong={()=>this.queueSong()} popSong={()=>this.popSong()} delayedPop={()=>this.delayedPop()} queue={this.state.queue}/>
                Put The Library In Here

              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h5' icon='music' content='Queue' className='queue' />
              <Divider />
              <div>
                <MusicTable queue={this.state.queue}/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}


export default VideoComponent
