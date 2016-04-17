//functions and variables for the world
var sounds = {
  intro:  "pacman_intro.mp3",
  die:    "pacmandies.mp3",
  win:    "pacman_intermission.wav",
  coin:   "pacmancoin.mp3",
  cherry: "pacman_eatfruit.wav"
};

function play(src){
  var audioString = "<audio autoplay=\"true\"><source src=" + "./audio/" + src + " type=\"audio/mpeg\"></source></audio>";
  $('#sound').html(audioString);
}
var score = 0;
var world;
function draw_world(){
	document.getElementById('world').innerHTML = "";
	for(var i = 0; i < world.length; i++){
	  if(world[i] === 0) 
	  {
	    // draw a brick
	    document.getElementById('world').innerHTML += "<div class='brick' style='top:" + Math.floor(i/10)*32 + "px;left:" + (i%10)*32  + "px'></div>"; 
	  }  
	  else if(world[i] === 1)
	  {
	    // draw a coin
	    document.getElementById('world').innerHTML +=
	    "<div class='coin' style='top:" + Math.floor(i/10)*32  + "px;left:" + (i%10)*32  + "px'></div>";
	  }
	  else if(world[i] === 3)
	  {
	    // draw a cherry
	    document.getElementById('world').innerHTML += "<div class='cherry' style='top:" + Math.floor(i/10)*32  + "px;left:" + (i%10)*32  + "px'></div>";
	  }
	}
	//draw score
	document.getElementById('world').innerHTML += "<div class='score'>" +  "Score: " + score + "</div>"; 
}