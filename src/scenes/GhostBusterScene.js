import Phaser from 'phaser'
// @ts-ignore
import Bomb from '../game/Bomb';
// @ts-ignore
import Ghost from '../game/Ghost';

export default class GhostBusterScene extends Phaser.Scene
{
	constructor(){
		super('ghost-buster-scene');
	}
	
	init(){
		// platform
		this.platform = undefined;

		// player
		this.player = undefined;
		this.speed = 120;

		// input
		this.cursors = undefined;

		// bomb
		this.bomb = undefined;
		this.lastFired = 0;

		// ghost
		this.ghost = undefined;
		this.ghostSpeed = 100;

		// score
		this.scoreText = undefined;
		this.score = 0;
	}
	
	preload(){
		this.load.image(`bg`, `images/background.png`);
		this.load.image(`bomb`, `images/bomb.png`);
		this.load.image(`ghost`, `images/ghost.png`);
		this.load.image(`ground`, `images/ground.png`);
		this.load.spritesheet(`player`, `images/player.png`, {
			frameWidth: 32,
			frameHeight: 32,
		});
    }
	
    create(){
		// input
		this.cursors = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});

		// images
        this.add.image(256, 250, `bg`);
		
		this.platform = this.physics.add.staticGroup();
		this.player = this.physics.add.group();
		
		// player
		this.player = this.playerAnimation();
		
		// platforms
		this.platform = this.platform.create(256, 495, `ground`).setScale(1.3);
		
		// player-platform collider
		this.physics.add.collider(this.player, this.platform);

		// ghost
		this.ghost = this.physics.add.group({
			classType: Ghost,
			maxSize: 10,
			runChildUpdate: true
		});
		
		this.time.addEvent({
			delay: Phaser.Math.Between(2000, 3000),
			callback: this.spawnGhost,
			callbackScope: this,
			loop: true
		});

		// bomb
		this.bomb = this.physics.add.group({
			classType: Bomb,
			maxSize: 3,
			runChildUpdate: true
		});

		// player-ghost overlap
		this.physics.add.overlap(this.player, this.ghost, this.defeat, null, this);

		// ghost-bomb overlap
		this.physics.add.overlap(this.bomb, this.ghost, this.hitGhost, null, this);

		// score text
		this.scoreText = this.add.text(20, 20, `Score: 0`, {
			fontSize: `25px`,
		});
    }
	
	update(time){
		// bomb
		// @ts-ignore
		if(this.cursors.space.isDown && time > this.lastFired){
			const bomb = this.bomb.get(0, 0, `bomb`);

			if(bomb){
				// @ts-ignore
				bomb.fire(this.player.x, this.player.y);
				this.lastFired = time + 150;
			}
		}

		// player movement
		this.playerMovement();

		// level up
		if(this.score >= 10){
			this.ghostSpeed = 200;
		}

		if(this.score >= 20){
			this.ghostSpeed = 300;
		}

		if(this.score >= 30){
			this.scene.start(`win-scene`);
		}
	}

	spawnGhost(){
		// @ts-ignore
		// @ts-ignore
		const config = {
			speed: this.ghostSpeed,
			rotation: 0
		};

		// @ts-ignore
		const ghost = this.ghost.get(0, 0, `ghost`, config);
		const ghostWidth = ghost.displayWidth;
		const positionX = Phaser.Math.Between(ghostWidth, this.scale.width - ghostWidth);

		if(ghost){
			ghost.spawn(positionX);
		}
	}
	
	
	playerAnimation(){
		const player = this.physics.add.sprite(256, 270, `player`);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: `stand`,
			frames: this.anims.generateFrameNumbers(`player`, {
				start: 0,
				end: 2
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: `left`,
			frames: this.anims.generateFrameNumbers(`player`, {
				start: 3,
				end: 5
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: `right`,
			frames: this.anims.generateFrameNumbers(`player`, {
				start: 6,
				end: 8
			}),
			frameRate: 10,
			repeat: -1
		});

		return player;
	}

	playerMovement(){
		// @ts-ignore
		if(this.cursors.left.isDown){
			this.player.setVelocityX(this.speed * -1);
			// @ts-ignore
			this.player.anims.play(`left`, true);
		}
	
		// @ts-ignore
		else if(this.cursors.right.isDown){
			this.player.setVelocityX(this.speed);
			// @ts-ignore
			this.player.anims.play(`right`, true);
		}
	
		else{
			this.player.setVelocityX(0);
			// @ts-ignore
			this.player.anims.play(`stand`, true);
		}
	}

	defeat(){
		this.scene.start(`game-over-scene`);
	}

	hitGhost(ghost, bomb){
		ghost.destroy();
		bomb.destroy();
		this.score += 1;
		this.scoreText.setText(`Score: ${this.score}`);
	}
}
