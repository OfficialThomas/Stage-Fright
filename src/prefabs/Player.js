//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lives){
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);
        this.lives = lives;
    }
}