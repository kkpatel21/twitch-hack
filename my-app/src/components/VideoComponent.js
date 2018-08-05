
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'
import SearchContainer from './SearchContainer';
import Game from './Game';

let queue = [
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=599588842&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533482120&oauth_version=1.0&shopId=2020&trackId=5508078&oauth_signature=lPIBMpsv2m6jDcOBNGiPT9cKB4w%3D', name: 'Sweet Caroline'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=832121695&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533482143&oauth_version=1.0&shopId=2020&trackId=2447235&oauth_signature=9MJkRofL5tgzN75h1%2Fvci7lFzUE%3D', name: 'A Thousand miles'},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=859993742&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533482166&oauth_version=1.0&shopId=2020&trackId=2675967&oauth_signature=mfbRy1vdgoA4iIruKgIN9mqQLG0%3D', name: 'A Little Less Talk And A Lot More Action'}
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

  queueSong(trackId, dummy) {
    //make ajax request to get url
    console.log('params of queuesong', trackId, dummy);
    let queue = this.state.queue.slice();
    queue.unshift({url: trackId, name:dummy}); //push song object
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

  // addSong(url,title){
  //   let addQueue = this.state.queue.slice();
  //   addQueue.unshift({url: url, name: title})
  //   this.setState({
  //     queue: addQueue,
  //   })
  // }

  delayedPop(){
    setTimeout(()=>{this.popSong();console.log('new song after 60')}, 10000)
  }

  render() {
    console.log("this is the state of game",this.state.game)
    return (
      <div>
      {this.state.game ?
        <Grid celled>
        <Grid.Row>
          <Grid.Column width={11}>

            <div className="music">
              <SearchContainer queueSong={(a,b)=>this.queueSong(a,b)} popSong={()=>this.popSong()} delayedPop={()=>this.delayedPop()} queue={this.state.queue}/>
              {/* <Button onClick={()=>{console.log('clicked');this.queueSong()}}>press me</Button> */}
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
      : <Game/>}


    </div>
    );
  }
}


export default VideoComponent
