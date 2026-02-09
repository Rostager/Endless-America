//A very basic generic main menu screen, just a play button and a little description of how to play the gamec
class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create(){
        //Load images and text for menu
        this.add.text(this.game.config.width/2, this.game.config.height/2, "Endless America", {fontSize: '64px', fill: '#fff'}).setOrigin(0.5)
        this.add.text(this.game.config.width/2, this.game.config.height/2 + 100, "Use the arrow keys to move and jump. Avoid the guns and pistons!", {fontSize: '24px', fill: '#fff'}).setOrigin(0.5)
        this.add.text(this.game.config.width/2, this.game.config.height/2 + 150, "Press the up arrow to test the gun and the down arrow to test the piston", {fontSize: '24px', fill: '#fff'}).setOrigin(0.5)
    }

    update(){
        console.log("In Menu Update Function")
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.createCursorKeys().space)){
            this.scene.start("playScene")
        }
    }


}