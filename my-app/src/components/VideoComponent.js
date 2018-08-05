
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'
import SearchContainer from './SearchContainer';
import Game from './Game';

let queue = [
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=121395987&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533480008&oauth_version=1.0&shopId=2020&trackId=5508078&oauth_signature=XDRGb%2B0fBVNQTW7hfdB8OsDGF%2FU%3D', name: 'Sweet Caroline'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=903720884&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533480047&oauth_version=1.0&shopId=2020&trackId=2447235&oauth_signature=E%2FcSilJi98Ujo59V%2BJYuc12RXGo%3D', name: 'A Thousand Miles'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=213657416&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533480071&oauth_version=1.0&shopId=2020&trackId=2675967&oauth_signature=2XLoySQ2ZNNnx6GXCQjWT8CijbU%3D', name: 'A Little Less Talk And A Lot More Action'}
]


class VideoComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      queue: queue,
      game: false
    };

    this.queueSong = this.queueSong.bind(this);
    // this.addSong = this.addSong.bind(this);
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

  addSong(url,title){
    let addQueue = this.state.queue.slice();
    addQueue.unshift({url: url, name: title})
    this.setState({
      queue: addQueue,
    })
  }

  delayedPop(){
    setTimeout(()=>{this.popSong();console.log('new song after 60')}, 10000)
  }

  render() {
    // console.log("this is the queue",this.state.queue)
    return (
      <div>
      {this.state.game ? <Grid celled>
        <Grid.Row>
          <Grid.Column width={11}>

            <div className="music">
              <SearchContainer queueSong={()=>this.queueSong()} popSong={()=>this.popSong()} delayedPop={()=>this.delayedPop()} queue={this.state.queue}/>

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
      </Grid> : <Game/>}


    </div>
    );
  }
}


export default VideoComponent
