//functions and variables to render the world
var Game = {
  // *********** Game Init ****************
  playPacman: function(level, player2) {
    this.level = level;
    this.gameWon = false;
    this.gameInProgress = true;
    this.pacmans = [];
    this.ghosts = [];
    //Play intro song automatically
    this.play(this.sounds.intro);
    //get world and sprites from level
    var currentLevel = this.levels[level];
    this.world = currentLevel.world.slice();
    if (level === 0) {
      //if the user is playing the custom level, check if pacman or mspacman is set
      if (currentLevel.pacman) this.pacmans.push(Game.clone(currentLevel.pacman));
      if (currentLevel.mspacman) this.pacmans.push(Game.clone(currentLevel.mspacman));
    }
    else {
      //if not playing custom level, add pacman by default and mspacman if player2 is selected
      this.pacmans.push(Game.clone(currentLevel.pacman));
      if (player2) this.pacmans.push(Game.clone(currentLevel.mspacman));
    }
    //copy all ghost objects by reference
    for (var i=0 ; i<currentLevel.ghosts.length ; i++) {
      this.ghosts.push(Game.clone(currentLevel.ghosts[i]));
    }
    //world for testing
    //this.world = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,0,0,0,0,2,0,0,0,0,2,2,2,2,2,2,0,2,2,2,1,0,0,0,2,2,2,0,2,0,2,2,2,0,2,2,0,0,2,0,2,2,2,0,2,2,0,0,2,0,0,2,0,0,2,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,];
    this.renderAll();
    this.startCountdown(); 
    setTimeout(function(){
        // Handle keys pressed
      document.onkeydown = Game.keyDown.bind(Game);
      Game.moveGhostInterval = setInterval( Game.moveGhosts.bind(Game), 500);
    }, 4000);  
      Game.refreshCherryInterval = setInterval(Game.addCherry.bind(Game), 15000);
  },

  // *********** Audio handling ***********
  sounds: {
    intro:  "pacman_intro.mp3",
    die:    "pacmandies.mp3",
    win:    "pacman_intermission.wav",
    coin:   "pacmancoin.mp3",
    cherry: "pacman_eatfruit.wav" 
  },

  play: function(src) {
    if (!this.muted) {
      var audioString = "<audio autoplay=\"true\"><source id='current_sound' src=" + "./audio/" + src + " type=\"audio/mpeg\"></source></audio>";
      document.getElementById('sound').innerHTML = audioString;
    }
  },

  muted: false,

  mute: function() {
    document.getElementById('sound').innerHTML = "";
    this.muted = true;
    var muteElement = document.getElementById('mute');
    muteElement.onclick = function(){ this.unmute(); }.bind(Game);
    muteElement.innerHTML = '&#128263;';
  },

  unmute: function() {
    this.muted = false;
    var muteElement = document.getElementById('mute');
    muteElement.onclick = function(){ this.mute(); }.bind(Game);  
    muteElement.innerHTML = '&#128266;';
  },
  // ********** Score handling *********

  score: 0,

  updateScore: function(){
    document.getElementById('world').innerHTML += "<div class='score'>" +  "Score: " + this.score + "</div>";
  },
  // ******* Countdown Function *********

  startCountdown: function(){
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
  },

  // ******** KeyCode Map **********
  keyCodeMap: {
    8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
    34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
    48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
    61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
    77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
    96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
    106: "*", 107:"+", 109:"-", 110:".", 111: "/",
    112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
    144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
  },

  // ******** Render World *********
  draw_world: function() {
    document.getElementById('world').innerHTML = "";
    for(var i=0 ; i<this.world.length ; i++){
      switch (this.world[i]){
        case 0:
          this.addWorldElement('brick',i);
          break;
        case 1:
          this.addWorldElement('coin',i);
          break;
        case 2:
          this.addWorldElement('space',i);
          break;
        case 3:
          this.addWorldElement('cherry',i);
          break;
      }
    }
    if (this.level === 0 && !this.gameInProgress) this.levelBuilder.styleLevelBuilder();
    else this.updateScore();  
  },

  renderAll: function(){
    if (this.gameWon) return;
    this.draw_world();
    for (var i = 0; i<this.pacmans.length; i++) {
      this.pacmans[i].renderPacman();
    };
    for (var i = 0; i<this.ghosts.length; i++) {
      this.ghosts[i].renderGhost();
    };
  },

  addWorldElement: function(cssClass,i) {
    var editingCustomLevelClass = (this.level === 0 && this.gameInProgress === false ? 'editable ' : '');
    var editingCustomLevelTabindex = (this.level === 0 && this.gameInProgress === false ? ' tabindex="1" ' : '');
    document.getElementById('world').innerHTML += "<div class='sprite " + editingCustomLevelClass + cssClass + "' yvalue='" + Math.floor(i/10) + "' xvalue='" + i%10 + "' style='top:" + Math.floor(i/10)*32 + "px; left:" + (i%10)*32  + "px'" + editingCustomLevelTabindex + "></div>"; 
  },

  //***** End of Game/transition functions *****

  checkWin: function() {
    for (var i=0; i<this.world.length; i++) {
      if (i === (this.world.length -1) && this.world[this.world.length-1] != 1) {
        this.win();
        this.gameWon = true;
        return true;
      }
      else if (this.world[i] == 1) {
        return false;
      }
    }
  },

  win: function() {
    this.play(this.sounds.win);
    var nextLevelNum = this.level + 1;
    var nextLevel = this.level === this.levels.length - 1 || this.level === 0 ? "" : "<input class='btn waves-effect waves-light red' type=\"button\" value=\"Continue\" onClick=\"Game.playPacman(" + nextLevelNum + ");\">" ;
    var text = this.level === this.levels.length - 1 || this.level === 0 ? "You beat Pacman. Thanks for playing!!" : "You beat the level, keep going!";
    var editLevel = this.level === 0 ? "<br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Edit Level\" onClick=\"Game.levelBuilder.initLevelBuilder();\">" : '';
    document.getElementById('world').innerHTML = "<div class='transition'>"+ text +"<br><div style= \"font-size:80% \">Score: " 
      + this.score + "</div><br>"+ nextLevel +"<input class='btn waves-effect waves-light red' type=\"button\" value=\"Play Again\" onClick=\"Game.playPacman(" + this.level + ");\">" + editLevel + "</div>";
    this.endGame();
  },

  die: function() {
    this.play(this.sounds.die);
    var reset = this.level <= 1 ? "" : "<br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Reset\" onClick=\"Game.playPacman(1);\">";
    var editLevel = this.level === 0 ? "<br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Edit Level\" onClick=\"Game.levelBuilder.initLevelBuilder();\">" : '';
    //Clear Game-on text if still there
    document.getElementById('countofnum').innerHTML = "";
    document.getElementById('world').innerHTML = "<div class='transition'>You lose!!!<br><div style= \"font-size:80% \">Score: " + this.score + "</div><br><input class = 'btn waves-effect waves-light red' type=\"button\" value=\"Retry\" onClick=\"Game.playPacman("+ this.level +");\">" + reset + editLevel + "</div>";
    this.score = 0;
    this.endGame();
  },

  endGame: function() {
    document.getElementById('countofnum').innerHTML = "";
    //clear all recurring processes
    clearInterval(this.refreshCherryInterval);
    clearInterval(this.moveGhostInterval);
    //invalidate keystrokes
    document.onkeydown = function(){};
    this.gameInProgress = false;
  },

  showHomeScreen: function() {
    var coverPicHTML = '<img src="img/coverpicture.gif" style="width:400px; height:215px;"><br>';
    var helpTextHTML = '<span style="color: white; display: block; margin: 0 auto; text-align: center; padding-bottom: 15px;">Use the up, right, down and left keys to play!</span>';
    var playButtonHTML = '<input class="btn waves-effect waves-light red" style="display: block; margin: 0 auto 10px;" value="Play!" onClick="Game.playPacman(1);">';
    var customLevelHTML = '<div id="custom_level"></div>';
    document.getElementById('world').innerHTML = coverPicHTML + helpTextHTML + playButtonHTML + customLevelHTML;
    this.levelBuilder.checkSavedCustomGame();
  },

  // ***** Sprite methods *****

  pacmans: [],
  ghosts: [],

  getPacmansPosition: function(){
    var pacmansPosition = [];
    for (var i=0 ; i<this.pacmans.length ; i++) {
      pacmansPosition.push(this.pacmans[i].y * 10 + this.pacmans[i].x);
    }
    return pacmansPosition;
  },

  checkCollision: function(){
    if (this.gameWon) return;
    for (var i=0 ; i<this.pacmans.length ; i++) {
      var pacmanX = this.pacmans[i].x;
      var pacmanY = this.pacmans[i].y;
      for (var j=0 ; j<this.ghosts.length ; j++) {
        if (this.ghosts[j].x === pacmanX && this.ghosts[j].y === pacmanY) {
          this.die();
        }
      }

    }
  },

  moveGhosts: function() {
    for (var i=0 ; i<this.ghosts.length ; i++) {
      this.ghosts[i].ghostMove();
    }
    this.renderAll();
    this.checkCollision();
  },

  // **** Keydown handling *****
  //Support cheat codes
  cheatcode: [],
  password: "", 

  keyDown: function(e) {
    for (var i=0 ; i<this.pacmans.length ; i++) {
      var currentPacman = this.pacmans[i];
      if (currentPacman.controls[this.keyCodeMap[e.keyCode]]) {
        currentPacman.move(currentPacman.controls[this.keyCodeMap[e.keyCode]]);
        this.renderAll();
        break;
      }
    }
    //check for cheatcodes or quit
    switch(this.keyCodeMap[e.keyCode]) {
      case'q':
        this.die();
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
        this.cheatcode.push(this.keyCodeMap[e.keyCode]);
        break;
      //on last character of pacman or cherry, see if value was spelled
      case 'n':
      case 'y':
        this.cheatcode.push(this.keyCodeMap[e.keyCode]);
        this.password = this.cheatcode.join('').slice(-6);
        if (this.password === 'pacman') {
          this.win();
          return;
        }
        else if (this.password === 'cherry') {
          var pacmansPosition = this.getPacmansPosition();
          for (var i=0; i<this.world.length; i++) {
            if (this.world[i] === 2 && pacmansPosition.indexOf(i) === -1) {
              this.world[i] = 3;
            }
          }
          this.renderAll();
        }
        this.password = "";
        break;
    }
    //check to see if pacman ran into a ghost
    this.checkCollision();
  },

  // ***** Cherry Handling *****

  addCherry: function(){
      openSquares = [];
      var pacmansPosition = this.getPacmansPosition();
      for (var i=0; i<this.world.length; i++) {
        if (this.world[i] === 2 && pacmansPosition.indexOf(i) === -1) openSquares.push(i);
      }
      var selectedBlock = openSquares[Math.floor( Math.random() * openSquares.length )];
      this.world[selectedBlock] = 3;
      this.renderAll();  
    },

  // ***** Vanilla Javascript methods *****
  clone: function(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
};

//run on DOM loaded

document.addEventListener("DOMContentLoaded", function() {
  Game.showHomeScreen();
  //Uncomment below to start game on page init
  //Game.playPacman(4);
});
