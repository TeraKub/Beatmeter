
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
		
        this.line;
        this.pointsGroup;
        //this.score = 0;
        this.scoreText;

        // Создание группы для точек
        this.pointsGroup = this.physics.add.group();

        // Текст для отображения счета
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // Кнопка "Старт"
        /*this.startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'СТАРТ', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.start()
			});*/

        // Кнопка "Тап"
        this.input.on('pointerdown', () => this.placePoint());
        
        // Флаг для определения, идет ли игра
        this.isGameActive = false;

		this.blackDotStartX = this.posX + this.offsetPointX - 23;
		this.blackDotFinishX = this.posX + this.offsetPointX + this.offsetPic * 4 - 23;
		this.blacDotAndClickPointY = 700;
		this.blackDot = this.add.circle(this.blackDotStartX, this.blacDotAndClickPointY, 10, this.backColor);
		this.physics.add.existing(this.blackDot);
		//console.log(this.blackDot.x, this.blackDot.y);
		
		this.startMenu();
	}
	
	/* START-USER-CODE */

	create() {
		this.backColor = '0x8C77E2';
		//this.createNotes();
		this._create();
		//this.setCount = 0;
		//this.createClickPoint();
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
				this.start()
			});
		const levelButton2 = this.add.text(this.game.config.width / 2, 100 + offsetY, '11-20', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 3;
				this.bpm = 90;
				this.start()
			});
		const levelButton3 = this.add.text(this.game.config.width / 2 + offsetX, 100 + offsetY , '21-30', { fontSize: '40px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.complexityOfLevelNotes = 4;
				this.bpm = 80;
				this.start()
			});
		
		this.levelButtons = [levelButton1, levelButton2, levelButton3];
	}
	
	start() {
		for (var btn of this.levelButtons) {
			btn.destroy();
		}
		this.startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'СТАРТ', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
				this.startGame()
			});
		this.score = 1;
		//console.log('score', this.score);
		this.correctScore = 1;
		//console.log('correctScore', this.correctScore);
		this.createNotes();
		this.createClickPoint();
		//this.startGame();
	}
	
	startGame() {
        // Убираем кнопку "Старт"
        this.startButton.destroy();

		this.clickLamp = this.add.circle(
			this.game.config.width / 2, 
			this.game.config.height / 2 - 90, 
			100, 
			0x666600
			);

		if (this.setCount == 2) {
			// Включаем флаг игры
        this.isGameActive = true;
		}
		
		
        // Запускаем движение this.blackDot
        this.tweens.add({
            targets: this.blackDot,
            x: this.blackDotFinishX,
            duration: 60 / this.bpm * 4000,
            onComplete: () => {
				//console.log(this.setCount);
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
		//console.log(this.numNotes);
		
		/*this.posX = 137;
		this.posY = 150;
		this.offsetBeat = 75;
		this.offsetPic = 154.6;
		this.offsetY = 200;*/
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
		//const note = arr[Math.floor(Math.random() * arr.length)];
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
				this.posX + this.offsetPointX + this.offsetPic * i + 10, 
				this.blacDotAndClickPointY, 10, this.backColor
			);
			this.physics.add.existing(clickPoint);
			this.clickPoints.push(clickPoint)
		}
	}
	
	click() {
		if (this.blackDot.x > this.blackDotStartX && 
		this.blackDot.x < this.posX + this.offsetPointX + this.offsetPic * 4 - this.offset16thNote
		) {
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
		//console.log(this.notePoints);
		for (const point of this.notePoints) {
			if (point.body) {
				//console.log('ЛОХ');
				this.correctScore = 0;
				//console.log('correctScore', this.correctScore);
			}
		}
	
        // Отключаем флаг игры
        this.isGameActive = false;

		this.scoreText.setText('Score: ' + this.score * this.correctScore);
		//console.log('finaleScore', this.score * this.correctScore);

        // Выводим сообщение об окончании игры
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Game Over', { fontSize: '48px', fill: '#fff' })
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
					//return;
				}
			}
			//console.log('blackDot position:', this.blackDot.x, this.blackDot.y);
			//console.log('hitPoint: ', hitPoint);

            if (hitPoint) {
                tapPoint.setFillStyle(0x00ff00);
                //this.score += 10;
            } else {
                tapPoint.setFillStyle(0xff0000);
				this.correctScore = 0;
				//console.log('correctScore', this.correctScore);
            }

            //tapPoint.setVelocityX(300);
            //this.pointsGroup.add(tapPoint);

			// Проверяем, является ли tapPoint объектом физики перед использованием setVelocityX
	        /*if (tapPoint.body) {
	            tapPoint.body.setVelocityX(300);
	            this.pointsGroup.add(tapPoint);
	        } else {
	            console.error("tapPoint не является объектом физики.");
	        }*/

            // Обновление счета
            //this.scoreText.setText('Score: ' + this.score * this.correctScore);
			//console.log('finaleScore', this.score * this.correctScore);
        }
    }


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
