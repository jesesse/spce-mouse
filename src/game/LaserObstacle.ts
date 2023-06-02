import Phaser from "phaser";
import { TexrtureKeys } from "../consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    const top = scene.add.image(0,0, TexrtureKeys.LaserEnd).setOrigin(0.5,0)
    const middle = scene.add.image(0,top.y + top.height, TexrtureKeys.LaserMiddle).setOrigin(0.5,0)
    middle.setDisplaySize(middle.width, Phaser.Math.Between(50, 200))
    const bottom = scene.add.image(0,middle.y + middle.height, TexrtureKeys.LaserEnd).setOrigin(0.5,0).setFlipY(true)
  }


}