//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, height, width, texture, frame){
        super(scene, x, y, height, width, texture, frame);

        //add object to scene
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 1.75;
    }

    update(){
        //move the enemy towards the player
        this.x -= this.moveSpeed;
    }
}