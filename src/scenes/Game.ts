import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

	private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	private background!: Phaser.GameObjects.TileSprite;
	private mousehole!: Phaser.GameObjects.Image;
	private window1!: Phaser.GameObjects.Image;
	private window2!: Phaser.GameObjects.Image;
	private bookcase1!: Phaser.GameObjects.Image;
	private bookcase2!: Phaser.GameObjects.Image;

	constructor() {
		super('game')
	}

	private wrapMosehole(){
		if (this.mousehole.x < this.cameras.main.scrollX - this.mousehole.width) {
			this.mousehole.x = Phaser.Math.Between(this.player.x + 1000, this.player.x + 5000)
		}
	}

	private wrapWindows(){
		if (this.window1.x < this.cameras.main.scrollX - this.window1.width) {
			this.window1.x = Phaser.Math.Between(this.window2.x + this.scale.width, this.window2.x + 3000)
		}

		if (this.window2.x < this.cameras.main.scrollX - this.window2.width) {
			this.window2.x = Phaser.Math.Between(this.window1.x + 1000, this.window1.x + 4000)
		}
	}

	private wrapBookcases(){
		if (this.bookcase1.x < this.cameras.main.scrollX - this.bookcase1.width) {
			this.bookcase1.x = Phaser.Math.Between(this.cameras.main.scrollX + this.scale.width, this.player.x + 4000)
		}

		if (this.bookcase2.x < this.cameras.main.scrollX - this.bookcase2.width) {
			this.bookcase2.x = Phaser.Math.Between(this.bookcase1.x + 2000, this.bookcase1.x + 4000)
		}
	}


	create() {
		const width = this.scale.width;
		const height = this.scale.height;

		this.background = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0).setScrollFactor(0, 0);
		this.mousehole = this.add.image(width + 50, height - 135, 'mousehole')
		this.window1 = this.add.image(width / 2, height - 400, 'window1');
		this.window2 = this.add.image(width + 1000, height - 400, 'window2');
		this.bookcase1 = this.add.image(this.window1.x + 500, height - 260, 'bookcase1');
		this.bookcase2 = this.add.image(this.bookcase1.x + 500, height - 350, 'bookcase2');


		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

		this.player = this.physics.add.sprite(width / 2, height - 30, 'rocket-mouse', 'rocketmouse_fly01.png').setOrigin(0.5, 1)
		this.player.body.setCollideWorldBounds(true);

		this.player.setVelocityX(200);
		this.player.anims.play('rocketmouse_run');

		this.cameras.main.startFollow(this.player);
		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
	}

	update(time: number, delta: number): void {
		this.background.setTilePosition(this.cameras.main.scrollX)
		this.wrapMosehole();
		this.wrapWindows();
		this.wrapBookcases();
	}
}
