//this contains the info for each level of the game
Game.levels = [];
//custom level
Game.levels[0] = {
	world: [
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
  	],
};

Game.levels[1] = {
	world: [
	    0,0,0,0,0,0,0,0,0,0,
	    0,1,1,1,1,1,1,1,1,0,
	    0,1,1,1,0,0,0,0,1,0,
	    0,0,0,1,1,1,1,1,1,0,
	    1,1,1,1,0,0,0,1,1,1,
	    0,1,0,1,1,2,0,2,2,0,
	    0,1,0,1,1,1,0,1,1,0,
	    0,1,0,0,1,0,0,1,0,0,
	    0,1,1,1,1,1,1,1,1,0,
	    0,0,0,0,0,0,0,0,0,0
  	],

  	pacman: new Pacman(5,5,'mrpacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
  	mspacman: new Pacman(1,8,'mspacman', {left: 'a', up: 'w', right: 'd', down: 'x'}),
  	ghosts: [new Ghost(1,1,'ghost'), new Ghost(8,8,'redghost')]
};