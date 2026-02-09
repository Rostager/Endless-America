class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        
        this.movespeed = 2
        this.maxAirSpeed = 400
        this.maxRunSpeed = 800
        this.doubleJumpReady = true
        this.jumpHeight = 800

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
        player.body.setDragX(0)
        player.body.setMaxVelocity(player.maxRunSpeed,999)
    }

    execute(scene, player){
        const { left, right, up, down, space, shift } = scene.keys
       // console.log('execute-RunState')

        //JUMP
        if(Phaser.Input.Keyboard.JustDown(space)){ 
            player.body.setVelocityY(-player.jumpHeight)
            this.stateMachine.transition('fly')
            return
        }

        //LEFT RIGHT RUN
        if(left.isDown){
            //add left force
            player.body.setVelocityX(-300 * player.movespeed)
        } else if(right.isDown){
            player.body.setVelocityX(300 * player.movespeed)
        }else{
            player.body.setVelocityX(-50) 
        }

    }
}

class FlyState extends State {
    enter (scene, player){
        console.log("enter-FlyState")
        player.body.setDragX(300)
        player.doubleJumpReady = true
        player.body.setMaxVelocity(player.maxAirSpeed, 999)
        player.enableGlide = false;
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
        else if(space.isDown && !player.doubleJumpReady && player.enableGlide){ 
            //add force to player body
            //let holdDuration = space.getDuration();
            //console.log(holdDuration)

            //if(holdDuration >= 300){
            player.body.velocity.y = 20
           // }
          //  player.body.setAccelerationY(-800)
        }else{
           // player.body.setAccelerationY(0)
        }

        //LEFT RIGHT JETPACK
        if(left.isDown){
            //add left force
            player.body.velocity.x -= 100
           // player.body.setAccelerationX(-500)
        } else if(right.isDown){
            player.body.velocity.x += 100
          //  player.body.setAccelerationX(500)
        }else{
       // player.body.setAccelerationX(0) 
        }

        //Check if body is touching bottom of world bounds
        if(player.body.blocked.down){
            this.stateMachine.transition('run')
        }
        
    }
}

class DeathState extends State {
    enter(scene, player){
        console.log("enter-DeathState")
       // player.scene.start("gameOverScene")
    }

}