function Character(){}

Character.prototype.initCoordinates = function(x,y){
	this.x = x;
	this.y = y;
}
Character.prototype.direction = '';
Character.prototype.renderCharacter = function(divClass){
	var renderHTML = "<div class='" + divClass + "' style='top: " + this.y * 32 + "px; left: " + this.x * 32 + "px'></div>";
	document.getElementById('world').innerHTML += renderHTML;
}
Character.prototype.move = function(){
	
}