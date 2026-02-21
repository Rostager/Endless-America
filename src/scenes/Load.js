class Load extends Phaser.Scene{
    constructor() {
        super('loadScene')
    }

    preload(){
        //Images
        this.load.path = './assets/'
        this.load.image('backCityTile', 'Background2.png')
        this.load.image('frontCityTile', 'Background.png')
        this.load.image('rocketMan','RocketMan.png')
        this.load.image('roadTile', 'TilingGroundV1.png')
        this.load.image('menuBackground', 'mainMenuSplashArt.png')
        this.load.image('bodyPile', 'BodyPile.png')
        this.load.image('endText', 'EndingText.png')
        this.load.image('mCredit', 'MichaelCredit.png')
        this.load.image('rCredit', 'RobertCredit.png')
        this.load.image('timer', 'Timer.png')
       
        //Spritesheets
        this.load.spritesheet('gunShot', 'pistolV2.png', {frameWidth: 512, frameHeight: 288})
        this.load.spritesheet('flag', 'WavingFlagSpriteSheet.png', {frameWidth: 220, frameHeight: 137})
        this.load.spritesheet('piston', 'pistonSpriteSheet.png', {frameWidth: 300, frameHeight: 768})
        this.load.spritesheet('monsterAmerica', 'MonsterAmericaSpriteSheet2.png', {frameWidth: 350, frameHeight: 350})
        this.load.spritesheet('playerRun', 'RunSprite.png', {frameWidth: 256, frameHeight: 300})
        this.load.spritesheet('jump', 'Jump.png', {frameWidth: 256, frameHeight: 300})
        this.load.spritesheet('slam', 'Slam.png', {frameWidth: 256, frameHeight: 300})
        //Audio
        this.load.audio('pistolSound', 'pistolShotSound.wav')
        this.load.audio('pistonSound', 'pistonSound.mp3')
        this.load.audio('whoosh', 'whoosh.wav')
        this.load.audio('playerDeath', 'Death.wav')
        this.load.audio('menuSong', 'MenuMusic.wav')
        this.load.audio('bodyRise', 'BodyRise.mp3')
        //Music by the amazingMichael Stager!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        this.load.audio('introTrack', 'EndlessAmericaPlayIntro.wav')
        this.load.audio('loopTrack', 'EndlessAmericaPlayLoop.wav')
      
        
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

        this.anims.create({
            key: 'monsterAmericaAnim',
            frames: this.anims.generateFrameNumbers('monsterAmerica', {start: 0, end: 59}),
            frameRate: 30,  
            repeat: -1
        })

        this.anims.create({
            key: 'playerRunAnim',
            frames: this.anims.generateFrameNumbers('playerRun', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'playerJumpAnim',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'playerSlamAnim',
            frames: this.anims.generateFrameNumbers('slam', {start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        })

        console.log("create done")
        this.scene.start("menuScene")
    }


}