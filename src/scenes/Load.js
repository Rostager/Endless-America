class Load extends Phaser.Scene{
    constructor() {
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('rocketMan','RocketMan.png')
        this.load.image('roadTile', 'TilingGroundV1.png')
        this.gunSheet = this.load.spritesheet('gunShot', 'GunTestSpriteSheet.png', {frameWidth: 256, frameHeight: 256})
        this.monsterAmerica = this.load.spritesheet('monsterAmerica', 'MonsterAmericaSpriteSheet.png', {frameWidth: 1200, frameHeight: 1200})
        
    }

    create(){

        this.anims.create({
            key: 'gunShotAnim',
            frames: this.anims.generateFrameNumbers('gunShot', {start: 0, end: 45}),
            frameRate: 25,
            repeat: 0
        })


        console.log("create done")
        this.scene.start("menuScene")
    }


}