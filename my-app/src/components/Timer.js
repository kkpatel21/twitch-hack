import React from 'react';



class Timer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      timer: null,
      counter: 0
    };
  }

  componentDidMount(){
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  componentWillMUnmount(){
    this.clearInterval(this.state.timer);
  }

  tick(){
    this.setState({counter: this.state.counter + 1})
  }

  render() {
    return (
      <div>
        Loading{"...".substr(0, this.state.counter % 3 + 1)}
      </div>
    );
  }
}

export default Timer
