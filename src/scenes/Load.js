class Load extends Phaser.Scene{
    constructor() {
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('backCityTile', 'Background2.png')
        this.load.image('frontCityTile', 'Background.png')
        this.load.image('rocketMan','RocketMan.png')
        this.load.image('roadTile', 'TilingGroundV1.png')
        this.gunSheet = this.load.spritesheet('gunShot', 'pistolV2.png', {frameWidth: 512, frameHeight: 288})
        this.flagSheet = this.load.spritesheet('flag', 'WavingFlagSpriteSheet.png', {frameWidth: 220, frameHeight: 137})
        this.pistonSheet = this.load.spritesheet('piston', 'pistonSpriteSheet.png', {frameWidth: 300, frameHeight: 768})
       // this.monsterAmerica = this.load.spritesheet('monsterAmerica', 'MonsterAmericaSpriteSheet.png', {frameWidth: 1200, frameHeight: 1200})
        
    }

    create(){

        this.anims.create({
            key: 'gunShotAnim',
            frames: this.anims.generateFrameNumbers('gunShot', {start: 0, end: 55}),
            frameRate: 30,
            repeat: 0
        })

        this.anims.create({
            key: 'flagAnim',
            frames: this.anims.generateFrameNumbers('flag', {start: 0, end: 19}),
            frameRate: 30,
            repeat: -1
        })

        this.anims.create({
            key: 'pistonAnim',
            frames: this.anims.generateFrameNumbers('piston', {start: 0, end: 46}),
            frameRate: 30,
            repeat: 0
        })

        /*
        this.anims.create({
            key: 'monsterAmericaAnim',
            frames: this.anims.generateFrameNumbers('monsterAmerica', {start: 0, end: 60}),
            frameRate: 30,  
            repeat: -1
        })
*/

        console.log("create done")
        this.scene.start("menuScene")
    }


}