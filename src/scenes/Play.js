class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load any art for the scene here
        this.load.image('stage', './assets/stagefinal.png');
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
        
        //play art:
        //tile sprite
        this.stage = this.add.tileSprite(0, 0, 640, 480, 'stage').setOrigin(0, 0);
        //player
        this.add.rectangle(game.config.width/2 - borderPadding*20, game.config.height/2 + borderPadding*4, borderUISize*2, borderUISize*4, 0x0000FF).setOrigin(0.5);
        //square F
        this.add.rectangle(game.config.width/2 - borderPadding*13.9, game.config.height/2 + borderPadding*1.05, borderUISize*2, borderUISize*2, 0x00FF00).setOrigin(0.5);
        //square J
        this.add.rectangle(game.config.width/2 - borderPadding*13.9, game.config.height/2 + borderPadding*7, borderUISize*2, borderUISize*2, 0xFF0000).setOrigin(0.5);

        //play text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Play Scene', gameConfig).setOrigin(0.5);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    update(){
        this.stage.tilePositionX += 1.2;
        if(Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyJ)){
            this.scene.start('overScene');
        }
    }
    
}