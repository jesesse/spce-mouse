import Phaser from 'phaser'
import RocketMouse from '../game/RocketMouse';

export default class Game extends Phaser.Scene {


	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private player!: RocketMouse;
	private background!: Phaser.GameObjects.TileSprite;
	private mousehole!: Phaser.GameObjects.Image;
	private windows: Phaser.GameObjects.Image[] = [];
	private bookcases: Phaser.GameObjects.Image[] = [];

	constructor() {
		super('game')
	}

	private wrapMosehole() {
		if (this.mousehole.x < this.cameras.main.scrollX - this.mousehole.width) {
			const newX = Phaser.Math.Between(this.player.x + 300, this.player.x + 6000);
			if (!this.isOverlapping(newX)) this.mousehole.x = newX;
			else return;
		}
	}

	private wrapWindows() {
		for (let i = 0; i < this.windows.length; i++) {
			if (this.windows[i].x < this.cameras.main.scrollX - this.windows[i].width) {
				const newX = Phaser.Math.Between(this.player.x + 300, this.player.x + 6000);
				if (!this.isOverlapping(newX)) {
					this.windows[i].x = newX;
				} else continue;
			}
		}
	}

	private wrapBookcases() {
		for (let i = 0; i < this.bookcases.length; i++) {
			if (this.bookcases[i].x < this.cameras.main.scrollX - this.bookcases[i].width) {
				const newX = Phaser.Math.Between(this.player.x + 300, this.player.x + 6000);
				if (!this.isOverlapping(newX)) {
					this.bookcases[i].x = newX;
				} else continue;
			}
		}
	}

	private isOverlapping(x: number) {
		for (let i = 0; i < this.windows.length; i++) {
			if (x < this.windows[i].x + this.windows[i].width) return true;
		}

		for (let i = 0; i < this.bookcases.length; i++) {
			if (x < this.bookcases[i].x + this.bookcases[i].width) return true;
		}

		if (x < this.mousehole.x + this.mousehole.width) return true;

		return false;
	}



	create() {
		const width = this.scale.width;
		const height = this.scale.height;

		this.background = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0).setScrollFactor(0, 0);
		this.mousehole = this.add.image(width + 50, height - 135, 'mousehole')
		this.windows.push(this.add.image(width + 200, height - 400, 'window1'));
		this.windows.push(this.add.image(width + 500, height - 400, 'window2'));
		this.bookcases.push(this.add.image(width + 800, height - 260, 'bookcase1'));
		this.bookcases.push(this.add.image(width + 1200, height - 350, 'bookcase2'));

		this.cursors = this.input.keyboard.createCursorKeys()

		this.player = new RocketMouse(this, width / 2, height - 30);
		this.add.existing(this.player);
		const body = this.player.body as Phaser.Physics.Arcade.Body
		body.setCollideWorldBounds(true)
		body.setVelocityX(200)

		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
	}

	update(time: number, delta: number): void {
		this.background.setTilePosition(this.cameras.main.scrollX)
		this.wrapMosehole();
		this.wrapWindows();
		this.wrapBookcases();

		if (this.cursors.space?.isDown) {
			this.player.enableJetpack(true);
		} else {
			this.player.enableJetpack(false);
		}
	}
}
