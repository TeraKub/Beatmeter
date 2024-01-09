
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super('Scene1');
		
	}
	
	_create() {		
        this.clickSound = this.sound.add('clickSound');
		this.bpm = 80;

		// Инициализация переменных
		this.setCount = 0;
		
		// createNotes()
		this.posX = 137;
		this.posY = 150;
		this.offsetBeat = 75;
		this.offsetPic = 154.6;
		this.offsetY = 200;
		
		// createNotePoints()
		this.offsetPointX = -67;
		this.offsetPointY = 29;
		this.offset16thNote = 38.7;
		
        //this.line;
        //this.pointsGroup;
        //this.score = 0;
        this.scoreText;

        // Создание группы для точек
        //this.pointsGroup = this.physics.add.group();

        // Текст для отображения счета
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // Кнопка "Тап"
        this.input.on('pointerdown', () => this.placePoint());
        
        this.isGameActive = false;

		this.blackDotStartX = this.posX + this.offsetPointX - 23;
		this.blackDotFinishX = this.posX + this.offsetPointX + this.offsetPic * 4 - 23;
		this.blacDotAndClickPointY = 700;
		this.blackDot = this.add.circle(this.blackDotStartX, this.blacDotAndClickPointY, 10, this.backColor);
		this.physics.add.existing(this.blackDot);
		
		this.startMenu();
	}
	
	/* START-USER-CODE */

	create() {
		this.backColor = '0x8C77E20';
		this._create();
	}

	update() {
		this.click();
	}
	
	startMenu() {
		this.beatNum = 0;
		const offsetX = 200;
		const offsetY = 100;
		const levelButton1 = this.add.text(this.game.config.width / 2 - offsetX, 100 + offsetY, '1-10', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 2;
				this.bpm = 100;
				this.level = 1;
				this.start()
			});
		this.scoreLevel1 = this.add.text(this.game.config.width / 2 - offsetX, 130 + offsetY, '0', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton2 = this.add.text(this.game.config.width / 2, 100 + offsetY, '11-20', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 3;
				this.bpm = 90;
				this.level = 11;
				this.start()
			});
		this.scoreLevel2 = this.add.text(this.game.config.width / 2, 130 + offsetY, '0', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton3 = this.add.text(this.game.config.width / 2 + offsetX, 100 + offsetY , '21-30', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 4;
				this.bpm = 80;
				this.level = 21;
				this.start()
			});
		this.scoreLevel3 = this.add.text(this.game.config.width / 2 + offsetX, 130 + offsetY, '0', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);
		
		this.levelButtons = [levelButton1, levelButton2, levelButton3];
		this.scoreLevels = [this.scoreLevel1, this.scoreLevel2, this.scoreLevel3];
	}
	
	start() {
		for (var btn of this.levelButtons) {
			btn.destroy();
		}
		
		for (var lvl of this.scoreLevels) {
			lvl.visible = false;
		}
		
		this.scoreText.visible = false;
		this.levelText = this.add.text(this.game.config.width / 2, 16, 'Уровень: ' + this.level, 
			{ fontSize: '32px', fill: '#fff' })
			.setOrigin(0.5);
			
		this.startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 
			'СТАРТ', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.startGame()
			});
		this.score = 1;
		this.correctScore = 1;
		this.createNotes();
		this.createClickPoint();
	}
	
	startGame() {
        this.startButton.destroy();

		this.clickLamp = this.add.circle(
			this.game.config.width / 2, 
			this.game.config.height / 2 - 90, 
			100, 
			0x666600
			);

		if (this.setCount == 2) {
        	this.isGameActive = true;
		}
		
		
        // Запускаем движение this.blackDot
        this.tweens.add({
            targets: this.blackDot,
            x: this.blackDotFinishX,
            duration: 60 / this.bpm * 4000,
            onComplete: () => {
				this.setCount++;
				if (this.setCount < 4) {
	                this.createClickPoint();
					this.blackDot.setX(this.blackDotStartX);
					this.startGame();
				} else {
					this.endGame();
				}
            }
        });
    }

	createNotes() {
		this.numNotes = ['0000', '1000', '1010', '0010'];
		this.randomNotes = [];
		this.beats = [];

		for (var i = 0; i < 4; i++) {
			const beat = this.add.text(this.posX - this.offsetBeat + this.offsetPic * i, this.posY - 75, i + 1, { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
			this.beats.push(beat);
			this.add.image(this.posX + this.offsetPic * i, this.posY, 'textures', this.getRandomElement(this.numNotes)).setScale(0.5, 0.5);
		}
		
		for (var i = 0; i < 4; i++) {
			const beat = this.add.text(this.posX - this.offsetBeat + this.offsetPic * i, this.posY - 75 + this.offsetY, i + 1, { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
			this.beats.push(beat);
			this.add.image(this.posX + this.offsetPic * i, this.posY + this.offsetY, 'textures', this.getRandomElement(this.numNotes)).setScale(0.5, 0.5);
		}
		
		this.createNotePoints();
	}
	
	getRandomElement(arr) {
		const note = arr[Math.floor(Math.random() * this.complexityOfLevelNotes)];
		this.randomNotes.push(note);
	    return note;
	}
	
	createNotePoints() {
		this.notePoints = [];
		var markerOfPoints1 = '';
		
		for (var i = 0; i < 4; i++) {
			markerOfPoints1 += this.randomNotes[i];
		}
		
		var markerOfPoints2 = '';
		for (var j = 4; j < 8; j++) {
			markerOfPoints2 += this.randomNotes[j];
		}
		
		for (var i = 0; i < 16; i++) {
			if (markerOfPoints1[i] == 1) {
				const notePoint = this.add.circle(this.posX + this.offsetPointX + this.offset16thNote * i,
					this.posY + this.offsetPointY, 9, 0x000);
				this.physics.add.existing(notePoint);
				this.notePoints.push(notePoint);
			}
		}
		
		for (var i = 0; i < 16; i++) {
			if (markerOfPoints2[i] == 1) {
				const notePoint = this.add.circle(this.posX + this.offsetPointX + this.offset16thNote * i,
					this.posY + this.offsetPointY + this.offsetY, 9, 0x000);
				this.physics.add.existing(notePoint);
				this.notePoints.push(notePoint);
			}
		}		
	}
	
	createClickPoint() {
		this.clickPoints = [];
		
		for (var i = 0; i < 4; i++) {
			if (this.setCount == 0 && i % 2 != 0) {
				continue;
			}
			
			const clickPoint = this.add.circle(
				this.posX + this.offsetPointX + this.offsetPic * i + 12, 
				this.blacDotAndClickPointY, 10, this.backColor
			);
			this.physics.add.existing(clickPoint);
			this.clickPoints.push(clickPoint)
		}
	}
	
	click() {
		if (this.blackDot.x > this.blackDotStartX && this.blackDotFinishX) {
			for (const clickPoint of this.clickPoints) {
				if (this.physics.overlap(clickPoint, this.blackDot)) {
					clickPoint.destroy();
					this.clickSound.play();
					this.clickLampOn();
					
					if (this.setCount > 1) {
						this.beats[this.beatNum].setColor('#CC0000');
						if (this.beatNum != 0) {
							this.beats[this.beatNum - 1].setColor('#fff');
						}
						this.beatNum++;
					}
				}
			}
		}
	}
	
	clickLampOn() {
		this.clickLamp.setFillStyle(0xFFFF00);
		setTimeout(() => {
			this.clickLamp.setFillStyle(0x666600);
		}, 100);
	}

    endGame() {
		for (const point of this.notePoints) {
			if (point.body) {
				this.correctScore = 0;
			}
		}
	
        this.isGameActive = false;

		this.scoreText.setText('Score: ' + this.score * this.correctScore);

        // Выводим сообщение об окончании игры
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Game Over', 
			{ fontSize: '48px', fill: '#fff' })
            .setOrigin(0.5);
    }

    placePoint() {
        if (this.isGameActive) {
			if (this.setCount < 3) {
				var posY = this.posY;
			} else {
				posY = this.posY + this.offsetY;
			}
			
            const tapPoint = this.add.circle(this.blackDot.x, posY + this.offsetPointY, 7, 0xffffff);
            this.physics.add.existing(tapPoint);

            var hitPoint = false;
			for (const note of this.notePoints) {
				if (this.physics.overlap(tapPoint, note)) {
					hitPoint = true;
					note.destroy();
				}
			}

            if (hitPoint) {
                tapPoint.setFillStyle(0x00ff00);
            } else {
                tapPoint.setFillStyle(0xff0000);
				this.correctScore = 0;
            }

	        /*if (tapPoint.body) {
	            tapPoint.body.setVelocityX(300);
	            this.pointsGroup.add(tapPoint);
	        } else {
	            console.error("tapPoint не является объектом физики.");
	        }*/
        }
    }


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
