'use strict'

const config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 1024,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        },
    backgroundColor: '#000000'    
    },
    scene: [Load, Play]
}

const game = new Phaser.Game(config)
