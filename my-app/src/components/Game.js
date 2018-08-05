import React from 'react';

var loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body').appendChild(tag);
}

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  componentDidMount(){
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
    loadScript("./game-scripts/main.js");
    loadScript("./game-scripts/random.js");
    loadScript("./game-scripts/start.js");
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="./game-stylesheets/styles.css"></link>

        <button id="start">Start Game</button>
        <div id="game-board"></div>

        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="./game-scripts/main.js"></script>
        <script src="./game-scripts/random.js"></script>
        <script src='./game-scripts/start.js'></script> */}
      </div>
    );
  }
}

export default Game
