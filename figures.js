class Figures {
  constructor(x, y, color, type) {
    this.x = x;
    this.y = y;
    this.color = colorsArray[color];
    this.speed = 1;
    this.type = type;
    this.isAlive = true;
    switch (this.type) {
      case 0:
        this.shape = [
          [color, color, 0],
          [0, color, color],
          [0, 0, 0]
        ];
        break;
      case 1:
        this.shape = [
          [color, color, 0],
          [color, color, 0],
          [0, 0, 0]
        ];
        break;
      case 2:
        this.shape = [
          [color, color, color],
          [0, color, 0],
          [0, 0, 0]
        ];
        break;
      case 3:
        this.shape = [
          [color, color, color],
          [0, 0, 0],
          [0, 0, 0]
        ];
        break;
      case 4:
        this.shape = [
          [color, color, 0],
          [0, color, 0],
          [0, color, 0]
        ];
        break;
      case 5:
        this.shape = [
          [0, color, color],
          [0, color, 0],
          [0, color, 0]
        ];
        break;
      case 6:
        this.shape = [
          [0, color, color],
          [color, color, 0],
          [0, 0, 0]
        ];
        break;
    }
  }

  draw() {
    for (var i = 0; i < this.shape.length; i++) {
      for (var j = 0; j < this.shape[i].length; j++) {
        if (this.shape[j][i] != 0) {
          controller.setCellColor(this.x + i, this.y + j, this.shape[j][i]);
        }
      }
    }
  }

  move() {
    this.y += this.speed;
    this.speed = 1;
  }

  rotate() {
    let tempShape = [];
    for (var i = 0; i < this.shape.length; i++) {
      tempShape[i] = [];
    }
    if (this.type != 1) {
      for (var i = 0; i < this.shape.length; i++) {
        for (var j = 0; j < this.shape.length; j++) {
          tempShape[i][j] = this.shape[i][j];
        }
      }

      for (var i = 0; i < this.shape.length; i++) {
        for (var j = 0; j < this.shape[i].length; j++) {
          this.shape[i][j] = tempShape[j][this.shape.length - i - 1];

          /* [color,color,  0],
            [  0,  color,  0],
            [  0,  color,  0]
          ];
  */
        }
      }

      console.log(tempShape, "  ", this.shape);
    }
  }

  moveLeft() {
    this.x += -1;
    for (var i = 0; i < this.shape.length; i++) {
      for (var j = 0; j < this.shape.length; j++)
        if (this.shape[j][i] != 0 && this.x + i < 0) {
          this.x++;
          return;
        }
    }
    for (var i = 0; i < this.shape.length; i++) {
      for (var j = 0; j < this.shape.length; j++)
        if (this.shape[j][i] != 0 && gameField[this.y + j][this.x + i] != 0) {
          this.x++;
          return;
        }
    }
  }

  moveRight() {
    this.x++;
    for (var i = this.shape.length - 1; i >= 0; i--) {
      for (var j = 0; j < this.shape.length; j++)
        if (this.shape[j][i] != 0 && this.x + i > gridX - 1) {
          this.x--;
          return;
        }
    }
    for (var i = this.shape.length - 1; i >= 0; i--) {
      for (var j = 0; j < this.shape.length; j++)
        if (this.shape[j][i] != 0 && gameField[this.y + j][this.x + i] != 0) {
          this.x--;
          return;
        }
    }
  }

  moveFaster() {
    //this.speed++;
  }

  colision() {
    for (var i = this.shape.length - 1; i >= 0; i--) {
      for (var j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] != 0) {
          if (this.y + i + 1 < gridY) {
            if (gameField[this.y + i + 1][this.x + j] != 0) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  isOnBotom() {
    for (var i = this.shape.length - 1; i >= 0; i--) {
      for (var j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] != 0 && this.y + i + 1 >= gridY) return true;
      }
    }
    return false;
  }
}
