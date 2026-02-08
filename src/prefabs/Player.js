class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
    
        //State Machine Setup
        scene.playerFSM = new StateMachine('fly', {
            run: new RunState(),
            fly: new FlyState(),
        }, [scene, this])    
    }   
}

class RunState extends State {
    enter(scene, player) {
        console.log("enter-RunState")
    }

    execute(scene, player){
        const { left, right, up, down, space, shift } = scene.keys
        console.log('execute-RunState')

        //UP DOWN JETPACK
        if(Phaser.Input.Keyboard.JustDown(space)){ 
            player.body.setVelocityY(-1000)
            this.stateMachine.transition('fly')
            return
        }

        //LEFT RIGHT JETPACK
        if(left.isDown){
            //add left force
            player.body.setVelocityX(-300)
        } else if(right.isDown){
            player.body.setVelocityX(300)
        }else{
            player.body.setVelocityX(-50) 
        }

    }
}

class FlyState extends State {
    enter (scene, player){
        console.log("enter-FlyState")
    }

    execute (scene, player, time, delta){
        const { left, right, up, down, space, shift } = scene.keys
        console.log('execute-FlyState')

        //UP DOWN JETPACK
        if(space.isDown){ 
            //add force to player body
            player.body.setAccelerationY(-800)
        }else{
            player.body.setAccelerationY(0)
        }

        //LEFT RIGHT JETPACK
        if(left.isDown){
            //add left force
            player.body.setAccelerationX(-300)
        } else if(right.isDown){
            player.body.setAccelerationX(300)
        }else{
        player.body.setAccelerationX(0) 
        }

        //Check if body is touching bottom of world bounds
        if(player.body.blocked.down){
            this.stateMachine.transition('run')
        }
        
    }
}