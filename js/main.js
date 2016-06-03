var playPacman;
document.addEventListener("DOMContentLoaded", function() {  
  //Function to start the game
playPacman = function(){
  //Play intro song automatically
  play(sounds.intro);
  // array to hold world
  world = [
    0,0,0,0,0,0,0,0,0,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,1,0,0,0,0,1,0,
    0,0,0,1,1,1,1,1,1,0,
    1,1,1,1,0,0,0,1,1,1,
    0,1,0,1,1,2,0,2,2,0,
    0,1,0,1,1,1,0,1,1,0,
    0,1,0,0,1,0,0,1,0,0,
    0,1,1,1,1,1,1,1,1,0,
    0,0,0,0,0,0,0,0,0,0,
  ];

  //test world

  // world = [
  //   0,0,0,0,0,0,0,0,0,0,
  //   0,0,0,0,0,0,0,2,2,0,
  //   0,2,2,2,0,0,0,0,2,0,
  //   0,0,0,2,2,2,2,2,2,0,
  //   2,2,2,1,0,0,0,2,2,2,
  //   0,2,0,2,2,2,0,2,2,0,
  //   0,2,0,2,2,2,0,2,2,0,
  //   0,2,0,0,2,0,0,2,0,0,
  //   0,2,2,2,2,2,2,2,2,0,
  //   0,0,0,0,0,0,0,0,0,0,
  // ];


  // create an object to store the propeties of each character
  var pacman = new Pacman(5,5,'mrpacman');
  var ghost = new Ghost(1,1,'ghost');
  var redghost = new Ghost(8,8,'redghost');
  
  renderAll = function(){
    draw_world();
    pacman.renderPacman();
    ghost.renderGhost();
    redghost.renderGhost();
  };

  renderAll();
  startCountdown();
  //Support cheat codes
  var cheatcode = [];
  var password = "";   
  setTimeout(function(){
    // Handle keys pressed
    document.onkeydown = function(e) {
      switch(keyCodeMap[e.keyCode]) {
        case'q':
          die();
          break;
        //Keep track of key if spelling pacman or cherry
        case 'p':
        case 'a':
        case 'c':
        case 'm':
        case 'a':
        case 'h':
        case 'e':
        case 'r':
          cheatcode.push(keyCodeMap[e.keyCode]);
          break;
        //on last character of pacman or cherry, see if value was spelled
        case 'n':
        case 'y':
          cheatcode.push(keyCodeMap[e.keyCode]);
          password = cheatcode.join('').slice(-6);
          if (password === 'pacman') {
            win();
            return;
          }
          else if (password === 'cherry') {
            for (var i=0; i<world.length; i++) {
              if (world[i] === 2 && i != ((pacman.y * 10) + pacman.x)) {
                world[i]=3;
              }
            }
            draw_world();
          }
          password = "";
          break;
        case 'left':
        case 'right':
        case 'up':
        case 'down':
          pacman.move(keyCodeMap[e.keyCode]);
          renderAll();
          break;
      }
    //check to see if pacman ran into a ghost
    if (!gameWon && ((pacman.x == ghost.x && pacman.y == ghost.y) || (pacman.x == redghost.x && pacman.y == redghost.y))) {
      die();
    }
  };

  var moveGhost = setInterval( 
    function ghostmove(){
      ghost.ghostMove();
      redghost.ghostMove();
      renderAll();
      if (pacman.x === ghost.x && pacman.y === ghost.y || pacman.x === redghost.x && pacman.y === redghost.y ) {
          die();
      }
        }, 500);

  endGame = function() {
    document.getElementById('countofnum').innerHTML = "";
    world = [];
    pacman = {};
    ghost = {};
    redghost = {};
    score = 0;
    //clear all recurring processes
    clearInterval(refreshCherry);
    clearInterval(moveGhost);
    //invalidate keystrokes
    document.onkeydown = function(){};
    renderAll = function(){};
  };
    }, 4000);  

    //Function to add cherry to a random blank spot (that pacman isn't in)
    var refreshCherry = setInterval(function(){
      openSquares = [];
      for (var i=0; i<world.length; i++) {
        if (world[i] === 2 && i !== ((pacman.y * 10) + pacman.x)) openSquares.push(i);
      }
      var selectedBlock = openSquares[Math.floor( Math.random() * openSquares.length )];
      world[selectedBlock] = 3;
      renderAll();  
    }, 15000);
  }
//Uncomment below to start game on page init
  playPacman();
});