let figure;
let colorsArray = [
  "#000000",
  "#00FF00",
  "#FF0000",
  "#00FFFF",
  "#FFFF00",
  "#FF7F50"
];
let zoom = 1;
let gridSize = 32;
let gridX = 10,
  gridY = 15;
let WIDTH = gridSize * gridX * zoom;
let HEIGHT = gridSize * gridY * zoom;
controller.canvas.width = WIDTH;
controller.canvas.height = HEIGHT;
let ctx = controller.context;

let gameField = [];

for (var i = 0; i < gridY; i++) {
  gameField[i] = [];
}

for (let x = 0; x < gridX; x++) {
  for (let y = 0; y < gridY; y++) {
    gameField[y][x] = 0;
  }
}
