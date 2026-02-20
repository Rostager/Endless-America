class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 4, this.height - 20)
        this.body.setOffset(this.width / 2 - this.body.width / 2, 60)
        this.body.setCollideWorldBounds(true)
        
        this.movespeed = 2
        this.maxAirSpeed = 400
        this.maxRunSpeed = 800
        this.doubleJumpReady = true
        this.jumpHeight = 600

        this.enableGlide = false;
    
        //State Machine Setup
        scene.playerFSM = new StateMachine('fly', {
            run: new RunState(),
            fly: new FlyState(),
            death: new DeathState(),
        }, [scene, this])    
    } 
    
    death(){
        this.scene.playerFSM.transition('death')
    }
}

class RunState extends State {
    enter(scene, player) {
        console.log("enter-RunState")
        player.anims.play('playerRunAnim', true)
        player.body.setDragX(0)
        player.body.setMaxVelocity(player.maxRunSpeed,999)
    }

    execute(scene, player){
        const { left, right, up, down, space, shift } = scene.keys
       // console.log('execute-RunState')
       // console.log(player.body.position.x, player.body.position.y)
        //JUMP
        if(Phaser.Input.Keyboard.JustDown(space)){ 
            player.body.setVelocityY(-player.jumpHeight)
            this.stateMachine.transition('fly')
            return
        }

        //LEFT RIGHT RUN
        if(scene.keys.a.isDown){
            //add left force
            player.body.setVelocityX(-300 * player.movespeed)
        } else if(scene.keys.d.isDown){
            player.body.setVelocityX(300 * player.movespeed)
        }else{
            player.body.setVelocityX(scene.roadSpeed * 20) //Feels like road is draggin pla
        }

    }
}

class FlyState extends State {    //This is now gonna work as the "inAi state"
    enter (scene, player){
        console.log("enter-FlyState")
        player.anims.play('playerJumpAnim', true)
        player.body.setDragX(300)
        player.doubleJumpReady = true
        player.body.setMaxVelocity(player.maxAirSpeed, 999)
       // player.enableGlide = false;
    }

    execute (scene, player, time, delta){
        const { left, right, up, down, space, shift } = scene.keys
       // console.log('execute-FlyState')

        //console.log(player.body.acceleration)
        if(Phaser.Input.Keyboard.JustUp(space) && !player.doubleJumpReady){
            player.enableGlide = true
        }
        //UP DOWN JETPACK
        if(Phaser.Input.Keyboard.JustDown(space) && player.doubleJumpReady){
            player.body.setVelocityY(-player.jumpHeight)
            //if(Phaser.Input.Keyboard.JustUp(space)){
            player.doubleJumpReady = false;
           // }
        }
        //Down slam
        if(Phaser.Input.Keyboard.JustDown(scene.keys.s)){
            player.body.setVelocityY(player.jumpHeight)
        }

        //LEFT RIGHT JETPACK
        if(scene.keys.a.isDown){
            //add left force
            player.body.velocity.x -= 100
           // player.body.setAccelerationX(-500)
        } else if(scene.keys.d.isDown){
            player.body.velocity.x += 100
          //  player.body.setAccelerationX(500)
        }else{
       // player.body.setAccelerationX(0) 
        }

        //Check if body is touching bottom of world bounds
        if(player.body.blocked.down && player.body.velocity.y === 0){
            this.stateMachine.transition('run')
            return
        }
        
    }
}

class DeathState extends State {
    enter(scene, player){
        console.log("enter-DeathState")
       // player.scene.start("gameOverScene")
    }

}