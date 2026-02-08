class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Set Up Player
        this.player = new Player(this, 0, 0, 'rocketMan', 0)
        //Set Up Keys
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update(time,delta){
    

        this.playerFSM.step()
    }
}