//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);           // add object to existing scene    


    }

    //reset player animation to deafult
    reset () {
        this.isPunching = false;
        this.isKicking = false;
    }
}