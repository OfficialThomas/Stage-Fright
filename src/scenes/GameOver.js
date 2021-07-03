class GameOver extends Phaser.Scene {
    constructor(){
        super("overScene");
    }

    preload(){
        //load any art for the scene here
        this.load.image('over', './assets/game_over_endless_runner.png');
    }

    create(){
        //text format
        let gameConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            color: '#000000',
            backgroundColor: '#F3B141',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //game over art
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'over');
        //learned .setScale from this page
        //https://stackoverflow.com/questions/56220214/how-to-correctly-resize-images-to-retain-quality-in-phaser-3
        this.background.setScale(0.235);

        //game over text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4, 'Game Over', gameConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4, 'Punch (F) to return to the main menu', gameConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5, 'Kick (J) to play again', gameConfig).setOrigin(0.5);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.start('menuScene');
        } else if(Phaser.Input.Keyboard.JustDown(keyJ)){
            this.scene.start('playScene');
        }
    }
}