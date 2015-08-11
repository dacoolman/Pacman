Here is a game I made before the bootcamp. It is made with pure javascript. There is a world array that represents the level with a different number in each spot indicating if there is a wall, blank space, coin or cherry.

There are two ghosts that will move randomly every half second to an available open space. They will face left or right depending on the last direction they turned, similar to Pacman.

Both pacman and the ghosts can go to the holes in the level to get to the other side. Also a cherry will appear every 30 seconds to a blank space if there is one

Sound is added by the html 5 audio tag whenever the appopriate event happens. The sound works best on firefox.

I added two cheat codes: 
1. If the user types "cherry", every blank space will turn to a cherry.
2. If the user types "pacman", the user wins

After each change in the world the world is regenerated to reflect the new information.
