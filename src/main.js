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
        }
    },
    scene: [Play]
}

const game = new Phaser.Game(config)
