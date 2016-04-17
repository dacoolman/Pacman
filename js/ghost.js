var Ghost = function(x,y,name){
	this.name = name;
	this.initCoordinates(x,y);
  };
 Ghost.prototype = new Character();
 Ghost.prototype.characterType = 'ghost';