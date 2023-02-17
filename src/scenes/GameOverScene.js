import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene
{
	constructor(){
		super('game-over-scene');
	}
	
	init(){
		this.bg = undefined;
		this.restart = undefined;

		this.heheboi = undefined;
	}

	preload(){
        this.load.image(`bg`, `images/background.png`);
		this.load.image(`gameover`, `images/GameOver.png`);
		this.load.image(`restart`, `images/restart.png`);
		this.load.image(`heheboi`, `images/heheBoi.png`);
    }

    create(){
		// background
        this.bg = this.add.image(256, 250, `bg`);
		this.bg.flipY = true;
		// 

		this.add.image(256, 240, `gameover`).setScale(0.5);
		this.heheboi = this.add.image(256, 85, `heheboi`).setScale(0.3);
		this.restart = this.add.image(256, 385, `restart`).setScale(0.7).setInteractive();

		this.restart.once(`pointerup`, () => {
			this.scene.start(`ghost-buster-scene`);
		}, this);
    }

	update(){
		
	}
}
