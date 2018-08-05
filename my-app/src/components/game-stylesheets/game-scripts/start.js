/*global $*/
$('#grow').click(testGrowing);
$('#shrink').click(testShrinking);

var startGame = function(){
    console.log("game has been started");
    $('body').html('<div id="game-board">');
    p = new Player();
    p.setColor('blue');
    p.setDiameter(50);
    p.addToGame();
    
    $(document).on('mousemove', function () {
        // console.log(p);
        //source: https://www.w3schools.com/jquery/event_mousemove.asp
        p.setX(event.pageX);
        p.setY(event.pageY);
    });
    
    setInterval(function () {
        var e = new Enemy();
        e.start();
        // console.log("Enemy coming in: " + e);
    }, window.innerWidth/2); //so it's not easier on a larger screen
    
    };

$('#start').click(startGame);