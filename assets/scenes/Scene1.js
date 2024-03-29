class Scene1 extends Phaser.Scene {
	
	constructor() {
		super('Scene1');
	}
	
	_create() {		
        this.clickSound = this.sound.add('clickSound');
		this.bpm = 80;
		
		// Загружаем очки с сервера
		this.score = 0;
		this.scoreSets = [0, 0, 0, 0, 0, 0];
		
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

        // Кнопка "Тап"
        this.input.on('pointerdown', () => this.placePoint());
        
        this.isGameActive = false;

		this.blackDotStartX = this.posX + this.offsetPointX - 23;
		this.blackDotFinishX = this.posX + this.offsetPointX + this.offsetPic * 4 - 23;
		this.blacDotAndClickPointY = 700;

		this.isStarting = false;
		this.startMenu();
	}

	create() {
		this.backColor = '0x8C77E2';
		this._create();
	}

	update() {
		if (this.isStarting) {
			this.click();
		}
	}
	
	startMenu() {
		this.beatNum = 0;
		this.scoreSet = 0;
		const offsetX = 200;
		var offsetY = 100;
		this.scoreText = this.add.text(16, 16, 'Очки: ' + this.score, 
			{ fontSize: '32px', fill: '#fff' });
		
		const levelButton1 = this.add.text(
			this.game.config.width / 2 - offsetX, 
			100 + offsetY, '1-10', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 2;
				this.bpm = 100;
				this.level = 1;
				this.start()
			});
		this.scoreTextSet1 = this.add.text(
			this.game.config.width / 2 - offsetX, 
			130 + offsetY, 
			this.scoreSets[0], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton2 = this.add.text(
			this.game.config.width / 2, 
			100 + offsetY, '11-20', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 3;
				this.bpm = 90;
				this.level = 11;
				this.start()
			});
		this.scoreTextSet2 = this.add.text(
			this.game.config.width / 2, 
			130 + offsetY, 
			this.scoreSets[1], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton3 = this.add.text(
			this.game.config.width / 2 + offsetX, 
			100 + offsetY , '21-30', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 4;
				this.bpm = 80;
				this.level = 21;
				this.start()
			});
		this.scoreTextSet3 = this.add.text(
			this.game.config.width / 2 + offsetX, 
			130 + offsetY, 
			this.scoreSets[2], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		offsetY = 300;

		const levelButton4 = this.add.text(
			this.game.config.width / 2 - offsetX, 
			100 + offsetY, '31-40', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 5;
				this.bpm = 65;
				this.level = 31;
				this.start()
			});
		this.scoreTextSet4 = this.add.text(
			this.game.config.width / 2 - offsetX, 
			130 + offsetY, 
			this.scoreSets[3], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton5 = this.add.text(
			this.game.config.width / 2, 
			100 + offsetY, '41-50', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 5;
				this.bpm = 60;
				this.level = 41;
				this.start()
			});
		this.scoreTextSet5 = this.add.text(
			this.game.config.width / 2, 
			130 + offsetY, 
			this.scoreSets[4], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);

		const levelButton6 = this.add.text(
			this.game.config.width / 2 + offsetX, 
			100 + offsetY , '51-60', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 7;
				this.bpm = 55;
				this.level = 51;
				this.start()
			});
		this.scoreTextSet6 = this.add.text(
			this.game.config.width / 2 + offsetX, 
			130 + offsetY, 
			this.scoreSets[5], 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5);
		
		this.levelButtons = [levelButton1, levelButton2, levelButton3, 
			levelButton4, levelButton5, levelButton6];
		this.scoreTextSets = [this.scoreTextSet1, this.scoreTextSet2, this.scoreTextSet3, 
			this.scoreTextSet4, this.scoreTextSet5, this.scoreTextSet6];
	}
	
	start() {
		for (var btn of this.levelButtons) {
			btn.destroy();
		}
		
		for (var set of this.scoreTextSets) {
			set.visible = false;
		}
		
		this.checkSet = Math.floor((this.level - 1) / 10);
		
		this.setCount = 0;
		this.gameObjects = [];
		this.scoreText.visible = false;
		this.blackDot = this.add.circle(this.blackDotStartX, this.blacDotAndClickPointY, 10, this.backColor);
		this.physics.add.existing(this.blackDot);
		this.gameObjects.push(this.blackDot);
		
		this.isStarting = true;
		this.levelText = this.add.text(this.game.config.width / 2, 30, 'Уровень: ' + this.level, 
			{ fontSize: '32px', fill: '#fff' })
			.setOrigin(0.5);
			
		this.startButton = this.add.text(this.game.config.width / 2, 1000, 
			'СТАРТ', { fontSize: '40px', fill: '#fff', fontStyle: 'bold' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.startGame()
			});
		this.scoreLevel = 1;
		this.correctScore = 1;
		this.quartPauses = [];
		this.quartNotes = [];
		this.eightNotes = [];
		this.eightNotAndPaus = [];
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
		this.gameObjects.push(this.clickLamp);

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
		this.numNotes = ['0000', '1000', '1010', '0010', '1111', '1110', '1011', '1101', '0111'];
		this.randomNotes = [];
		this.beats = [];

		for (var i = 0; i < 4; i++) {
			const beat = this.add.text(
				this.posX - this.offsetBeat + this.offsetPic * i, 
				this.posY - 75, i + 1, { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
			this.beats.push(beat);
			const note = this.add.image(
				this.posX + this.offsetPic * i, this.posY, 
				'textures', this.getRandomElement(this.numNotes))
				.setScale(0.5, 0.5);
			this.gameObjects.push(note);
		}
		
		for (var i = 0; i < 4; i++) {
			const beat = this.add.text(
				this.posX - this.offsetBeat + this.offsetPic * i, 
				this.posY - 75 + this.offsetY, i + 1, 
				{ fontSize: '32px', fill: '#fff', fontStyle: 'bold' });
			this.beats.push(beat);
			const note = this.add.image(
				this.posX + this.offsetPic * i, 
				this.posY + this.offsetY, 'textures', 
				this.getRandomElement(this.numNotes))
				.setScale(0.5, 0.5);
			this.gameObjects.push(note);
		}
		
		this.createNotePoints();
	}
	
	getRandomElement(arr) {
		var note = arr[Math.floor(Math.random() * this.complexityOfLevelNotes)];
		if (note == '0000') {
			this.quartPauses.push(note);
		}
		if (note == '1000') {
			this.quartNotes.push(note);
		}
		if (note == '1010') {
			this.eightNotes.push(note);
		}
		if (note == '0010') {
			this.eightNotAndPaus.push(note);
		}
		
		console.log(this.checkSet);
		console.log(note);
		
		while (this.checkSet == 0 && this.quartPauses.length > 3 && note == '0000' ||
			this.checkSet == 1 && this.quartPauses.length > 2 && note == '0000' ||
			this.checkSet > 1 && this.quartPauses.length > 1 && note == '0000' ||
			this.checkSet == 1 && this.quartNotes.length > 3 && note == '1000' ||
			this.checkSet == 2 && this.quartNotes.length > 2 && note == '1000' ||
			this.checkSet > 2 && this.quartNotes.length > 1 && note == '1000' ||
			this.checkSet == 2 && this.eightNotes.length > 3 && note == '1010' ||
			this.checkSet == 3 && this.eightNotes.length > 2 && note == '1010' ||
			this.checkSet > 3 && this.eightNotes.length > 1 && note == '1010' ||
			this.checkSet == 3 && this.eightNotAndPaus.length > 0 && note == '0010'
			) {
			note = arr[Math.floor(Math.random() * this.complexityOfLevelNotes)];
			console.log('+');
		}
		console.log('--- ', note, ' ---')
		
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
		for (var i = 4; i < 8; i++) {
			markerOfPoints2 += this.randomNotes[i];
		}
		
		for (var i = 0; i < 16; i++) {
			if (markerOfPoints1[i] == 1) {
				const notePoint = this.add.circle(
					this.posX + this.offsetPointX + this.offset16thNote * i,
					this.posY + this.offsetPointY, 9, 0x000);
				this.physics.add.existing(notePoint);
				this.notePoints.push(notePoint);
			}
		}
		
		for (var i = 0; i < 16; i++) {
			if (markerOfPoints2[i] == 1) {
				const notePoint = this.add.circle(
					this.posX + this.offsetPointX + this.offset16thNote * i,
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
				this.posX + this.offsetPointX + this.offsetPic * i + 14, 
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
			point.setFillStyle(0xff0000);
			if (point.body) {
				this.correctScore = 0;
			}
		}
	
        this.isGameActive = false;

		this.scoreSet += this.scoreLevel * this.correctScore;

		if (this.level % 10 == 0) {
			if (this.scoreSet > this.scoreSets[this.checkSet]) {
				this.scoreSets[this.checkSet] = this.scoreSet;
			}
			
			var score = 0;
			for (var set of this.scoreSets) {
				score += set;
			}
			this.score = score;
			
			this.sendScoreToFunction();
			this.clearGameObject();

			this.startMenu();
			return;
		}

		const goToMenu = this.add.text(this.game.config.width / 2 - 150, 1000, 'В меню', 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.clearGameObject();
				nextLevel.destroy();
				goToMenu.destroy();

				this.startMenu();
			});

		const nextLevel = this.add.text(this.game.config.width / 2 + 150, 1000, 'Дальше', 
			{ fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.clearGameObject();
				goToMenu.destroy();
				nextLevel.destroy();
				this.level++;
				this.beatNum = 0;

				this.start();
			});
    }

	clearGameObject() {
		this.isStarting = false;
		
		for (var beat of this.beats) {
			beat.destroy();
		}
		
		for (var obj of this.gameObjects) {
			obj.destroy();
		}
		
		for (var point of this.notePoints) {
			point.destroy();
		}
		
		this.levelText.destroy();
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
			this.gameObjects.push(tapPoint);

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
        }
    }

	sendScoreToFunction() {
		
		// Здесь будет логика отправки очков в облачную функцию
		// для последующей передачи на сервер !!!
		
	}

}
