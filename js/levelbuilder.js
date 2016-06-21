Game.levelBuilder = {
	//***** operations for custom level *****
	checkSavedCustomGame: function() {
		//see if browser supports local storage
		if (typeof(Storage) !== "undefined") {
	    	var savedLevelString = localStorage.getItem('customLevel');
	    	if (savedLevelString) {
	    		var savedLevel = JSON.parse(savedLevelString);
	    		Game.customLevelSaved = true;
	    		Game.levels[0] = savedLevel;
	    		if (Game.levels[0].pacman) Game.levels[0].pacman = new Pacman(Game.levels[0].pacman.x, Game.levels[0].pacman.y, Game.levels[0].pacman.name, Game.levels[0].pacman.controls);
	 	    	if (Game.levels[0].mspacman) Game.levels[0].mspacman = new Pacman(Game.levels[0].mspacman.x, Game.levels[0].mspacman.y, Game.levels[0].mspacman.name, Game.levels[0].mspacman.controls);
	 	    	for (var i=0 ; i<Game.levels[0].ghosts.length ; i++) {
	 	    		Game.levels[0].ghosts[i] = new Ghost(Game.levels[0].ghosts[i].x, Game.levels[0].ghosts[i].y, Game.levels[0].ghosts[i].name);
	 	    	}
	    	}
	    	else Game.customLevelSaved = false;
		}
		else Game.customLevelSaved = false;
		//Update home screen with custom game is created
		if (Game.customLevelSaved) document.getElementById('custom_level').innerHTML = '<span style="color: white; text-align: center; display: inline-block; width: 400px; padding-bottom: 5px;">Custom level:</span> <br><input class=\'btn waves-effect waves-light green\' style="width: 195px; margin-top: 5px;  display: inline-block; margin: 0 auto;" value=\'Edit\' onClick="Game.levelBuilder.initLevelBuilder()"> <input class=\'btn waves-effect waves-light green\' style="width: 195px; margin-top: 5px;  display: inline-block; margin: 0 auto;" value=\'Play\' onClick="Game.playPacman(0);">';
		//Otherwise show the option to build a custom level
		else document.getElementById('custom_level').innerHTML = '<input type="button" class=\'btn waves-effect waves-light green\' style="width: 250px; margin-top: 10px;  display: block; margin: 0 auto;" value=\'Custom Level Builder\' onClick="Game.levelBuilder.initLevelBuilder();">';
	},

	initLevelBuilder: function() {
		document.getElementById('sound').innerHTML = "";
		Game.pacmans = [];
		Game.ghosts = [];
		var currentLevel = Game.levels[0];
		Game.world = currentLevel.world.slice();
		if (currentLevel.pacman) Game.pacmans.push(currentLevel.pacman);
		if (currentLevel.mspacman) Game.pacmans.push(currentLevel.mspacman);
		Game.ghosts = currentLevel.ghosts.slice();
		Game.gameWon = false;
		Game.gameInProgress = false;
		Game.level = 0;
		Game.renderAll();
		document.onclick = this.selectBlock.bind(this);
		document.onkeydown = this.keyDown.bind(this);
		this.currentCoordinates = {};
		this.currentCoordinates.x = 0;
		this.currentCoordinates.y = 0;
		this.selectBlock(this.getBlockInWorld('currentPosition'));
		this.addNavigationText();
	},

	saveCustomGame: function() {
		if (!this.validateLevel()) {
			this.addErrorText();
			return false;
		}
		var pacman = this.getPacman('pacman');
		if(pacman) pacman = new Pacman(pacman.x, pacman.y, pacman.name, pacman.controls)
		var mspacman = this.getPacman('mspacman');
		if(mspacman) mspacman = new Pacman(mspacman.x, mspacman.y, mspacman.name, mspacman.controls);
		var customLevel = {
			world: Game.world,
			pacman: pacman,
			mspacman: mspacman,
			ghosts:  Game.ghosts
		};
		localStorage.setItem('customLevel', JSON.stringify(customLevel));
		Game.levels[0].world = Game.world.slice();
		Game.levels[0].pacman = Game.clone(pacman);
		Game.levels[0].mspacman = Game.clone(mspacman);
		Game.levels[0].ghosts = Game.ghosts;
		this.saveText();
		return true;
	},

	getPacman: function(type) {
		for (var i=0 ; i<Game.pacmans.length ; i++) {
			if (Game.pacmans[i].name === type) return Game.pacmans[i];
		}
		return false;
	},

	savePlayCustomGame: function() {
		if (!this.saveCustomGame()) return;
		document.onclick = function(){};
		document.onkeydown = function(){};
		Game.playPacman(0);
	},

	saveReturnHome: function() {
		this.saveCustomGame();
		document.onclick = function(){};
		document.onkeydown = function(){};
		Game.showHomeScreen();
	},

	validateLevel: function() {
		var oneCoinExists = false;
		for (var i = 0 ; i<Game.world.length ; i++) {
			if (Game.world[i] === 1) {
				oneCoinExists = true;
				break;
			}
		}
		if (oneCoinExists && Game.pacmans.length > 0) return true;
		else return false;
		//at least one pacman
		//at least one coin
		
	},

	deleteSavedCustomGame: function() {
		localStorage.removeItem('customLevel');
		document.onclick = function(){};
		document.onkeydown = function(){};
		Game.levels[0].world = [
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2,
		    2,2,2,2,2,2,2,2,2,2
  	];
  		delete Game.levels[0].pacman;
  		delete Game.levels[0].mspacman;
  		Game.levels[0].ghosts = [];
		Game.showHomeScreen();
	},
	// ***** User navigation functions *****
	keyDown: function(e) {
		var that = this;
		switch(Game.keyCodeMap[e.keyCode]) {
			//move cursor
			case 'left':
			case 'right':
			case 'up':
			case 'down':
				if (that.currentCoordinates) {
					var block = that.getBlockInWorld(Game.keyCodeMap[e.keyCode]);
					that.selectBlock(block);
				}
				break;
			//wall
			case '1':
			//coin
			case '2':
			//cherry
			case '3':
			//empty space
			case '4':
			//blue ghost
			case '5':
			//red ghost
			case '6':
			//pacman
			case '7':
			//mspacman
			case '8':
				that.drawSprite(Game.keyCodeMap[e.keyCode]);
				Game.renderAll();
				that.selectBlock(that.getBlockInWorld('currentPosition'));
				if (Game.keyCodeMap[e.keyCode] === '8') this.addMsPacmanText();
				break;
		}
	},

	getBlockInWorld: function(move) {
		var block;
		var that = this;
		switch(move) {
			//rewrite to get selected block based on new x and y value
			case 'left':
				if (that.currentCoordinates.x === 0) {
					//block = Game.world[((that.currentCoordinates.y * 10) + 9)];
					block = this.getBlockInDOM(9, that.currentCoordinates.y);
				}
				else {
					//block = Game.world[(that.currentCoordinates.y * 10) + (that.currentCoordinates.x - 1)];
					block = this.getBlockInDOM(that.currentCoordinates.x - 1, that.currentCoordinates.y);
				}
				break;
			case 'right':
				if (that.currentCoordinates.x === 9) {
					//block = Game.world[((that.currentCoordinates.y * 10) + 0)]
					block = this.getBlockInDOM(0, that.currentCoordinates.y);
				}
				else {
					//block = Game.world[(that.currentCoordinates.y * 10) + (that.currentCoordinates.x + 1)];
					block = this.getBlockInDOM(that.currentCoordinates.x + 1, that.currentCoordinates.y);
				}
				break;
			case 'up':
				if (that.currentCoordinates.y === 0) {
					//block = Game.world[((9 * 10) + that.currentCoordinates.x)]
					block = this.getBlockInDOM(that.currentCoordinates.x, 9);
				}
				else {
					//block = Game.world[(( that.currentCoordinates.y - 1 ) * 10) + that.currentCoordinates.x];
					block = this.getBlockInDOM(that.currentCoordinates.x, that.currentCoordinates.y - 1);
				}
				break;
			case 'down':
				if (that.currentCoordinates.y === 9) {
					//block = Game.world[((0 * 10) + that.currentCoordinates.x)]
					block = this.getBlockInDOM(that.currentCoordinates.x, 0);
				}
				else {
					//block = Game.world[(( that.currentCoordinates.y + 1 ) * 10) + that.currentCoordinates.x];
					block = this.getBlockInDOM(that.currentCoordinates.x, that.currentCoordinates.y + 1);
				}
				break;
			//get current position
			case 'currentPosition':
				block = this.getBlockInDOM(that.currentCoordinates.x, that.currentCoordinates.y);
				break;
		}
		return block;
	},

	getBlockInDOM: function(x,y) {
		return document.querySelector('[xvalue="' + x + '"][yvalue="' + y + '"]');
	},

	selectBlock: function(e) {
		if (!e) return;
		var selectedBlock = (e.target ? e.target : e);
		var xValue = selectedBlock.getAttribute('xvalue');
		var yValue = selectedBlock.getAttribute('yvalue');
		if (!isNaN(xValue) && !isNaN(yValue)) {
			xValue = Number(xValue);
			yValue = Number(yValue);
			if (xValue >= 0 && xValue <= 9 && yValue >= 0 && yValue <= 9) {
				this.currentCoordinates = {};
				this.currentCoordinates.x = xValue;
				this.currentCoordinates.y = yValue;
				selectedBlock.focus();
			}
		} 	
	},

	drawSprite: function(numPressed) {
		this.checkOverwriteCharacter();
		switch(numPressed) {
			//wall
			case '1':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 0;
				break;
			//coin
			case '2':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 1;
				break;
			//cherry
			case '3':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 3;
				break;
			//empty space
			case '4':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				break;
			//blue ghost
			case '5':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				Game.ghosts.push(new Ghost(this.currentCoordinates.x,this.currentCoordinates.y,'ghost'));
				break;
			//red ghost
			case '6':
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				Game.ghosts.push(new Ghost(this.currentCoordinates.x,this.currentCoordinates.y,'redghost'));
				break;
			//pacman
			case '7':
				for (var i = 0 ; i<Game.pacmans.length ; i++) {
					if (Game.pacmans[i].name === 'pacman') {
						Game.pacmans.splice(i,1);
						break;
					}
				}
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				Game.pacmans.push(new Pacman(this.currentCoordinates.x,this.currentCoordinates.y,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}));
				break;
			//mspacman
			case '8':
				for (var i = 0 ; i<Game.pacmans.length ; i++) {
					if (Game.pacmans[i].name === 'mspacman') {
						Game.pacmans.splice(i,1);
						break;
					}
				}
				Game.world[(this.currentCoordinates.y * 10) + (this.currentCoordinates.x )] = 2;
				Game.pacmans.push(new Pacman(this.currentCoordinates.x,this.currentCoordinates.y,'mspacman', {a: 'left', w: 'up', d: 'right', s: 'down'}));
				break;
		}

	},

	checkOverwriteCharacter: function(){
		//check if overwriting a pacman
		for (var i=0 ; i<Game.pacmans.length ; i++) {
			if (Game.pacmans[i].x === this.currentCoordinates.x && Game.pacmans[i].y === this.currentCoordinates.y) {
				Game.pacmans.splice(i,1);
				return;
			}
		}
		//check if overwriting a ghost
		for (var i=0 ; i<Game.ghosts.length ; i++) {
			if (Game.ghosts[i].x === this.currentCoordinates.x && Game.ghosts[i].y === this.currentCoordinates.y) {
				Game.ghosts.splice(i,1);
				return;
			}
		}
	},

	// ***** Style custom level builder *****

	styleLevelBuilder: function() {
		this.showBorder();
		this.addHelpText();
		this.addExtraInfoDiv();
		this.saveIcon();
		this.savePlayIcon();
		this.saveHomeIcon();
		this.deleteIcon();
	},

	showBorder: function() {
    	document.getElementById('world').innerHTML += "<div class='world_border'></div>";
  	},

  	addHelpText: function() {
  		document.getElementById('world').innerHTML += "<div class='levelbuilderinfo'>Use numbers on keyboard to add to level. <ul><li>1 = Wall</li> <li>2 = Coin</li> <li>3 = Cherry</li> <li>4 = Empty</li> <li>5 = Blue Ghost</li> <li> 6 = Red Ghost</li><li>7 = Pacman</li><li>8 = Miss pacman</li></div>";
  	},

  	addExtraInfoDiv: function() {
  		document.getElementById('world').innerHTML += "<div id='levelbuilderextrainfo'></div>";
  	},

  	addNavigationText: function() {
  		document.getElementById('levelbuilderextrainfo').innerHTML = "<span style='color: orange;'>Move with mouse or up, down, left and up keys</span>";
  	},

  	addMsPacmanText: function() {
  		document.getElementById('levelbuilderextrainfo').innerHTML = "<span style='color: green;'>MsPacman moves with a, w, d, and s keys</span>";
  	},

  	addErrorText: function() {
  		document.getElementById('levelbuilderextrainfo').innerHTML = "<span style='color: red;'>At least one pacman and at least one coin required</span>";
  	},

   	saveText: function() {
  		document.getElementById('levelbuilderextrainfo').innerHTML = "<span style='color: yellow;'>Game Saved!</span>";
  	},

  	saveIcon: function() {
  		document.getElementById('world').innerHTML += "<div onclick='Game.levelBuilder.saveCustomGame()' class='pacman_icon' id='save_icon'><i class='material-icons'>save</i><br>Save</div>";
  	},

  	savePlayIcon: function() {
  		document.getElementById('world').innerHTML += "<div onclick='Game.levelBuilder.savePlayCustomGame()' class='pacman_icon' id='save_play_icon'><i class='material-icons'>play_circle_filled</i><br>Save and Play</div>";
  	},

  	saveHomeIcon: function() {
  		document.getElementById('world').innerHTML += "<div onclick='Game.levelBuilder.saveReturnHome()' class='pacman_icon' id='save_home_icon'><i class='material-icons'>home</i><br>Home Screen</div>";
  	},

  	deleteIcon: function() {
  		document.getElementById('world').innerHTML += "<div onclick='Game.levelBuilder.deleteSavedCustomGame()' class='pacman_icon' id='delete_icon'><i class='material-icons'>delete</i><br>Delete level</div>";
  	},

  	editIcon: function() {
  		document.getElementById('world').innerHTML += "<div onclick='Game.editLevelInGame();' class='pacman_icon' id='edit_icon'><i class='material-icons'>mode_edit</i><br>Edit level</div>";
  	}
};

//get level from friends:
//console.log(Game.world);
//for (var i = 0 ; i<Game.ghosts.length ; i++) {console.log(Game.ghosts[i])}
//for (var i = 0 ; i<Game.pacmans.length ; i++) {console.log(Game.pacmans[i])}