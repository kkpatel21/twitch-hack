import React from 'react';

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="./game-stylesheets/styles.css"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="./game-scripts/main.js"></script>
        <script src="./game-scripts/random.js"></script>
        <script src='./game-scripts/start.js'></script>

        <button id="start">Start Game</button>
        <div id="game-board"></div>
      </div>
    );
  }
}

export default Game
