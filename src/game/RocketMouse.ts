import Phaser from "phaser";

export default class RocketMouse extends Phaser.GameObjects.Container {

  mouse: Phaser.GameObjects.Sprite;
  flames: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene, x: number, y: number) {

    super(scene, x, y)

    this.mouse = scene.add.sprite(0, 0, 'rocket-mouse', 'rocketmouse_fly01.png');
    this.mouse.setOrigin(0.5, 1);
 

    this.flames = scene.add.sprite(0, 0, 'rocket-mouse');
    this.flames.setOrigin(1.9, 0.7);
    this.flames.anims.play('rocketmouse_flames');
    this.flames.setVisible(false);

    this.add(this.flames)
    this.add(this.mouse);

    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height);
  }

  enableJetpack(isEnabled: boolean): void {
    const body = this.body as Phaser.Physics.Arcade.Body

    if (isEnabled) {
      this.flames.setVisible(true);
			body.setAccelerationY(-600);
			this.mouse.play('rocketmouse_fly', true)
		} else {
      this.flames.setVisible(false);
			body.setAccelerationY(0)
		}
		if(body.velocity.y > 0 && !isEnabled) {
      this.mouse.anims.play('rocketmouse_fall', true)
    }
		if (body.blocked.down){
      this.mouse.anims.play('rocketmouse_run', true);
    }

  
 
  }

}