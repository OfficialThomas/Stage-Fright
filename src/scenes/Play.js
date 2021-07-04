class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load any art for the scene here
        this.load.image('player', './assets/character_idle.png');
        this.load.image('kick', './assets/character_kick.png');
        this.load.image('punch', './assets/Character_Punch.png');
        this.load.image('heart', './assets/heartfull.png');
        this.load.image('hearthalf', './assets/heartshalf.png');
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
        this.p1 = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'player', 0).setOrigin(0.5);
        this.p1.setScale(5);
        this.e1 = new Enemy(this, game.config.width, game.config.height/2 - borderPadding*4, 'hearthalf', 0).setOrigin(0,0);
        this.e2 = new Enemy(this, game.config.width, game.config.height/2 - borderPadding*4, 'hearthalf', 0).setOrigin(0,0);
        this.e3 = new Enemy(this, game.config.width, game.config.height/2 + borderPadding*4, 'hearthalf', 0).setOrigin(0,0);
        this.e4 = new Enemy(this, game.config.width, game.config.height/2 + borderPadding*4, 'hearthalf', 0).setOrigin(0,0);
        
        //values
        this.timeVal = 500;
        this.pScore = 0;
        this.timing = 0;
        this.gameOver = false;

        //play text
        //score
        this.saysScore = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*3, "Score", gameConfig);
        this.scorePlayer = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*2, this.pScore, gameConfig);
        //lives
        this.lives = this.add.text(game.config.width - borderUISize*8, game.config.height - borderUISize*3, "Lives", gameConfig);
        this.heart1 = this.add.image(game.config.width - borderUISize*5, game.config.height - borderUISize*2.3, 'heart');
        this.heart2 = this.add.image(game.config.width - borderUISize*4, game.config.height - borderUISize*2.3, 'heart');
        this.heart3 = this.add.image(game.config.width - borderUISize*3, game.config.height - borderUISize*2.3, 'heart');
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    update(time, delta){
        //scrolling
        this.stage.tilePositionX += 1.5;
        
        this.e1.update();

        //end game
        if(this.gameOver){
            this.scene.start('overScene');
        }
    }
    
}