var Pacman = function(x,y,name){
	this.name = name;
	this.initCoordinates(x,y);
};

Pacman.prototype = new Character();

Pacman.prototype.characterType = 'pacman';

Pacman.prototype.renderPacman = function(){
 	this.renderCharacter.call(this, this.characterType + ' face' + this.direction);
};

Pacman.prototype.inspectBlock = function() {
	var blockValue = world[((this.y * 10) + this.x)];
	switch(blockValue){
		case 1:
			world[((this.y * 10) + this.x)] = 2;
			score += 10;
			play(sounds.coin);
			checkWin();
			break;
		case 3:
			world[((this.y * 10) + this.x)] = 2;
			score += 50;
			play(sounds.cherry);
			break;
	}
};