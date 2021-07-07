class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load any art for the scene here
        //player character
        this.load.spritesheet('idle', './assets/character_running.png', { frameWidth: 80, frameHeight: 120 });
        this.load.image('kick', './assets/character_kick.png');
        this.load.image('punch', './assets/Character_Punch.png');
        this.load.image('punchF', './assets/FkeyPunch.png');
        this.load.image('kickJ', './assets/JkeyKick.png');

        //enemies
        this.load.image('red', './assets/enemy_Red.png');
        this.load.image('green', './assets/enemy_Green.png');

        //lives
        this.load.image('heart', './assets/heartfull.png');
        this.load.image('hearthalf', './assets/heartshalf.png');

        //background
        this.load.image('stage', './assets/stagefinal.png');
    }

    create(){
        //text format
        let gameText = {
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

        //music
        //reference for looping music
        //https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
        this.music = this.sound.add('music');
        this.music.setLoop(true);
        this.music.play();
        
        //play art:
        //tile sprite
        this.stage = this.add.tileSprite(0, 0, 640, 480, 'stage').setOrigin(0, 0);

        // add player
        //reference https://labs.phaser.io/edit.html?src=src/animation/animation%20repeat%20event.js&v=3.55.2
        const playerAnimation = this.anims.create({ 
            key: 'running',
            frames: this.anims.generateFrameNumbers('idle'),
            frameRate: 12
        });
        this.p1 = this.add.sprite(game.config.width/2 - borderPadding*20, game.config.height/2, 'idle');
        this.p1.play({ key: 'running', repeat: -1 });
        this.playerPunch = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'punch', 0);
        this.playerKick = new Player(this, game.config.width/2 - borderPadding*20, game.config.height/2, 'kick', 0);
        this.playerPunch.alpha = 0;
        this.playerKick.alpha = 0;

        // add punch and kick blocks
        this.top = this.add.image(game.config.width/2 - borderPadding*14, game.config.height/2 - borderPadding*4, 'punchF').setOrigin(0.5);
        this.bot = this.add.image(game.config.width/2 - borderPadding*14, game.config.height/2 + borderPadding*4, 'kickJ').setOrigin(0.5);
        this.top.alpha = 0.5;
        this.bot.alpha = 0.5;

        //enemy
        this.e1 = new Enemy(this, game.config.width, game.config.height/2 - borderPadding*4, 'green', 0, 10).setOrigin(0.5);
        this.e2 = new Enemy(this, game.config.width + borderPadding*20, game.config.height/2 + borderPadding*4, 'red', 0, 10).setOrigin(0.5);

        //values
        //ui values
        this.scoreTime = 0;
        this.pScore = 0;
        this.lives = 3;
        this.gameOver = false;
        
        //animation values
        this.timeLimit = 250;
        this.fTimer = 0;
        this.jTimer = 0;

        //play text
        //score
        this.saysScore = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*3, "Score", gameText);
        this.scorePlayer = this.add.text(borderUISize + borderPadding*4, game.config.height - borderUISize*2, this.pScore, gameText);
        
        //lives
        this.livestext = this.add.text(game.config.width - borderUISize*8, game.config.height - borderUISize*3, "Lives", gameText);
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

        //score based on time
        this.scoreTime += delta;
        if(this.scoreTime >= 1000){
            this.scoreTime = 0;
            this.pScore += 1;
            this.scorePlayer.text = this.pScore;
        }

        //enemies move
        this.e1.update();
        this.e2.update();

        //collision check between block vs enemy
        if(this.checkCollision(this.top, this.e1)){
            if(this.top.alpha > 0.5){
                this.e1.reset();
                this.pScore += this.e1.points;
                this.scorePlayer.text = this.pScore;
            }
        }
        if(this.checkCollision(this.bot, this.e2)){
            if(this.bot.alpha > 0.5){
                this.e2.reset();
                this.pScore += this.e2.points;
                this.scorePlayer.text = this.pScore;
            }
        }

        //collision check between player vs enemy
        if(this.checkCollision(this.p1, this.e1)){
            this.e1.reset();
            this.lives -= 1;
        }
        if(this.checkCollision(this.p1, this.e2)){
            this.e2.reset();
            this.lives -= 1;
        }

        //attack timers
        if(this.fTimer > 0){
            this.fTimer -= delta;
        } else {
            this.top.alpha = 0.5;
            this.playerPunch.alpha = 0;
        }
        if(this.jTimer > 0){
            this.jTimer -= delta;
        } else {
            this.bot.alpha = 0.5;
            this.playerKick.alpha = 0;
        }
        if(this.fTimer <= 0 && this.jTimer <= 0){
            this.p1.alpha = 1;
        }

        //punch attack
        if(Phaser.Input.Keyboard.JustDown(keyF) && this.fTimer <= 0){
            this.top.alpha = 1;
            this.p1.alpha = 0;
            this.playerKick.alpha = 0;
            this.playerPunch.alpha = 1;
            this.fTimer = this.timeLimit;
            this.playHit();
        }
        if(Phaser.Input.Keyboard.JustDown(keyJ) && this.jTimer <= 0){
            this.bot.alpha = 1;
            this.p1.alpha = 0;
            this.playerKick.alpha = 1;
            this.playerPunch.alpha = 0;
            this.jTimer = this.timeLimit;
            this.playHit();
        }

        //heart ui
        if(this.lives == 2){
            this.heart1.destroy();
            this.heart1 = this.add.image(game.config.width - borderUISize*5, game.config.height - borderUISize*2.3, 'hearthalf');
        } else if(this.lives == 1){
            this.heart2.destroy();
            this.heart2 = this.add.image(game.config.width - borderUISize*4, game.config.height - borderUISize*2.3, 'hearthalf');
        } else if(this.lives == 0){
            this.heart3.destroy();
            this.heart3 = this.add.image(game.config.width - borderUISize*3, game.config.height - borderUISize*2.3, 'hearthalf');
        }    

        //end game condition
        if(this.lives <= 0){
            this.gameOver = true;
        }
        //end game
        if(this.gameOver){
            this.music.stop();
            this.scene.start('overScene');
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (ship.x < rocket.x - rocket.width*0.1 && ship.x > rocket.x - rocket.width){
            return true;
        } else {
            return false;
        }
    }

    playHit(){
        switch(Math.floor(Phaser.Math.Between(0,3))){
            case 1:
                this.sound.play('drum_sfx');
                break;
            case 2:
                this.sound.play('symbol_sfx');
                break;
            default:
                this.sound.play('drum_sfx');
                break;
        }
    }
}