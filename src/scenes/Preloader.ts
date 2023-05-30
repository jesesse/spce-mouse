import Phaser from 'phaser'

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
