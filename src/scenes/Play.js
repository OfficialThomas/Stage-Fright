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
        this.p1 = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'player', 0, 3).setOrigin(0.5);
        this.p1.setScale(5);
        //this.add.rectangle(game.config.width/2 - borderPadding*20, game.config.height/2, borderUISize*2, borderUISize*4, 0x0000FF).setOrigin(0.5);
        //square F
        
        //square J
        

        //values
        let time = 5000;
        this.pScore = 0;
        this.timing = 0;
        this.gameOver = false;

        //play text
        //score
        this.saysScore = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*3, "Score", gameConfig);
        this.scorePlayer = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*2, this.pScore, gameConfig);
        //lives
        this.lives = this.add.text(game.config.width - borderUISize*8, game.config.height - borderUISize*2, "Lives", gameConfig);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    update(time, delta){
        //scrolling
        this.stage.tilePositionX += 1.5;

        //update attack
        this.timing -= delta;
        if(this.timing < 0){
            this.timing = 0;
        }
        
        if(this.timing <= 0){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.timing = time;
                console.log("punch");
                this.top = this.add.rectangle(game.config.width/2 - borderPadding*13.9, game.config.height/2 - borderPadding*3, borderUISize*2, borderUISize*2, 0x00FF00).setOrigin(0.5);
            } else if(Phaser.Input.Keyboard.JustDown(keyJ)){
                this.timing = time;
                console.log("kick");
                this.bottom = this.add.rectangle(game.config.width/2 - borderPadding*13.9, game.config.height/2 + borderPadding*3, borderUISize*2, borderUISize*2, 0xFF0000).setOrigin(0.5);
            }
        }
        
    }
    
}