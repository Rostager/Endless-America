class Gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scene = scene

        //Gun animation stuff such as offset and origin
        this.visualYOffset = 190     
        this.visualXOffset = -300     // tweak this to move animation down
        this.setOrigin(0.5, 0.5)

        //For hitboxx and telegraphed attack, sync this up with animation time
        this.telegraphDuration = 1150
        //Because the janky way I move the animation down I need to move the body up by double that amount to match the animation position
        this.body.setSize(scene.game.config.width *2, 20)
        this.body.setEnable(false)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
        this.setScale(2)

    }


    /*Psuedocode for gun
    1st: Play little animation of gun spinning and show a red horizontal rectangle across the screen at the Y posisiton provided to show 
    the player where the bullet is gonna shoot
    2nd: Spawn a trigger hitbox on that red horizontal box for a very quick moment
    3rd: If the player is hit they die 
    */
    attack(yPosition){
        
        //Set the position for the animation position
        this.setPosition(750, yPosition);
        
        //Start as a faded red rectangle and get more red, at the peack red make invisible and activate gun hitbox (Deprocated the visual) 
        this.shotTelegraph = this.scene.add.rectangle(this.scene.game.config.width/2, yPosition + 110, this.scene.game.config.width, 20, 0xff0000, 1)
        this.shotTelegraph.setAlpha(0)
        this.body.setOffset(this.body.offset.x,this.visualYOffset); // move the hitbox up to match the animation position
        //play the animation of the gun shooting (Adjust the telegraphDuration to match up with the animation)
        this.play('gunShotAnim')
        this.scene.time.delayedCall(this.telegraphDuration - 100, () => {
            this.scene.sound.play('pistolSound', { 
                volume: 0.4,
                rate: Phaser.Math.FloatBetween(0.75, 1.25) // Add slight randomization to the pitch
            })
        })

        //Not efficent, was used when the telegraph was visible, now just used to time up with the animation, could use a delayedCall instead
        this.scene.tweens.add({
            targets: this.shotTelegraph,
            alpha: 0,
            duration: this.telegraphDuration,
            onComplete: () => {
                //console.log("Fire Complete")
                //this.shotTelegraph.destroy()

                //Quickly anable hitbox on then off
                this.body.setEnable(true)                      
                this.scene.time.delayedCall(10, () => {
                    this.body.enable = false
                    //console.log("body disabled")
                })
            }
        })

        //check if player is touching the guns hitbox and if so return true
        this.scene.physics.add.overlap(this.scene.player, this, (player, gun) => {
            //console.log("Player hit by gun!")
            this.scene.player.death()
        })
        
        
    }
        

}