import Phaser from 'phaser'
import GameOverScene from './scenes/GameOverScene'

import GhostBusterScene from './scenes/GhostBusterScene'
import WinScene from './scenes/WinScene'

const config = {
	type: Phaser.AUTO,
	width: 512,
	height: 500,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [GhostBusterScene, GameOverScene, WinScene]
}

export default new Phaser.Game(config)
