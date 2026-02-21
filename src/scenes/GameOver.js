class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }


    create(data){
        //Deal with saving highscore locally
        if(localStorage.getItem('highScore') === null || data.score > localStorage.getItem('highScore')){
        localStorage.setItem('highScore', data.score);
        }

        console.log(data.score)
        this.sound.play('playerDeath')
        this.sound.play('menuSong', {
            volume: 0.2
        })
        this.flagAnimationOverlay = this.add.sprite(-80, -80, 'flag').setOrigin(1,1).setScale(8).setAlpha(0.2).setRotation(-Math.PI)
        this.flagAnimationOverlay.play('flagAnim')
        this.bodyPile = this.add.image(0, 768, 'bodyPile').setOrigin(0,0)
        this.endingText = this.add.image(0,0, 'endText').setOrigin(0,0).setAlpha(0)
        this.michaelCredit = this.add.image(this.game.config.width - 441, 400, 'mCredit').setOrigin(0,0).setAlpha(0)
        this.robertCredit = this.add.image(0, 400, 'rCredit').setOrigin(0,0).setAlpha(0)
        this.endingScoreText = this.add.text(this.game.config.width/2, 200, "Score: " + data.score + " seconds", {fontSize: '32px', fill: '#fff'}).setOrigin(0.5).setAlpha(0)
        this.highScoreText = this.add.text(this.game.config.width/2, 250, "Highscore: " + localStorage.getItem('highScore') + " seconds", {fontSize: '32px', fill: '#fff'}).setOrigin(0.5).setAlpha(0)
        this.sound.play('bodyRise', {
            volume: 1.2
        })
        //Makes it tween up from the bottom of the screen and shake will rising
        this.tweens.add({
            targets: this.bodyPile,
            y: 20,
            x:0,
            duration: 6000,
            ease: 'Power1',
            onUpdate: () => {
                this.bodyPile.setY(this.bodyPile.y + Phaser.Math.Between(-10, 10)) // Add random shake effect
                this.bodyPile.setX(this.bodyPile.x + Phaser.Math.Between(-10, 10))
            }
        })

         this.tweens.add({
            targets: [this.endingText, this.endingScoreText, this.highScoreText, this.michaelCredit, this.robertCredit],
            alpha: 1,
            duration: 2000,
            delay: 4000
        })
        //this.add.text(this.game.config.width/2, this.game.config.height/2, "Game Over", {fontSize: '64px', fill: '#fff'}).setOrigin(0.5)
        //this.add.text(this.game.config.width/2, this.game.config.height/2 + 100, "Press the space bar to return to the menu", {fontSize: '24px', fill: '#fff'}).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.createCursorKeys().space)){
            this.sound.stopAll()
            this.scene.start("playScene")
        }
    }
}