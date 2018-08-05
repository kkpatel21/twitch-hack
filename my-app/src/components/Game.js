import React from 'react';
import $ from 'jquery';

import Timer from './Timer'

let lose;

//Random component of game
var random = (function () {

    var colors = ["AliceBlue","Aqua","Aquamarine","Bisque","Black","BlanchedAlmond",
                "Blue",
                  "BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gainsboro","Gold","GoldenRod","Green","GreenYellow","HotPink","IndianRed","Indigo","Khaki","Lavender","LawnGreen","LemonChiffon","LightBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MistyRose","Moccasin","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];

    function intBelow(max) {
        return Math.floor(Math.random() * max);
    }

    function intBetween(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function arrayElt(array) {
        var index = intBelow(array.length);
        return array[index];
    }

    function color() {
        return arrayElt(colors);
    }

    return {intBetween: intBetween,
            arrayElt: arrayElt,
            color: color};
})();

//Main javascript for game
var modulo = (window.innerHeight/2)%5;
var losingDiameter = 10;                     // smaller than this loses
var shrinkDiameter = 5;                     // shrink by this many pixels
var p;                                     //player of the game

var gameOver = false;

var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var winningDiameter = 150;
var enemyDuration = 5000;              // time to cross the document

//Blob constructor
function Blob(color, diameter) {

  //setting instance variables of Blob
  this.color = color;
  this.diameter = diameter;
  this.$div = $('<div class="circle"></div>');
  $('#game-board').append(this.$div); //add div to DOM
}

//adding attributes to Blob's div
Blob.prototype.addToGame = function() {
    this.$div.css('width', this.diameter + 'px');
    this.$div.css('height', this.diameter + 'px');
    this.$div.css('background-color', this.color);
    this.$div.css('top', 167 + 'px');
    this.$div.css('left', 121 + 'px');

};

Blob.prototype.setColor = function(color) {
    this.$div.attr('background-color', color);
    this.color = color;
};

Blob.prototype.setDiameter = function(diameter) {
    this.diameter = diameter;
    this.$div.attr('width', diameter + 'px');
    this.$div.attr('height',  diameter + 'px');
};

Blob.prototype.setRadius = function(radius) {
    this.diameter = radius*2;
};

Blob.prototype.getDiameter = function() {
    return this.diameter;
};

Blob.prototype.getRadius = function() {
    return this.diameter/2;
};

Blob.prototype.getX = function() {
  return this.x;

};
Blob.prototype.getY = function() {
    return this.y;
};

Blob.prototype.setX = function(x) {
    this.x = x;
    this.$div.css('left', x + 'px');
};

Blob.prototype.setY = function(y) {
    this.y = y;
    this.$div.css('top', y + 'px');
};

//checks if one blob intersects another Blob or Enemy
Blob.prototype.intersects = function (other) {
    var dx = this.getX() - other.getX();
    var dy = this.getY() - other.getY();
    var distance_squared = (dx * dx + dy * dy);

    var r1 = this.getRadius();
    var r2 = other.getRadius();
    var rsum = r1+r2;
    var closer = (distance_squared <= rsum*rsum);
    return closer;
};

//Player constructor
function Player(){
    Blob.call(this, this.color, this.diameter); //calls Blob's constructor
}
Player.prototype = new Blob(); //adding Blob's constructor to prototype

//player passes a number as a parameter for the number of pixels to move Player
Player.prototype.move = function(mvt) {
    this.$div.animate({left: '+=' + mvt + 'px'},{duration: 3000,
           progress: function () {
             var $elt = this.$div;
             var left = parseInt($elt.css("left"),10);
             var x = left+100; // radius is 100
         }
    });
    this.x += mvt;
};



Player.prototype.shrink = function(shrinkDiam) {
    var player = this;
    player.setDiameter (player.diameter - shrinkDiam);
    player.$div.animate({width: player.diameter + 'px', height: player.diameter + 'px'},
    {duration: 10, progress: function(){
        if(player.diameter <= losingDiameter){
            loseGame();
            gameOver = true;
        }
    }, complete: function(){
    }
    });
};

//checks to see if Player has collided with Enemy
//shrinks Player if enemy is larger than Enemy
//grows Player if enemy is smaller than Enemy
Player.prototype.collide = function(enemy) {
    enemy.hasCollided = true;
    if(enemy.diameter > this.diameter){
        this.shrink(shrinkDiameter);
    }
    // if(enemy.diameter <= this.diameter){
    //     this.grow(growDiameter);
    // }
};


//Enemy constructor
function Enemy(){
    this.$div = $('<div class="circle" data-enemy ="enemy"></div>');
    $('#game-board').append(this.$div);

    this.hasCollided = false;
    this.color =  random.color();
    this.diameter =  random.intBetween(losingDiameter, winningDiameter);
    this.direction = random.intBetween(1, 4); //1 is up, 2 is left, 3 is down, 4 is right

    if (this.direction === 1){ //moving up
        this.x =  random.intBetween(0, window.innerWidth); //random x value between min and max width
        this.y = window.innerHeight; //smallest value y
    }
    if (this.direction === 2){ //moving left
        this.x = window.innerWidth + this.diameter; //largest value x
        this.y =  random.intBetween(0, window.innerHeight); //random y beween min and max height
    }
    if (this.direction === 3){ //moving down
        this.x =  random.intBetween(0, window.innerWidth); //random x value between min and max width
        this.y = (0-this.diameter); //largest value y
    }
    if (this.direction === 4){ //moving right
        this.x = (0-this.diameter);  //smallest value x
        this.y =  random.intBetween(0, window.innerHeight); //random y beween min and max height
    }
} //end of Enemy constructor

Enemy.prototype.start = function() {

    var diam = this.diameter + 'px';

    //add enemy attributes to DOM
    this.$div.css('width', diam);
    this.$div.css('height', diam);
    this.$div.css('background-color', this.color);
    this.$div.css('top', (this.y) + 'px');
    this.$div.css('left', (this.x) + 'px');

    /*"this" was not working when called in the animation function because
    "this" was printing as meaning the HTML div element. Solved the issue by
    naming a variable from "this" instead of using the bind method*/

    //using closure instead of bind
    var enemy = this;
    var position;

    if (this.direction === 1){
        position = {top: '-=150%'};
    } else if (this.direction === 2){
        position = {left: (0-(this.diameter*2)) + 'px'};
    } else if (this.direction === 3){
        position = {top: '-150%'};
    } else if (this.direction === 4){
        position = {left: (window.innerWidth + 'px')};
    }

    this.$div.animate(position,{duration: 3000,
        progress: function () {
            var $elt = enemy.$div;
            var top; var left; var y; var x;

            if (enemy.direction === 1){
                top = parseInt($elt.css("top"),10);
                y = top-(enemy.diameter/2);
                enemy.setY(y);

            } else if (enemy.direction === 2){
                left = parseInt($elt.css("left"),10);
                x = left + (enemy.diameter/2);
                enemy.setX(x);

            } else if (enemy.direction === 3){
                top = parseInt($elt.css("top"),10);
                y = top - (enemy.diameter/2);
                enemy.setY(y);

            } else if (enemy.direction === 4){
                left = parseInt($elt.css("left"),10);
                x = left + (enemy.diameter/2);
                enemy.setX(x);
            }

            if (p.intersects(enemy)){

                enemy.maybeCollide();
                enemy.$div.remove();
            }
            if(lose) return;
    }, complete: function(){
        enemy.$div.remove();
    }});
};


//do we have to set x and y if already set in animate
Enemy.prototype.maybeCollide = function() {
    if (this.hasCollided){

    } else {
    //update x and y --> this happens in animate

    // if (p.intersects(this)){
        p.collide(this);
        // }
    }
};

Enemy.prototype.setCoords = function(x, y) {
    this.x = x;
    this.y = y;
};

Enemy.prototype.getX = function() {
    return this.x;
};

Enemy.prototype.getY = function() {
    return this.y;
};

Enemy.prototype.setX = function(x) {
    this.x = x;
    this.$div.css('left', x + 'px');
};

Enemy.prototype.setY = function(y) {
    this.y = y;
    this.$div.css('top', y + 'px');
};

Enemy.prototype.setDirection = function(direction) {
    this.direction = direction;
};

Enemy.prototype.setDiameter = function(diameter) {
    this.diameter = diameter;
    this.$div.css('width', diameter + 'px');
    this.$div.css('height',  diameter + 'px');
};

Enemy.prototype.setRadius = function(radius) {
    this.diameter = radius*2;
};

Enemy.prototype.getDiameter = function() {
    return this.diameter;
};

Enemy.prototype.getRadius = function() {
    return this.diameter/2;
};

Enemy.prototype.remove = function() {
    this.$div.empty();
    this.setDiamter(0);
};

var loseGame = function(){
    if (gameOver){
      console.log('LOST')
        $('.circle').stop();
        // enemy.$div.stop();

        // p.$div.stop();
        window.removeEventListener('mousemove', ()=>{})
        lose();
        // window.setTimeout(window.location.reload(), 1000)
        $('#game-board').html();

    }
};

var testPlayer = new Player();
testPlayer.setDiameter(250);
testPlayer.setColor('green');
testPlayer.addToGame();
testPlayer.setY(window.innerHeight/2 + 50);
testPlayer.setX((window.innerWidth/2) - (testPlayer.getDiameter()/2));

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gameOver: gameOver,
      timer: 0
    };
  }

componentDidMount(){
  lose = this.props.lose;
}

componentWillUnmount(){
  clearInterval(this.state.intervalId)
  // localStorage.setItem('score', this.state.timer)
  this.props.lose(this.state.timer);
}
timer(){
  var intervalId = setInterval(() => {
    this.setState({timer: this.state.timer + 1})
  }, 1000);
  this.setState({intervalId})
}
//Starting game
startGame(){
    this.timer()
    p = new Player();
    p.setColor('blue');
    p.setDiameter(50);
    p.addToGame();

    $(document).on('mousemove', function (event) {
        //source: https://www.w3schools.com/jquery/event_mousemove.asp
        p.setX(event.pageX);
        p.setY(event.pageY);
    });

    setInterval(function () {
        var e = new Enemy();
        e.start();
    }, window.innerWidth/2); //so it's not easier on a larger screen

  }

  render() {
    return (
      <div id="body">
        <link rel="stylesheet" href="./game-stylesheets/styles.css"></link>
        <button onClick={() => this.startGame()} id="start">Start Game</button>
        <div>
           {this.state.timer < 60 ? '0' : `${Math.floor(this.state.timer/60)}`} : {(this.state.timer%60) < 10 ? `0${this.state.timer%60}` : `${this.state.timer%60}`}
         </div>
        <div id="game-board"></div>
      </div>
    );
  }
}

export default Game
