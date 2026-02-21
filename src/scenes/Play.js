class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    preload(){
        this.physics.world.drawDebug = false
        this.guns = []
        this.pistons = []
        this.currentGunIndex = 0
        this.readyToFire = true
        this.readyToSlam = true
        this.fireDelay = 4000;
        this.slamDelay = 5000;
        this.roadSpeed = 1;

    }
    create(){
        this.score = 0;
        
       //Asthetic Stuff
        this.backCity = this.add.tileSprite(0,0,0,0,'backCityTile').setOrigin(0,0)
        this.flagAnimationOverlay = this.add.sprite(this.game.config.width/2, this.game.config.height/2, 'flag').setOrigin(0,0).setScale(6.5).setAlpha(0.45)
        this.flagAnimationOverlay.play('flagAnim')
        this.frontCity = this.add.tileSprite(0,0,0,0,'frontCityTile').setOrigin(0,0)
        this.flagAnimationOverlay.setPosition(this.game.config.width/2 - this.flagAnimationOverlay.displayWidth/2, this.game.config.height/2 - this.flagAnimationOverlay.displayHeight/2)
        this.road = this.add.tileSprite(0,100 , 0, 0, 'roadTile').setOrigin(0,0)
        this.monsterAmerica = this.add.sprite(800, -50, 'monsterAmerica').setOrigin(0,0).setScale(2)
        this.monsterAmerica.play('monsterAmericaAnim')

        //Set Up Player
        this.player = new Player(this, 300, 500, 'rocketMan', 0).setScale(0.5,0.25)

        //Make invisble collision boxes for the play area and enable the player to stand on it 
        this.platform = this.add.rectangle(this.game.config.width/2, 560, this.game.config.width, 40, 0x000000, 0)
        this.physics.add.existing(this.platform, true)
        this.physics.add.collider(this.player, this.platform)

        this.walls = this.add.rectangle(950, this.game.config.height/2, 10, this.game.config.height, 0x000000, 0)
        this.physics.add.existing(this.walls, true)
        this.physics.add.collider(this.player, this.walls)
        
        
        //Set Up Keys
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.sound.add('pistolSound')
        this.sound.add('pistonSound')
        this.sound.add('whoosh')

        this.introTrack = this.sound.add('introTrack')
        this.loopTrack = this.sound.add('loopTrack')

        this.sound.play('introTrack', { 
                volume: 0.4
            })

        this.time.delayedCall(15500, () => {
            this.sound.play('loopTrack', { 
                volume: 0.4,
                loop: true
            })
        })
            

         for(let i = 0; i < 5; i++){
            this.guns.push(new Gun(this, this.game.config.width + 50, 300, 'gunShot', 0))
            this.guns[i].setVisible(false)
            this.pistons.push(new Piston(this, 0, 0, 'rocketMan', 0))
        }
        this.scoreTimer = this.add.image(this.game.config.width/2 - 170, this.game.config.height - 170, 'timer').setOrigin(0,0).setScale(0.80)
        this.scoreText = this.add.text(this.game.config.width/2 - 25, this.game.config.height- 80, Math.floor(this.score * 100) / 100, {fontSize: '32px', fill: '#000000'}).setOrigin(0.5)
    }

    update(time,delta){
        //Make the "score" just time survived 
        this.score += delta/1000
       
        //console.log("Score: " + Math.floor(this.score)) 
        this.timeDelta = delta
        this.backCity.tilePositionX += this.roadSpeed * -0.25 * this.timeDelta;
        this.frontCity.tilePositionX += this.roadSpeed * -0.5 * this.timeDelta;
        this.road.tilePositionX += this.roadSpeed * -1 * this.timeDelta;
        //Every 5 seconds have a new gun fire at the player, the speed of the shots between guns will decrease as time goes on
        if(this.readyToFire){
            this.readyToFire = false
            this.time.addEvent({
                delay: Phaser.Math.Between(this.fireDelay - 1000, this.fireDelay + 1000),
                callback: () => {
                    this.readyToFire = true
                    //console.log("Firing Gun")
                    this.guns[this.currentGunIndex].setVisible(true)
                    this.guns[this.currentGunIndex].attack(Phaser.Math.Between(50, 450))
                    //this.pistons[this.currentGunIndex].attack(Phaser.Math.Between(50, 700))
                    this.currentGunIndex = (this.currentGunIndex + 1) % this.guns.length;
                    this.fireDelay = Math.max(1500, this.fireDelay - 250); // Decrease delay but not below 0.5 seconds
                    this.roadSpeed = Math.min(20, this.roadSpeed + 0.2); // Increase road speed but not above 20
                }
            })
        }

        if(this.readyToSlam){
            this.readyToSlam = false
            this.time.addEvent({
                delay: Phaser.Math.Between(this.slamDelay - 1000, this.slamDelay + 1000),
                callback: () => {
                    this.readyToSlam = true 
                   //console.log("Slamming Piston")
                    this.pistons[this.currentGunIndex].attack(Phaser.Math.Between(50, 700))
                    this.currentGunIndex = (this.currentGunIndex + 1) % this.guns.length;
                    this.slamDelay = Math.max(1500, this.slamDelay - 500); // Decrease delay but not below 0.5 seconds
                    //this.roadSpeed = Math.min(20, this.roadSpeed + 0.5); // Increase road speed but not above 20
                }
            })
        }

        //if the player touches the right wall they die (they got caught by the monster)
        if(this.player.x + this.player.width / 2 >= this.walls.x + 100){
            this.playerFSM.transition('death')
        }

        if(this.playerFSM.state === 'death'){
            this.sound.stopAll()
            this.scene.start("gameOverScene", {score: Math.floor(this.score * 100) / 100})
        } 
           
        this.playerFSM.step()
        //make the score shake just a little bit to add some life to the UI
        this.shakeValue = Phaser.Math.Between(-2, 2)
        this.scoreTimer.setY(this.game.config.height - 170 + this.shakeValue)
        this.scoreText.setText(Math.floor(this.score * 100) / 100)
        this.scoreText.setY(this.game.config.height - 80 + this.shakeValue)
        

    }
}