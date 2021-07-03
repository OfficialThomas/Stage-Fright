class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load any audio for the game here
        //load any art for the scene here
    }

    create(){
        //display menu
        let menuConfig = {
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
        
        //Menu Art

        //Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Menu Scene', menuConfig).setOrigin(0.5);

    }
}