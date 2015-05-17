//play coin sound

 var pacman = {
      x: 5,
      y: 5
    };
    //create an object to store the direction pacman should be looking at
    var direction = "";
    
    // create an array to hold the 'world' or gameboard that we will use to represent what each box in the grid will be
    var world = [
      0,0,0,0,0,0,0,0,0,0,
      0,1,1,1,1,1,1,1,1,0,
      0,1,1,1,1,1,1,1,1,0,
      0,1,1,1,1,1,1,1,1,0,
      0,1,1,1,2,1,1,1,1,0,
      0,1,0,1,1,1,2,2,2,0,
      0,1,0,1,1,1,1,1,1,0,
      0,1,0,0,1,0,0,1,1,0,
      0,1,1,1,1,1,1,1,1,0,
      0,0,0,0,0,0,0,0,0,0,
    ];
    var score = 0
    // create the html to render/display in the browser for the user to see
    function draw_world(){
      // using innerHTML to set (can also get!) the contents of the element with the ID of 'world'
      document.getElementById('world').innerHTML = "";
      // loop through the 'world' array to generate the html
      for(var i = 0; i < world.length; i++){

        if(world[i] === 0) {
          // draw a brick
          document.getElementById('world').innerHTML += 
           
            "<div class='brick' style='top:" + Math.floor(i/10)*32 + "px;left:" + (i%10)*32  + "px'></div>";
          
        } else if(world[i] === 1){
          // draw a coin
          document.getElementById('world').innerHTML +=
            "<div class='coin' style='top:" + Math.floor(i/10)*32  + "px;left:" + (i%10)*32  + "px'></div>";
     
        }
      }
      //draw score
    
                 document.getElementById('world').innerHTML +=
            "<div class='score'>" +  "Score: " + score + "</div>"; 
    }

    // create the html to render pacman in the html
    function draw_pacman(){
    	if (direction == "up")
    	{
    		 document.getElementById('world').innerHTML = document.getElementById('world').innerHTML + "<div class='pacmanup' style='top: " + pacman.y * 32 + "px; left: " + pacman.x * 32 + "px'></div>";
    		
    	}
    	else if (direction == "down")
    	{
    	 document.getElementById('world').innerHTML = document.getElementById('world').innerHTML + "<div class='pacmandown' style='top: " + pacman.y * 32 + "px; left: " + pacman.x * 32 + "px'></div>";	
    	}
    	
    		else if (direction == "left")
    	{
    	 document.getElementById('world').innerHTML = document.getElementById('world').innerHTML + "<div class='pacmanleft' style='top: " + pacman.y * 32 + "px; left: " + pacman.x * 32 + "px'></div>";	
    	}
    		else 
    	{
    	 document.getElementById('world').innerHTML = document.getElementById('world').innerHTML + "<div class='pacman' style='top: " + pacman.y * 32 + "px; left: " + pacman.x * 32 + "px'></div>";	
    	}
    	
    	
    	
     
    }

    // call functions
    draw_world();
    draw_pacman();

    document.onkeydown = function(e){
 
      // determine if an arrow key was pressed
      if(e.keyCode == 37 && (world[((pacman.y * 10) + pacman.x) - 1]) !== 0){
        // go left
        pacman.x -=  1; // if this spot == 0 its a 'brick' don't allow movement to occur
        direction = "left";
      } else if(e.keyCode == 39 && (world[((pacman.y * 10) + pacman.x) + 1]) !== 0){
        // go right
        pacman.x += 1;
        direction = "right";
      }
      //go down
      else if (e.keyCode === 40 && (world[((pacman.y * 10) + pacman.x) + 10]) !== 0){
      	pacman.y += 1;
      	direction = "down";
      }
      //go up
      else if (e.keyCode === 38 && (world[((pacman.y * 10) + pacman.x) - 10]) !== 0)
      {pacman.y -=1;
      	direction = "up"}
      if(world[((pacman.y * 10) + pacman.x)] == 1){
      	
      	 //play sound
        playSound('coin5.wav');
        
        // there is a coin here, remove it from the array
       world[((pacman.y * 10) + pacman.x)] = 2;
        //add 10 to the score
        score += 10;
      }
      // call functions to update the view
      draw_world();
      draw_pacman();
  
    };
      
    
  function playSound(soundfile) {
  document.getElementById("dummy").innerHTML= "<embed src=\""
    +soundfile+"\" hidden=\"true\" autostart=\"true\"
    loop=\"false\" />";}
    
     //play sound
        playSound('coin5.wav');
   
