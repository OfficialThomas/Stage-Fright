class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load any audio for the game here
        //load any art for the scene here
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
        
        //menu art

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4, 'Menu Scene', gameConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4, 'Press the punch key (F) or the kick key (J) to start.', gameConfig).setOrigin(0.5);

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