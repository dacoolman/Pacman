var Pacman = function(x,y,name,controls){
	this.name = name;
	this.controls = controls;
	this.initCoordinates(x,y);
};

Pacman.prototype = new Character();

Pacman.prototype.characterType = 'pacman';

Pacman.prototype.renderPacman = function(){
 	this.renderCharacter.call(this, this.name + ' face' + this.direction);
};

Pacman.prototype.inspectBlock = function() {
	var blockValue = Game.world[((this.y * 10) + this.x)];
	switch(blockValue){
		case 1:
			Game.world[((this.y * 10) + this.x)] = 2;
			Game.score += 10;
			Game.play(Game.sounds.coin);
			Game.checkWin();
			break;
		case 3:
			Game.world[((this.y * 10) + this.x)] = 2;
			Game.score += 50;
			Game.play(Game.sounds.cherry);
			break;
	}
};