There are two parts to this repository: a multi level game of Pacman to beat and a custom level creator where you can create your own level and play it.

Local storage is used to store the custom game you create. 

Unlimited ghosts are allowed and you can add/substitute mspacman.

There are ghosts that will move randomly every half second to an available open space. They will face left or right depending on the last direction they turned, similar to Pacman.

All characters can go to the holes in the level to get to the other side. Also a cherry will appear every 30 seconds to a blank space if there is one

Sound is added by the html 5 audio tag whenever the appopriate event happens. The sound works best on firefox.

I added two cheat codes: 
1. If the user types "cherry", every blank space will turn to a cherry.
2. If the user types "pacman", the user wins

After each change in the world the world is regenerated to reflect the new information.

Made with vanilla javascript on the client. Supported on Firefox and Chrome.
