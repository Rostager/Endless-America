class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }


    create(){
        this.add.text(this.game.config.width/2, this.game.config.height/2, "Game Over", {fontSize: '64px', fill: '#fff'}).setOrigin(0.5)
        this.add.text(this.game.config.width/2, this.game.config.height/2 + 100, "Press the space bar to return to the menu", {fontSize: '24px', fill: '#fff'}).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.createCursorKeys().space)){
            this.scene.start("menuScene")
        }
    }
}