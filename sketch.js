let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let players = ["X", "O"];
let currentPlayer = "X";
let winner = null;
let moves = 0;
function setup() {
  createCanvas(300, 400);
  strokeWeight(4);
  frameRate(10);
  var button = createButton("reset");
  button.mouseClicked(resetSketch);
}
function resetSketch() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  winner = null;
  moves = 0;
  loop();
}

function draw() {
  background("#e7f5ff");
  let w = 100;
  let h = 100;
  strokeWeight(4);
  stroke("#1098ad");
  line(0, h, 300, h);
  line(0, h * 2, 300, h * 2);
  line(w, 0, w, 300);
  line(w * 2, 0, w * 2, 300);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == players[0]) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
  if (winner == null) {
    textSize(32);
    fill("#1089ad");
    strokeWeight(0);
    text(`Current Player: ${currentPlayer}`, 10, 350);
  } else if (winner == "Tie!!") {
    textSize(32);
    fill("#1098ad");
    strokeWeight(0);
    text(`No one wins!!`, 0, 350);
  } else {
    textSize(32);
    fill("#1098ad");
    strokeWeight(0);
    text(`${winner} wins!!`, 0, 350);
  }
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let x1 = floor(x / 100);
  let y1 = floor(y / 100);
  // console.log(x1, y1);
  if (board[x1][y1] == "") {
    board[x1][y1] = currentPlayer;
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    moves++;
    checkforWinner();
  }
}

function equal3(a, b, c) {
  return a == b && b == c && a == c && a != "";
}

function checkforWinner() {
  for (let i = 0; i < 3; i++) {
    if (equal3(board[i][0], board[i][1], board[i][2])) {
      noLoop();
      winner = board[i][0];
    }
    if (equal3(board[0][i], board[1][i], board[2][i])) {
      noLoop();
      winner = board[0][i];
    }
  }
  if (equal3(board[0][0], board[1][1], board[2][2])) {
    noLoop();
    winner = board[0][0];
  }
  if (equal3(board[0][2], board[1][1], board[2][0]) && board[1][1] != "") {
    noLoop();
    winner = board[1][1];
  }
  if (moves == 9 && winner == null) {
    noLoop();
    winner = "Tie!!";
    // console.log(winner);
  }
}
