/*things to change
- THe player should be running away from the monster
  The ground needs to go the other directon and when the player is on the ground should be going the other way
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
