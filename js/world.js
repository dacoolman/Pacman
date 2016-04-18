//functions and variables to render the world

// *********** Audio handling ***********

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
function addWorldElement(cssClass,i){
	document.getElementById('world').innerHTML += "<div class='" + cssClass + "' style='top:" + Math.floor(i/10)*32 + "px;left:" + (i%10)*32  + "px'></div>"; 
}