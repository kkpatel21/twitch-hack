/*global random*/
/*global $*/
var modulo = (window.innerHeight/2)%5;
var winningDiameter = (window.innerHeight/2) - modulo; // bigger than this wins
var losingDiameter = 10;                     // smaller than this loses
var growDiameter = 20;                      // grow by this many pixels
var shrinkDiameter = 5;                     // shrink by this many pixels
var p;                                      //player of the game

var gameOver = false;

var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;              // time to cross the document

//Blob constructor
function Blob(color, diameter) {

  //setting instance variables of Blob
//   this.x = window.innerWidth/2;
//   this.y = window.innerHeight/2;
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
    // console.log(other);
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
             console.log("x is now "+x);
         }
    });
    this.x += mvt;
};

//increases diameter of Player and changes it on the DOM
Player.prototype.grow = function(growDiam) {
   
    var player = this;
    player.setDiameter (player.diameter + growDiam);
    // console.log(player);
    player.$div.animate({width: '+=' + growDiam, height: '+=' + growDiam},
    {duration: 10, progress: function(){
       if(player.diameter >= winningDiameter){
            winGame();
            gameOver = true;
            console.log("won!");
        }
    }, complete: function(){
        console.log('complete growing')
        }});
};

Player.prototype.shrink = function(shrinkDiam) {
    var player = this;
    player.setDiameter (player.diameter - shrinkDiam);
    // console.log(player);
    player.$div.animate({width: player.diameter + 'px', height: player.diameter + 'px'},
    {duration: 10, progress: function(){
        if(player.diameter <= losingDiameter){
            loseGame();
            gameOver = true;
            console.log("lose!");
        } 
    }, complete: function(){
        console.log('complete shrinking')
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
        // console.log("SHRINK: " + shrinkDiameter);
    }
    if(enemy.diameter <= this.diameter){
        this.grow(growDiameter);
    }
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
                // console.log("y is now "+ y);
                enemy.setY(y);
                
            } else if (enemy.direction === 2){
                left = parseInt($elt.css("left"),10);
                x = left + (enemy.diameter/2); 
                // console.log("x is now "+ x);
                enemy.setX(x);
                
            } else if (enemy.direction === 3){
                top = parseInt($elt.css("top"),10);
                y = top - (enemy.diameter/2);
                // console.log('y is now ' + y)
                enemy.setY(y);
                
            } else if (enemy.direction === 4){
                left = parseInt($elt.css("left"),10);
                x = left + (enemy.diameter/2);
                // console.log("x is now "+ x);
                enemy.setX(x);
            }
            
            if (p.intersects(enemy)){
                console.log("intersected");
                enemy.maybeCollide();
                enemy.$div.remove();
            }
    }, complete: function(){
        enemy.$div.remove();
    }});
};


//do we have to set x and y if already set in animate
Enemy.prototype.maybeCollide = function() {
    if (this.hasCollided){
        console.log('has already collided');
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
    
var winGame = function(){
    if (gameOver){ //so that board only clears once
    //stopping everything
    $('.circle').stop();
    
        // $('#game-board').html(this.$div);
        //source: http://www.phpied.com/files/location-location/location-location.html
        window.setTimeout('alert("You win! :)");window.location.reload();', 1000);
    }
};

var loseGame = function(){
    if (gameOver){
        $('.circle').stop();
        // enemy.$div.stop();
        // p.$div.stop();
        // $('#game-board').html(this.$div);
        window.setTimeout('alert("You lose :(");window.location.reload();', 1000);
    }
};

var testPlayer = new Player();
testPlayer.setDiameter(250);
testPlayer.setColor('green');
testPlayer.addToGame();
testPlayer.setY(window.innerHeight/2 + 50);
testPlayer.setX((window.innerWidth/2) - (testPlayer.getDiameter()/2));

var testGrowing = function(){
    console.log("blob is growing");
    testPlayer.grow(growDiameter);
};

var testShrinking = function(){
    console.log("blob is shrinking");
    testPlayer.shrink(shrinkDiameter);
};