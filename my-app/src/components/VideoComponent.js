
import React from 'react';
import { Button, Icon, Grid, Segment, Container, Header, Divider} from 'semantic-ui-react'
//Components
import MusicTable from './MusicTable';
import './VideoComponent.css'
import SearchContainer from './SearchContainer';
import Game from './Game';

let queue = [
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=416493679&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533492411&oauth_version=1.0&shopId=2020&trackId=5508078&oauth_signature=n3byILRPdDrIEtDNNHQOUsDXbCM%3D', name: 'Sweet Caroline', user: 'RIGkkpatel21', score: 14},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=442819997&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533492391&oauth_version=1.0&shopId=2020&trackId=2447235&oauth_signature=55Y2h1pUe2biOnw8ETIJMhRiQ80%3D', name: 'A Thousand miles', user: 'RIGkkpatel21', score: 11},
  {url: 'https://stream.svc.7digital.net/stream/catalogue?oauth_consumer_key=7d4vr6cgb392&oauth_nonce=687369300&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1533492355&oauth_version=1.0&shopId=2020&trackId=2675967&oauth_signature=w3nCWYDQvbJHqXGEIZotNvPDEvI%3D', name: 'A Little Less Talk And A Lot More Action', user: 'RIGkkpatel21', score: 19}
]


class VideoComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      queue: queue,
      game: false,
      score: null,
    };

    this.queueSong = this.queueSong.bind(this);
    // this.addSong = this.addSong.bind(this);
  }

  queueSong(trackId, dummy, user, score) {
    //make ajax request to get url
    console.log('params of queuesong', trackId, dummy, user, score);
    let queue = this.state.queue.slice();
    queue.unshift({url: trackId, name:dummy, user: user, score: score}); //push song object
    queue.sort(function(a, b) {return a.score - b.score})
    this.setState({
      queue: queue,
      game: !this.state.game,
    })
  }

  popSong(){
    let queuePop = this.state.queue.slice();
    queuePop.sort(function(a, b) {return a.score - b.score})
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
    let queue = this.state.queue.slice();
    queue = queue.sort(function(a, b) {return a.score - b.score})
    console.log('TheQUeue', queue)
    return (
      <div>
        <Button onClick={()=>this.setState({game:!this.state.game})}>play game</Button>
        { localStorage.getItem('score') !== 'undefined' ? `last score: ${localStorage.getItem('score')}` : ''}
      {!this.state.game ?
        <Grid celled>
        <Grid.Row>
          <Grid.Column width={11}>

            <div className="music">
              <SearchContainer score={this.props.score} user={this.props.user} queueSong={(a,b,c,d)=>this.queueSong(a,b,c,d)} popSong={()=>this.popSong()} delayedPop={()=>this.delayedPop()} queue={queue}/>
              {/* <Button onClick={()=>{console.log('clicked');this.queueSong()}}>press me</Button> */}
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as='h5' icon='music' content='Queue' className='queue' />
            <Divider />
            <div>
              <MusicTable queue={queue}/>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      : <Game lose={(timer)=>{
        let queue = this.state.queue.slice();
        queue[0].score = timer;
        queue.sort((a,b) => a.score-b.score)
        this.setState({game: false, score: timer, queue: queue});
        localStorage.score = timer
      }}/>}


    </div>
    );
  }
}


export default VideoComponent
