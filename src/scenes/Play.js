class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
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
        
        //play art

        //play text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Play Scene', gameConfig).setOrigin(0.5);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyJ)){
            this.scene.start('overScene');
        }
    }
    
}