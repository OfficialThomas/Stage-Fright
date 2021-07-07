//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 1.25;
        this.maxSpeed = 1.25;
    }

    update() {
        //move enemy left
        this.x -= this.moveSpeed;
    }

    reset() {
        this.maxSpeed += 0.05;
        this.moveSpeed = Phaser.Math.Between(this.maxSpeed - 0.1, this.maxSpeed);
        this.x = game.config.width;
    }
}