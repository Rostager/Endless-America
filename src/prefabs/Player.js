class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    
        //State Machine Setup
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            run: new RunState(),
        } [scene, this])    
    }   
}

class IdleState extends State {
    enter(scene, player) {

    }

    exit (scene, player){
        
    }
}

class RunState extends State {
    enter (scene, player){

    }

    exit (scene, player){

    }
}