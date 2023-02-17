import Phaser from 'phaser'

export default class WinScene extends Phaser.Scene
{
	constructor(){
		super('win-scene');
	}
	
	init(){
		this.bg = undefined;
		this.restart = undefined;

		this.wow = undefined;
	}

	preload(){
        this.load.image(`bg`, `images/background.png`);
		this.load.image(`win`, `images/win.png`);
		this.load.image(`restart`, `images/restart.png`);
		this.load.image(`wow`, `images/wow.png`);
    }

    create(){
		// background
        this.bg = this.add.image(256, 250, `bg`);
		this.bg.flipY = true;
		// 

		this.add.image(256, 260, `win`).setScale(0.5);
		this.wow = this.add.image(256, 60, `wow`).setScale(0.15);
		this.restart = this.add.image(256, 430, `restart`).setScale(0.7).setInteractive();

		this.restart.once(`pointerup`, () => {
			this.scene.start(`ghost-buster-scene`);
		}, this);
    }

	update(){
		
	}
}
