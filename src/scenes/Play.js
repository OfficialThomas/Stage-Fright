class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load any art for the scene here
        this.load.image('player', './assets/character_idle.png');
        this.load.image('kick', './assets/character_kick.png');
        this.load.image('punch', './assets/Character_Punch.png');
        this.load.image('red', './assets/enemy_Red.png');
        this.load.image('green', './assets/enemy_Green.png');
        this.load.image('heart', './assets/heartfull.png');
        this.load.image('hearthalf', './assets/heartshalf.png');
        this.load.image('stage', './assets/stagefinal.png');
        this.load.image('punchF', './assets/FkeyPunch.png');
        this.load.image('kickJ', './assets/JkeyKick.png');
        this.load.spritesheet('idle', './assets/character_running.png', { frameWidth: 80, frameHeight: 120 });
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

        // add player
        //this.p1 = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'idle', 0).setOrigin(0.5);
        const playerAnimation = this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('idle'),
            frameRate: 16
        });

        this.p1 = this.add.sprite(game.config.width/2 - borderPadding*20, game.config.height/2, 'idle');

        this.p1.play({ key: 'running', repeat: -1 });

        // add punch and kick blocks
        this.top = this.add.image(game.config.width/2 - borderPadding*14, game.config.height/2 - borderPadding*4, 'punchF').setOrigin(0.5);
        this.bot = this.add.image(game.config.width/2 - borderPadding*14, game.config.height/2 + borderPadding*4, 'kickJ').setOrigin(0.5);
        this.top.alpha = 0;
        this.bot.alpha = 0;

        //enemy
        this.e1 = new Enemy(this, game.config.width, game.config.height/2 - borderPadding*4, 'green', 0).setOrigin(0.5);
        this.e2 = new Enemy(this, game.config.width, game.config.height/2 + borderPadding*4, 'red', 0).setOrigin(0.5);

        //values
        this.pScore = 0;
        this.timing = 0;
        this.timeVal = 500;
        this.lives = 3;
        this.gameOver = false;

        //play text
        //score
        this.saysScore = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*3, "Score", gameConfig);
        this.scorePlayer = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*2, this.pScore, gameConfig);
        
        //lives
        this.livestext = this.add.text(game.config.width - borderUISize*8, game.config.height - borderUISize*3, "Lives", gameConfig);
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
        
        //new code needs to be here
        this.e1.update();
        this.e2.update();

        //f and j blocks pressed
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.top.alpha = 1;
            this.p1.alpha = 0;
            this.playerPunch = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'punch', 0).setOrigin(0.5); // Player punch image/anim shows
            keyJ.enabled = false
            function onEvent() {                //used this for the time delay: https://phaser.io/examples/v3/view/time/timer-event
                this.top.alpha = 0;
                this.playerPunch.destroy();
                this.p1.alpha = 1;
                keyJ.enabled = true             //how to disable keys: https://phaser.discourse.group/t/temporarry-disable-key-captures-in-game/4524/3
                keyF.enabled = true

                /* Hey Thomas or Edward if you play the game there are some glitches with the f/j block going at the same 
                time sometimes and also sometimes the punch and kick animations continue to stay on the screen*/

            } 
            this.timedEvent = this.time.delayedCall(500, onEvent, [], this);
        }
        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.bot.alpha = 1;
            this.p1.alpha = 0;
            this.playerKick = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'kick', 0).setOrigin(0.5); //Player kick image/anim shows
            keyF.enabled = false
            function onEvent() {
                this.bot.alpha = 0;
                this.playerKick.destroy();
                this.p1.alpha = 1; 
                keyF.enabled = true
                keyJ.enabled = true
            } 
            this.timedEvent = this.time.delayedCall(500, onEvent, [], this);
        }



        //stop new code here unless you are making a new method

        //end game condition
        if(this.lives <= 0){
            this.gameOver = true;
        }
        //end game
        if(this.gameOver){
            this.scene.start('overScene');
        }
    }

    checkCollision(player, enemy){
        //simple AABB checking
        if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.height + player.y > enemy.y){
            return true;
        } else {
            return false;
        }
    }

    //place new methods here
    
}