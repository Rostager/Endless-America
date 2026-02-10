class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Create an array of guns 
        this.guns = []
        this.pistons = []
        this.currentGunIndex = 0
        this.readyToFire = true
        this.fireDelay = 3000; // Initial delay of 3 seconds

        for(let i = 0; i < 5; i++){
            this.guns.push(new Gun(this, this.game.config.width -50, 300, 'rocketMan', 0))
            this.pistons.push(new Piston(this, 0, 0, 'rocketMan', 0))
        }
        //Set Up Player
        this.player = new Player(this, 0, 0, 'rocketMan', 0)
        //this.gun1 = new Gun (this, this.game.config.width -50, 300, 'rocketMan', 0)
       // this.piston1 = new Piston (this, 0, 0, 'rocketMan', 0)
        //Set Up Keys
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    update(time,delta){
        //Every 5 seconds have a new gun fire at the player, the speed of the shots between guns will decrease as time goes on
        if(this.readyToFire){
            this.readyToFire = false
            this.time.addEvent({
                delay: this.fireDelay,
                callback: () => {
                    this.readyToFire = true
                    console.log("Firing Gun")
                    this.guns[this.currentGunIndex].attack(Phaser.Math.Between(50, this.game.config.height - 50))
                    this.pistons[this.currentGunIndex].attack(Phaser.Math.Between(50, this.game.config.width - 50))
                    this.currentGunIndex = (this.currentGunIndex + 1) % this.guns.length;
                    this.fireDelay = Math.max(500, this.fireDelay - 250); // Decrease delay but not below 0.5 seconds
                }
            })
        }
       // if(this.playerFSM.state !== 'death'){

       // }


        if(this.playerFSM.state === 'death'){
            this.scene.start("gameOverScene")
        }

        //Debug on/off with D key
            if(Phaser.Input.Keyboard.JustDown(this.keys.d)){
                this.physics.world.drawDebug = !this.physics.world.drawDebug
                this.physics.world.debugGraphic.clear()
            }
        this.playerFSM.step()
    }
}