
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "Game1",
    "width": 720,
    "height": 1280,
    "type": Phaser.AUTO,
    "backgroundColor": "#8C77E2",
    "parent": "game-container",
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
	// audio: {
 //        disableWebAudio: true
 //    },
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
		this.load.audio("clickSound", "assets/sounds/Click.mp3");
	}

	create() {
		this.scene.start("Scene1");
	}

}
