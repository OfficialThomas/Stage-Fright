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
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //game over art
        this.background = this.add.tileSprite(0, 0, 640, 480, 'over').setOrigin(0, 0,5);

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