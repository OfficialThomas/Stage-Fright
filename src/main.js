let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    //reference for arcade physics
    //https://github.com/nathanaltice/MovementStudies/blob/master/src/main.js
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyJ

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;