class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Set Up Player
        this.player = new Player(this, 0, 0, 'rocketMan', 0)
        this.gun1 = new Gun (this, this.game.config.width -50, 300, 'rocketMan', 0)
        this.piston1 = new Piston (this, 0, 0, 'rocketMan', 0)
        //Set Up Keys
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update(time,delta){
        
        if(Phaser.Input.Keyboard.JustDown(this.keys.up)){
            this.gun1.attack(this.player.y)
        }

        if(Phaser.Input.Keyboard.JustDown(this.keys.down)){
            console.log(this.piston1.attack(this.player.x))
        }

        if(this.playerFSM.state === 'death'){
            this.scene.start("gameOverScene")
        }
        
        this.playerFSM.step()
    }
}