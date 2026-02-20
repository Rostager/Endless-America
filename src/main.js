/* Name: Robert Stager
   Date: 2/20/2026
   Title: Endless America
   Hourt to complete: ~30 hours
   Creative Tilt: I mean look at the art, its a monster made of america chasing you and shooting at you, what more do you need?
   Technical Tilt: 

things to change
- THe player should be running away from the monster (DONE_)
- The ground needs to go the other directon and when the player is on the ground should be going the other way (DONE)
- Include in-game instructions
- Add jump sound effect, and player death sound effect (bones crushing or something)
- Add time based score system
- Add credit screen

*/

'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 1280, //256*5
    height: 768, //256*3
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 980 },
            debug: true
        },
    backgroundColor: '#000000'    
    },
    scene: [Load, Menu, Play, GameOver]
}

const game = new Phaser.Game(config)
