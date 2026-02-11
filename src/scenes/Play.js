class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    preload(){
        this.guns = []
        this.pistons = []
        this.currentGunIndex = 0
        this.readyToFire = true
        this.fireDelay = 3000;
        this.roadSpeed = 5;

    }
    create(){
        
        this.road = this.add.tileSprite(0,100 , 0, 0, 'roadTile').setOrigin(0,0)
        //Set Up Player
        this.player = new Player(this, 0, 0, 'rocketMan', 0)

        this.refernceSquare = this.add.rectangle(1280,600,350,350,0x00ff00,0.5).setOrigin(1,1)
        
        //Make invisble collision boxes for the play area and enable the player to stand on it 
        this.platform = this.add.rectangle(this.game.config.width/2, 500, this.game.config.width, 10, 0x000000, 0)
        this.physics.add.existing(this.platform, true)
        this.physics.add.collider(this.player, this.platform)

        
        
        //Set Up Keys
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

         for(let i = 0; i < 5; i++){
            this.guns.push(new Gun(this, this.game.config.width -50, 300, 'gunShot', 0))
            this.guns[i].setVisible(false)
            this.pistons.push(new Piston(this, 0, 0, 'rocketMan', 0))
        }
    }

    update(time,delta){
        this.road.tilePositionX += this.roadSpeed;
        //Every 5 seconds have a new gun fire at the player, the speed of the shots between guns will decrease as time goes on
        if(this.readyToFire){
            this.readyToFire = false
            this.time.addEvent({
                delay: this.fireDelay,
                callback: () => {
                    this.readyToFire = true
                    console.log("Firing Gun")
                    this.guns[this.currentGunIndex].setVisible(true)
                    this.guns[this.currentGunIndex].attack(Phaser.Math.Between(50, this.game.config.height - 50))
                    this.pistons[this.currentGunIndex].attack(Phaser.Math.Between(50, this.game.config.width - 50))
                    this.currentGunIndex = (this.currentGunIndex + 1) % this.guns.length;
                    this.fireDelay = Math.max(500, this.fireDelay - 250); // Decrease delay but not below 0.5 seconds
                    this.roadSpeed = Math.min(20, this.roadSpeed + 0.5); // Increase road speed but not above 20
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

            if(Phaser.Input.Keyboard.JustDown(this.keys.a)){
                this.player.disableBody(true, false)
            }
        this.playerFSM.step()
    }
}