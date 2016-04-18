var Ghost = function(x,y,name){
	this.name = name;
	this.initCoordinates(x,y);
  };
 Ghost.prototype = new Character();
 Ghost.prototype.characterType = 'ghost';
 Ghost.prototype.renderGhost = function(ghostdirection){
 	if (ghostdirection === 'left' || ghostdirection === 'right' ){
      this.renderCharacter.call(this, this.name + ghostdirection);
    }
    else {
      this.renderCharacter.call(this, this.name + 'right');
    }
 }