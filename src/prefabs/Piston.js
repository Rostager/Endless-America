class Piston extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.telegraphDuration = 1500
        this.body.setSize(20, scene.game.config.height *2)
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
    attack(xPosition){
        console.log("In Gun Attack Function")
        this.x = xPosition
        //Start as a faded red rectangle and get more red, at the peack red make invisible and activate gun hitbox
        
        this.shotTelegraph = this.scene.add.rectangle(xPosition, this.scene.game.config.height/2, 20, this.scene.game.config.height, 0xff0000, 1)
        this.shotTelegraph.setAlpha(0)
        this.scene.tweens.add({
            targets: this.shotTelegraph,
            alpha: 1,
            duration: this.telegraphDuration,
            onComplete: () => {
                console.log("Fire Complete")
                this.shotTelegraph.destroy()
                this.body.setEnable(true)
                this.scene.time.delayedCall(10, () => {
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