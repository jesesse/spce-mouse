import Phaser from 'phaser'
import { TexrtureKeys } from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }
  preload() {
    this.load.image('background', 'assets/images/house/bg_repeat_340x640.png');
    this.load.image('mousehole', 'assets/images/house/object_mousehole.png')
    this.load.image('window1', 'assets/images/house/object_window1.png')
    this.load.image('window2', 'assets/images/house/object_window2.png')
    this.load.image('bookcase1', 'assets/images/house/object_bookcase1.png')
    this.load.image('bookcase2', 'assets/images/house/object_bookcase2.png')
    this.load.image(TexrtureKeys.LaserEnd, 'house/object_laser_end.png')
    this.load.image(TexrtureKeys.LaserMiddle, 'house/object_laser.png')
    this.load.atlas('rocket-mouse', 'assets/images/characters/rocket-mouse.png', 'assets/images/characters/rocket-mouse.json');
  }

  create() {
    this.anims.create({
      key: 'rocketmouse_run',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'rocketmouse_fly',
      frames: [{
        key: 'rocket-mouse',
        frame: 'rocketmouse_fly01.png'
      }]
    })

    this.anims.create({
      key: 'rocketmouse_fall',
      frames: [{
        key: 'rocket-mouse',
        frame: 'rocketmouse_fall01.png'
      }]
    })

    this.anims.create({
      key: 'rocketmouse_flames',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'rocketmouse_flames',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'rocketmouse_die',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: 1
    })


    this.scene.start('game')
  }
}
