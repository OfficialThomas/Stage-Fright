class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load any audio for the game here
        //load any art for the scene here
        this.load.image('menu', './assets/endless_runner_menu_final.png');
    }

    create(){
        //text format
        let gameText = {
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
        
        //menu art
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'menu');
        //learned .setScale from this page
        //https://stackoverflow.com/questions/56220214/how-to-correctly-resize-images-to-retain-quality-in-phaser-3
        this.background.setScale(0.235);

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*1, 'Stage Fright', gameText).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4, 'Punch (F) or Kick (J) to start', gameText).setOrigin(0.5);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyJ)){
            this.scene.start('playScene');
        }
    }
}