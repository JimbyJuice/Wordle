const height = 6; // number of guesses
const width = 5; // length of the word

let row = 0;
let col = 0;

let gameOver = false;
let word = "BANAL";

function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  // Listen for key press, e is the key
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(
          row.toString() + "-" + col.toString(),
        );
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(
        row.toString() + "-" + col.toString(),
      );
      currTile.innerText = "";
    } else if (e.code == "Enter" && col == width) {
      let freq = new Map();
      for (let char of word) {
        freq.set(char, (freq.get(char) || 0) + 1);
      }

      update(freq);
      row += 1;
      col = 0;
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
      return;
    }
  });
}

function update(freq) {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;
    if (letter == word[c]) {
      // correct pos, correct letter
      currTile.classList.add("correct");
      freq.set(letter, Math.max(freq.get(letter) - 1, 0));
      correct += 1;
    } else if (freq.get(letter)) {
      currTile.classList.add("present");
      freq.set(letter, Math.max(freq.get(letter) - 1, 0));
    } else {
      currTile.classList.add("absent");
    }
    if (correct == width) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  }
}

window.onload = function () {
  initialize();
};
