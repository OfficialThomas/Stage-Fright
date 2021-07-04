//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);           // add object to existing scene    
        this.isPunching = false;            // track punching status
        this.isKicking = false;             // track kicking status 


    }

    update () {
        //punch button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isPunching) {
            this.isPunching = true;
        }

        //kick button
        if (Phaser.Input.Keyboard.JustDown(keyJ) && !this.isKicking) {
            this.isKicking = true;
        }
    }

    //reset player animation to deafult
    reset () {
        this.isPunching = false;
        this.isKicking = false;
    }
}