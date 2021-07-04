//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 1.75;
    }

    update() {
        //move enemy left
        this.x -= this.moveSpeed;
    }

    reset() {
        this.x = game.config.width;
    }
}