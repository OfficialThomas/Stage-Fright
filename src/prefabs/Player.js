//Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);
        this.isAttacking = false;
        this.lives = 3;
        //load any sound effects
    }

    update(){
        if(!this.isAttacking){
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                //square for f activates
                this.isAttacking = true;
            } else if(Phaser.Input.Keyboard.JustDown(KeyJ)){
                //square for j activates
                this.isAttacking = true;
            }
        } else {
            //reset on next available frame
            this.isAttacking = false;
        }
    }
}