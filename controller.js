class Controller {
  constructor(canvas) {
    this.frame = 0;
    this.frameInterval = 40;
    this.score = 0;
    this.canvas = canvas.link;
    this.context = this.canvas.getContext("2d");
    this.scoreID = document.getElementById("score");
    this.isGameStoped = false;
    this.key = null;
    this.isMoved = false;
  }

  start() {
    window.addEventListener("keydown", e => {
      this.key = e.keyCode;
    });
    window.addEventListener("keyup", e => {
      this.key = e.false;
      this.isMoved = false;
    });

    //this.scoreID.innerHTML = this.score;

    //this.drawGameField();
    this.addFigure();
    figure.draw();
    this.animate.call(this);
  }

  stop() {
    this.scoreID.innerHTML = "0";
    //this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    cancelAnimationFrame(anID);
  }

  animate() {
    if (!this.isGameStoped) {
      this.context.clearRect(
        0,
        0,
        this.canvas.clientWidth,
        this.canvas.clientHeight
      );
      this.drawGameField();
      this.findAndRemoveLines();

      if (this.key && !this.isMoved) {
        if (this.key == 39) {
          figure.moveRight();
        }
        if (this.key == 37) {
          figure.moveLeft();
        }
        if (this.key == 40) {
          figure.moveFaster();
        }
        if (this.key == 38) {
          figure.rotate();
        }

        this.isMoved = true;
      }

      if (this.frame == this.frameInterval) {
        this.frame = 0;
        if (!figure.colision() && !figure.isOnBotom()) {
          figure.move();
        } else {
          this.updateGameField();
          this.drawGameField();
          this.addFigure();
        }
      }

      this.frame++;

      /*      if (!figure.isAlive) {
        this.addFigure();
        
      }*/

      figure.draw();
    }

    anID = requestAnimationFrame(this.animate.bind(this));
  }

  addFigure() {
    let x = Math.floor(gridX / 2 - 1);
    let color = Math.floor(Math.random() * (colorsArray.length - 1)) + 1;
    let type = Math.floor(Math.random() * 7);
    figure = new Figures(x, 0, color, type);
    console.log(figure);
    if (figure.colision()) {
      this.updateGameField();
      this.drawGameField();

      this.gameOver();
    }
  }

  updateGameField() {
    for (var i = 0; i < figure.shape.length; i++) {
      for (var j = 0; j < figure.shape[i].length; j++) {
        if (figure.shape[i][j] != 0) {
          gameField[figure.y + i][figure.x + j] = figure.shape[i][j];
        }
      }
    }
  }

  setCellColor(x, y, color) {
    this.context.fillStyle = colorsArray[color];
    this.context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }

  drawGameField() {
    for (var i = 0; i < gridX; i++) {
      for (var j = 0; j < gridY; j++) {
        this.setCellColor(i, j, gameField[j][i]);
      }
    }
  }

  findAndRemoveLines() {
    let flag = false;
    let count = 0;
    let lines = 0;
    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[i].length; j++) {
        if (gameField[i][j] != 0) {
          count++;
        }
      }
      if (count == gridX) {
        this.moveAllDown(i);
        this.score += 10;
        this.scoreID.innerHTML = this.score;
        lines++;
      }
      count = 0;
    }

    if (lines == 2) {
      this.score += 10;
      this.scoreID.innerHTML = this.score;
    }
    if (lines == 3) {
      this.score += 30;
      this.scoreID.innerHTML = this.score;
    }
  }

  moveAllDown(index) {
    for (let i = index; i >= 1; i--) {
      for (var j = 0; j < gameField[i].length; j++) {
        gameField[i][j] = gameField[i - 1][j];
      }
    }
    for (var i = 0; i < gameField[0].length; i++) {
      gameField[0][i] = 0;
    }
  }

  gameOver() {
    ctx = this.context;
    ctx.font = "90px Comic Sans MS";
    ctx.strokeStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeText("LOOSE", WIDTH / 2, HEIGHT / 2);
    this.stop();
    this.isGameStoped = true;
  }
}

let controller = new Controller(_canvas);
let anID;
