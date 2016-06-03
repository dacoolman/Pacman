//functions and variables to render the world
var Game = {};
// *********** Audio handling ***********

var sounds = {
  intro:  "pacman_intro.mp3",
  die:    "pacmandies.mp3",
  win:    "pacman_intermission.wav",
  coin:   "pacmancoin.mp3",
  cherry: "pacman_eatfruit.wav"
};

function play(src) {
  var audioString = "<audio autoplay=\"true\"><source src=" + "./audio/" + src + " type=\"audio/mpeg\"></source></audio>";
    $('#sound').html(audioString);
}
var playCopy = play;

function mute(){
  play = function(){};
  var muteElement = document.getElementById('mute');
  muteElement.onclick = function(){ unmute(); };
  muteElement.innerHTML = '&#128263;';
}

function unmute(){
    play = playCopy;
    var muteElement = document.getElementById('mute');
    muteElement.onclick = function(){ mute(); }  ;  
    muteElement.innerHTML = '&#128266;';
}

// ********** Score handling *********

var score = 0;
function updateScore(){
	document.getElementById('world').innerHTML += "<div class='score'>" +  "Score: " + score + "</div>"; 
}

  // ******* Countdown Function *********

function startCountdown(){
  var numCount = 4;
  var countDownFunc = setInterval(function(){
      numCount -= 1;
      if (numCount==0)
        {
          document.getElementById('countofnum').innerHTML = "<div class='countdown'>Game on!</div>";
        }
      else
        {
          document.getElementById('countofnum').innerHTML = "<div class='countdown'>" + numCount + "</div>";
        }
      if (numCount<1)
      {
        clearInterval(countDownFunc);
      }
  }, 1000);
  setTimeout(function() {
    document.getElementById('countofnum').innerHTML = "";
  }, 9000);

}
// ******** KeyCode Map **********

var keyCodeMap = {
  8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
  34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
  48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
  61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
  77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
  96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
  106: "*", 107:"+", 109:"-", 110:".", 111: "/",
  112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
  144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};
// ******** Render World *********

var world;
function draw_world(){
	document.getElementById('world').innerHTML = "";
	for(var i=0 ; i<world.length ; i++){
		switch (world[i]){
			case 0:
				addWorldElement('brick',i);
				break;
			case 1:
				addWorldElement('coin',i);
				break;
			case 3:
				addWorldElement('cherry',i);
				break;
		}
	}
	updateScore();	
}
function addWorldElement(cssClass,i) {
	document.getElementById('world').innerHTML += "<div class='sprite " + cssClass + "' style='top:" + Math.floor(i/10)*32 + "px;left:" + (i%10)*32  + "px'></div>"; 
}
// ****** End of Game functions *****

var renderAll;
var endGame;
var gameWon;
function checkWin() {
  for (var i=0; i<world.length; i++) {
    if (i == (world.length -1) && world[world.length-1] != 1) {
      win();
      gameWon = true;
      return true;
    }
    else if (world[i] == 1) {
      return false;
    }
  }
}
function win() {
  play(sounds.win);
  document.getElementById('world').innerHTML = "<div class='death'>You win!!!<br><div style= \"font-size:80% \">&nbsp;&nbsp;Score: " 
    + score + "</div><br><input class='btn waves-effect waves-light red' type=\"button\" value=\"Play Again\" onClick=\"playPacman();\"></div>";
  endGame();
};

function die() {
  play(sounds.die);
  //Clear Game-on text if still there
  document.getElementById('countofnum').innerHTML = "";
  document.getElementById('world').innerHTML = "<div class='death'><center>You lose!!!<br><div style= \"font-size:80% \">Score: " + score + "</div><br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Play Again\" onClick=\"playPacman();\"></center></div>";
  endGame();
}

// ***** Cherry Handling *****



// ***** Coin Handling *****



