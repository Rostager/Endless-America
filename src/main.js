'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 256*5,
    height: 256*3,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 980 },
            debug: true
        },
    backgroundColor: '#000000'    
    },
    scene: [Load, Play]
}

const game = new Phaser.Game(config)
