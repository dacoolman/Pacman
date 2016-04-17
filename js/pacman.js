var Pacman = function(x,y,name){
	this.name = name;
	this.initCoordinates(x,y);
  };
 Pacman.prototype = new Character()
 Pacman.prototype.characterType = 'pacman';