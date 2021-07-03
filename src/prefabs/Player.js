//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);
        this.isPunch = false;
        this.isKick = false;
        this.lives = 3;
    }

    update(){
        if(!this.isPunch || !this.isKick){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                //square for f activates
                this.isPunch = true;
            } else if(Phaser.Input.Keyboard.JustDown(KeyJ)){
                //square for j activates
                this.isKick = true;
            }
        } else {
            //reset on next available frame
            this.isPunch = false;
            this.isKick = false;
        }
    }
}