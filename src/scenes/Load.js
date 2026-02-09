class Load extends Phaser.Scene{
    constructor() {
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('rocketMan','RocketMan.png')
    }

    create(){




        console.log("create done")
        this.scene.start("menuScene")
    }


}