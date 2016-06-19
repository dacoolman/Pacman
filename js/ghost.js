var Ghost = function(x,y,name){
	this.name = name;
	this.initCoordinates(x,y);
 };
 Ghost.prototype = new Character();
 Ghost.prototype.characterType = 'ghost';
 Ghost.prototype.renderGhost = function() {
 	if (this.direction === 'left') {
      this.renderCharacter.call(this, this.name + ' ' + 'faceleft');
    }
    else {
      this.renderCharacter.call(this, this.name + ' faceright');
    }
 }
 Ghost.prototype.availableMoves = function() {
 	var moves = [];
 	if (this.x === 0 || Game.world[((this.y * 10) + this.x) - 1] !== 0) moves.push('left');
  if (this.x === 9 || Game.world[((this.y * 10) + this.x) + 1] !== 0) moves.push('right');
 	if (this.y === 0 || Game.world[((this.y * 10) + this.x) - 10] !== 0) moves.push('up');
 	if (this.y === 9 || Game.world[((this.y * 10) + this.x) + 10] !== 0) moves.push('down');	
 	return moves;
 }

 Ghost.prototype.ghostMove = function() {
 	var moves = this.availableMoves();
    var selectedMove = moves[Math.floor(Math.random() * moves.length)];
    this.move(selectedMove);
 }