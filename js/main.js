var playPacman;
document.addEventListener("DOMContentLoaded", function() {  
 //Function to start the game
playPacman = function(){
world = [
  0,0,0,0,0,0,0,0,0,0,
  0,1,1,1,1,1,1,1,1,0,
  0,1,1,1,0,0,0,0,0,0,
  0,0,0,1,1,1,1,1,1,0,
  1,1,1,1,0,0,0,1,1,1,
  0,1,0,1,1,2,0,2,2,0,
  0,1,0,1,1,1,0,1,1,0,
  0,1,0,0,1,0,0,1,0,0,
  0,1,1,1,1,1,1,1,1,0,
  0,0,0,0,0,0,0,0,0,0,
];
  //Play intro song automatically
  play(sounds.intro);    
  // create an object to store the propeties of each character
  pacman = new Pacman(5,5,'mrpacman');
  var ghost = new Ghost(1,1,'blueghost');
  var redghost = new Ghost(8,8,'redghost');
  //create an object to store the direction the sprite will be looking at
  var direction = "right";
  var ghostdirection = "right";
  var redghostdirection="right";
  // create an array to hold the 'world' or gameboard that we will use to represent what each box in the grid will be
  //create a variable to record the score
  function draw_pacman(){
    pacman.renderCharacter.call(pacman, 'pacman' + direction);
  }  
  //draw blue ghost
  function draw_ghost(){
    if (ghostdirection === 'left' || ghostdirection === 'right' ){
      ghost.renderCharacter.call(ghost, 'ghost' + ghostdirection);
    }
    else {
      ghost.renderCharacter.call(ghost, 'ghostright');
    }
  }
  //draw second ghost
  function draw_redghost(){
    if (redghostdirection === 'left' || redghostdirection === 'right' ){
      redghost.renderCharacter.call(redghost, 'redghost' + redghostdirection);
    }
    else {
      redghost.renderCharacter.call(redghost, 'redghostright');
    }
  }  
  draw_world();
  draw_pacman();
  draw_ghost();
  draw_redghost();

  //countdown function
  var numcount = 4;
  var countdownfunc = setInterval(function(){
      numcount -= 1;
      if (numcount==0)
        {
          document.getElementById('countofnum').innerHTML = "<div class='countdown'>Game on!</div>";
        }
      else
        {
          document.getElementById('countofnum').innerHTML = "<div class='countdown'>" + numcount + "</div>";
        }
      if (numcount<1)
      {
        clearInterval(countdownfunc);
      }
  }, 1000);
  setTimeout(function() {
    document.getElementById('countofnum').innerHTML = "";
  }, 9000);
  //Support cheat codes
  cheatcode = [];
  password = "";
  cherrycheatcode = [];
  cherrypassword = "";     
  setTimeout(function(){
    // determine if an arrow key was pressed
    document.onkeydown = function(e){
    //Hack to cheat/test winning: type pacman
    console.log(e.keyCode);
    //End game (dev tool)
    if (e.keyCode === 81){
      clearInterval(refreshCherry);
      clearInterval(moveGhost);
      clearInterval(moveRedGhost);
    }
    if (e.keyCode == 80 ||e.keyCode == 65 || e.keyCode == 67 || e.keyCode == 77|| e.keyCode == 65 )
    {
      cheatcode.push(e.keyCode);
    }
  if (e.keyCode == 78)
  {
    cheatcode.push(e.keyCode);
    for (var i = cheatcode.length-1; i > cheatcode.length-7; i--)
    {
      password += cheatcode[i];
    }
    if (password == 786577676580) 
    {
      win();
      return;
    } 
    else{
      password = "";
    }
  }
  //cherry cheat: fill all blank squares with cherries by typing "cherries"
  if (e.keyCode == 67 ||e.keyCode == 72 || e.keyCode == 69 || e.keyCode == 82)
  {
    cherrycheatcode.push(e.keyCode);  
  }
  if (e.keyCode == 89)
   {
    cherrycheatcode.push(e.keyCode);
    for (var i = cherrycheatcode.length-1; i > cherrycheatcode.length-7; i--)
    {
      cherrypassword += cherrycheatcode[i];
    }
    if (cherrypassword == 898282697267)
    {
      cherrypassword = "";
      for (var i=0; i<world.length; i++)
      {
        if (world[i]===2 && i != ((pacman.y * 10) + pacman.x))
        {
          world[i]=3;
        }
        draw_world();
      }
    }
    else {
      cherrypassword = "";
    }
  }
  //determine if pacman needs to go across the map
 if(e.keyCode == 37 && pacman.x == 0 && pacman.y ==4)
  {
    pacman.x = 9;
    pacman.y = 4;
    direction = "left";
  }
  else if(e.keyCode == 37 && (world[((pacman.y * 10) + pacman.x) - 1]) !== 0){
    // go left
    pacman.x -=  1; // if this spot == 0 its a 'brick' don't allow movement to occur
    direction = "left";
   }
   //determine if pacman needs to go across the map
   else if(e.keyCode == 39 && pacman.x==9 && pacman.y==4) 
   {
    pacman.x = 0;
    pacman.y = 4;
    direction = "right";
   }
   else if(e.keyCode == 39 && (world[((pacman.y * 10) + pacman.x) + 1]) !== 0){
    // go right
    pacman.x += 1;
    direction = "right";
  }
  else if (e.keyCode === 40 && (world[((pacman.y * 10) + pacman.x) + 10]) !== 0){
    //go down
    pacman.y += 1;
    direction = "down";
  }
  else if (e.keyCode === 38 && (world[((pacman.y * 10) + pacman.x) - 10]) !== 0)
  {
    //go up
    pacman.y -=1;
    direction = "up";}
  //check to see if pacman ran into a ghost
  if ((pacman.x == ghost.x && pacman.y == ghost.y) || (pacman.x == redghost.x && pacman.y == redghost.y))
  {
    pacmandies();
  }
  //check if there's a coin and if so handle it appropriately
  else if(world[((pacman.y * 10) + pacman.x)] == 1){
    // there is a coin here, remove it from the array
    world[((pacman.y * 10) + pacman.x)] = 2;
    //add 10 to the score
    score += 10;
    //play sound effect
    playcoin();
    //redraw map
    draw_world();
    draw_pacman();
    draw_ghost();
    draw_redghost();  
    //check to see if all coins have been eaten
    for (var i=0; i<world.length; i++)
    {
      if (i == (world.length -1) && world[world.length-1] != 1)
      {
        win();
      }
      else if (world[i] == 1)
      {
        A =1;
        break;
      }
    }

  }
  //check if pacman's on a cherry
  else if(world[((pacman.y * 10) + pacman.x)] === 3){
    // there is a cherry here, remove it from the array
    world[((pacman.y * 10) + pacman.x)] = 2;
    //add 50 to the score
    score += 50;
    //play sound effect
    playcherry();
    draw_world();
    draw_pacman();
    draw_ghost();
    draw_redghost();
  }   
  else {
    // call functions to update the view
    draw_world();
    draw_pacman();
    draw_ghost();
    draw_redghost();}
  };
  //Moves for red ghost
  var moveRedGhost = setInterval( function redghostmove(){
      //start a do while loop that will generate a different direction until the direction generated is one that the ghost can go
      A = 0;
      do {
        B = Math.floor(Math.random() *4);
        //move left across map
        if (B == 0 && redghost.x ==0 && redghost.y == 4)
        {
          redghost.x = 9;
          redghost.y = 4;
          redghostdirection = "left";
          A = 1;
        }
        else if (B == 0 && (world[((redghost.y * 10) + redghost.x) - 1]) !== 0)
        {
          //move left
          redghost.x -= 1;
          redghostdirection = "left";
          A = 1;
        }
        else if (B == 1 && (world[((redghost.y * 10) + redghost.x) - 10]) !== 0)
        {
          //move up
          redghost.y -= 1;
          redghostdirection = "up";
          A = 1;
        }
         else if (B == 2 && redghost.x==9 && redghost.y == 4)
        {
          //move right across map
          redghost.x=0;
          redghost.y=4;
          redghostdirection = "right";
          A =1;
        }
         else if (B == 2 && (world[((redghost.y * 10) + redghost.x) + 1]) !== 0)
        { 
          //move right
          redghost.x += 1;
          redghostdirection = "right";
          A = 1;
        }
         else if (B ==3 && (world[((redghost.y * 10) + redghost.x) +10 ]) !== 0)
        {
          //move down
          redghost.y +=1;
          redghostdirection="down";
          A = 1;
        } 
      }
    while (A == 0);
    draw_redghost();  
  }, 500); //repeat this every half second
      //Blue ghost moves
  var moveGhost = setInterval( 
        function ghostmove(){
        //start a do while loop that will generate a different direction until the direction generated is one that the ghost can go
          A = 0;
          do {
            B = Math.floor(Math.random() *4);
            //move left across map
            if (B == 0 && ghost.x ==0 && ghost.y == 4)
            {
              ghost.x = 9;
              ghost.y = 4;
              ghostdirection = "left";
              A = 1;
            }
            //move left
            else if (B == 0 && (world[((ghost.y * 10) + ghost.x) - 1]) !== 0)
            {
              ghost.x -= 1;
              ghostdirection = "left";
              A = 1;
            }
            //move up
            else if (B == 1 && (world[((ghost.y * 10) + ghost.x) - 10]) !== 0)
            {
              ghost.y -= 1;
              ghostdirection = "up";
              A = 1;
            }
            //move right across map
            else if (B == 2 && ghost.x==9 && ghost.y == 4)
            {
              ghost.x=0;
              ghost.y=4;
              ghostdirection = "right";
              A =1;
            }
            //move right
            else if (B == 2 && (world[((ghost.y * 10) + ghost.x) + 1]) !== 0)
            { ghost.x += 1;
              ghostdirection = "right";
              A = 1;}
            //move down
            else if (B ==3 && (world[((ghost.y * 10) + ghost.x) +10 ]) !== 0)
            {
              ghost.y +=1;
              ghostdirection="down";
              A = 1;
            }
          }
         while (A == 0);
      draw_world();
      draw_pacman();  
      draw_ghost();
      draw_redghost();
      if (pacman.x == ghost.x && pacman.y == ghost.y ||pacman.x == redghost.x && pacman.y == redghost.y ) 
        {
          pacmandies();}
        }, 500);
         //Function when pacman dies
    function pacmandies()
    {
      function playdeath()
      {
        play(sounds.die);
      }
      //play death music
      playdeath();
      //Clear Gameon text if still there
      document.getElementById('countofnum').innerHTML = "";
      //Create losing screen
      document.getElementById('world').innerHTML = "<div class='death'><center>You lose!!!<br><div style= \"font-size:80% \">&nbsp;&nbsp;Score: " + score + "</div><br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Play Again\" onClick=\"playPacman();\"></center></div>";
      //set all repeated variables to null
      world = [];
      pacman = {};
      ghost = {};
      redghost = {};
      score = 0;
      //clear all recurring processes
      clearInterval(refreshCherry);
      clearInterval(moveGhost);
      clearInterval(moveRedGhost);
      //invalidate keystrokes
      document.onkeydown = function(){};
    }
    //What to do if you win
    function win()
    {
      //play winning music
      play(sounds.win);
      //Create winning screen
        document.getElementById('world').innerHTML = "<div class='death'>You win!!!<br><div style= \"font-size:80% \">&nbsp;&nbsp;Score: " 
        + score + "</div><br><input class='btn waves-effect waves-light red' type=\"button\" value=\"Play Again\" onClick=\"playPacman();\"></div>";
    //set all repeated variables to null
      world = [];
      pacman = {};
      ghost = {};
      redghost={};
      score = 0;
    //clear all recurring processes
        clearInterval(refreshCherry);
        clearInterval(moveGhost);
        clearInterval(moveRedGhost);
    //invalidate keystrokes
        document.onkeydown = function(f){};  
    } 
    }, 4000);  
    //Function to play coin noise
    function playcoin()
    {
      play(sounds.coin);
    }
    //Function to play cherry noise
    function playcherry()
    {
      play(sounds.cherry);
    }
    //Function to add cherry to a random blank spot (that pacman isn't in)
    var refreshCherry = setInterval(function(){
      //Create an array to hold every blank space in world
      openSquares = [];
      for (var i=0; i<world.length; i++)
      {
        if (world[i]===2 && i != ((pacman.y * 10) + pacman.x))
          {openSquares.push(i);}
      }
      //Generate a random position in the openSquares array
      var A = Math.floor( Math.random() * openSquares.length );
      //Save the value, which is an open value in world array
      var B = openSquares[A];
      //Set it to equal 3, a cherry
      world[B] = 3;
      //redraw map
      draw_world();
      draw_pacman();
      draw_ghost();
      draw_redghost();  
    }, 15000); //repeat every 15 seconds
  }
//Uncomment below to start game on page init
//playPacman();
});