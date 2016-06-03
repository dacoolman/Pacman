function Character(){}

Character.prototype.initCoordinates = function(x,y){
	this.x = x;
	this.y = y;
};

Character.prototype.direction = '';

Character.prototype.renderCharacter = function(divClass) {
	var renderHTML = "<div class='sprite " + divClass + "' style='top: " + this.y * 32 + "px; left: " + this.x * 32 + "px'></div>";
	document.getElementById('world').innerHTML += renderHTML;
};

Character.prototype.move = function(direction) {
	switch (direction) {
		case 'left':
			if (this.x === 0) {
				this.x += 9;
				this.direction = 'left';
			}
			else if (Game.world[((this.y * 10) + this.x) - 1] !== 0) {
				this.x -= 1;
				this.direction = 'left';
			}
			break;
		case 'right':
			if (this.x === 9){
				this.x -= 9;
      			this.direction = "right";
			}
			else if (Game.world[((this.y * 10) + this.x) + 1] !== 0) {
				this.x += 1;
				this.direction = 'right';
			}
			break;
		case 'down':
			if (this.y === 9) {
				this.y -= 9;
				this.direction = "down";
			}
			else if (Game.world[((this.y * 10) + this.x) + 10] !== 0) {
      			this.y += 1;
      			this.direction = "down";
			}
			break;
		case 'up':
			if (this.y === 0) {
				this.y +=9;
				this.direction = 'up';
			}
			else if (Game.world[((this.y * 10) + this.x) - 10] !== 0) {
      			this.y -=1;
      			this.direction = "up";
      		}
      		break;
	}
	if (this.characterType === 'pacman') this.inspectBlock();
};