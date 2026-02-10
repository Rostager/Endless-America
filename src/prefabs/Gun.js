class Gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //Gun animation stuff such as offset and origin
        this.visualYOffset = 32          // tweak this to move animation down
        this.setOrigin(0.5, 0.5)

        //For hitboxx and telegraphed attack
        this.telegraphDuration = 1500
        //Because the janky way I move the animation down I need to move the body up by double that amount to match the animation position
        this.body.setSize(scene.game.config.width *2, 20)
        this.body.setEnable(false)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }


    /*Psuedocode for gun
    1st: Play little animation of gun spinning and show a red horizontal rectangle across the screen at the Y posisiton provided to show 
    the player where the bullet is gonna shoot
    2nd: Spawn a trigger hitbox on that red horizontal box for a very quick moment
    3rd: If the player is hit they die 
    */
    attack(yPosition){
        console.log("In Gun Attack Function")
        
        //Set the position for the animation position
        this.setPosition(this.scene.scale.width - 50, yPosition + this.visualYOffset);

        //Start as a faded red rectangle and get more red, at the peack red make invisible and activate gun hitbox
        this.shotTelegraph = this.scene.add.rectangle(this.scene.game.config.width/2, yPosition, this.scene.game.config.width, 20, 0xff0000, 1)
        this.shotTelegraph.setAlpha(0)
        this.body.setOffset(this.body.offset.x, this.visualYOffset *2.7); // move the hitbox up to match the animation position
        //play the animation of the gun shooting (Adjust the telegraphDuration to match up with the animation)
        this.play('gunShotAnim')
        this.scene.tweens.add({
            targets: this.shotTelegraph,
            alpha: 1,
            duration: this.telegraphDuration,
            onComplete: () => {
                console.log("Fire Complete")
                this.shotTelegraph.destroy()
                this.body.setEnable(true)
                this.scene.time.delayedCall(100, () => {
                    this.body.enable = false
                    console.log("body disabled")
                })
            }
        })
        //check if player is touching the guns hitbox and if so return true
        this.scene.physics.add.overlap(this.scene.player, this, (player, gun) => {
            console.log("Player hit by gun!")
            this.scene.player.death()
        })
        
        
    }
        

}