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
  	ghosts: []
};
//level 1
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

  	pacman: new Pacman(5,5,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
  	mspacman: new Pacman(1,8,'mspacman', {left: 'a', up: 'w', right: 'd', down: 'x'}),
  	ghosts: [new Ghost(1,1,'ghost'), new Ghost(8,8,'redghost')]
};

Game.levels[2] = {
	world: [
	    0,0,1,0,0,1,0,1,0,0,
	    1,1,1,1,1,1,1,1,1,1,
	    0,1,1,1,0,0,0,0,1,0,
	    0,0,0,1,1,1,1,1,1,0,
	    1,1,1,1,0,0,0,1,1,1,
	    0,1,0,1,1,2,0,2,2,0,
	    0,1,0,1,1,1,0,1,1,0,
	    1,1,0,0,1,0,0,1,0,1,
	    0,1,1,1,1,1,1,1,1,0,
	    0,0,1,0,0,1,0,1,0,0
  	],

  	pacman: new Pacman(5,5,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
  	mspacman: new Pacman(1,8,'mspacman', {left: 'a', up: 'w', right: 'd', down: 'x'}),
  	ghosts: [new Ghost(1,1,'ghost'), new Ghost(8,8,'redghost')]
};

Game.levels[3] = {
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

  	pacman: new Pacman(5,5,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
  	mspacman: new Pacman(1,8,'mspacman', {left: 'a', up: 'w', right: 'd', down: 'x'}),
  	ghosts: [new Ghost(1,1,'ghost'), new Ghost(2,2,'redghost'), new Ghost(8,8,'redghost'), new Ghost(7,8,'ghost')]
};

Game.levels[4] = {
	world: [
	    0,0,1,0,0,1,0,1,0,0,
	    1,1,1,1,1,1,1,1,1,1,
	    0,1,1,1,0,0,0,0,1,0,
	    0,0,0,1,1,1,1,1,1,0,
	    1,1,1,1,0,0,0,1,1,1,
	    0,1,0,1,1,2,0,2,2,0,
	    0,1,0,1,1,1,0,1,1,0,
	    1,1,0,0,1,0,0,1,0,1,
	    0,1,1,1,1,1,1,1,1,0,
	    0,0,1,0,0,1,0,1,0,0
  	],

  	pacman: new Pacman(5,5,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
  	mspacman: new Pacman(1,8,'mspacman', {left: 'a', up: 'w', right: 'd', down: 'x'}),
  	ghosts: [new Ghost(1,1,'ghost'), new Ghost(2,2,'redghost'), new Ghost(2,8,'redghost'), new Ghost(8,8,'redghost'), new Ghost(7,8,'ghost')]
};

Game.levels[5] = {
	world: [0, 3, 3, 3, 0, 0, 2, 0, 0, 0, 0, 3, 3, 3, 2, 1, 1, 0, 2, 0, 0, 3, 0, 3, 2, 1, 1, 0, 1, 0, 0, 3, 3, 3, 2, 1, 1, 0, 1, 0, 2, 3, 0, 3, 3, 1, 1, 0, 1, 2, 0, 2, 3, 3, 2, 1, 1, 0, 1, 0, 0, 3, 0, 3, 2, 1, 1, 0, 1, 0, 0, 3, 3, 3, 2, 1, 1, 0, 1, 0, 0, 3, 0, 3, 3, 1, 1, 1, 1, 0, 0, 3, 3, 3, 0, 0, 2, 0, 0, 0],
	pacman: new Pacman(1,5,'pacman', {left: 'left', up: 'up', right: 'right', down: 'down'}),
	ghosts: [
		new Ghost(4,1,'ghost'),
		new Ghost(4,2,'ghost'),
		new Ghost(4,3,'ghost'),
		new Ghost(4,5,'ghost'),
		new Ghost(4,6,'ghost'),
		new Ghost(4,7,'ghost'),
		new Ghost(8,1,'redghost'),
	],
};

