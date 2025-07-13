/* ---------- Game state ---------- */
let player1Name = "";
let player2Name = "";
let currentPlayer = 1;             // 1 => x, 2 => o
let gameActive   = true;
let gameState    = Array(9).fill("");

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

/* ---------- DOM refs ---------- */
const setupSection = document.querySelector(".player-setup");
const boardSection = document.querySelector(".game-board");
const messageBox   = document.querySelector(".message");
const submitBtn    = document.getElementById("submit");
const resetBtn     = document.getElementById("reset");
const cells        = document.querySelectorAll(".cell");

/* ---------- Start game ---------- */
submitBtn.addEventListener("click", () => {
  player1Name = document.getElementById("player1").value.trim();
  player2Name = document.getElementById("player2").value.trim();

  if (!player1Name || !player2Name) {
    alert("Please enter names for both players!");
    return;
  }

  setupSection.style.display = "none";
  boardSection.style.display = "block";
  updateMessage();
});

/* ---------- Cell clicks ---------- */
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(e) {
  const idx = +e.target.id - 1;           // id 1‑9 -> index 0‑8
  if (gameState[idx] || !gameActive) return;

  const mark = currentPlayer === 1 ? "x" : "o";
  gameState[idx] = mark;

  e.target.textContent = mark;
  e.target.classList.add("taken", mark);

  if (isWin()) {
    messageBox.textContent =
      `${currentPlayer === 1 ? player1Name : player2Name} congratulations you won!`;
    gameActive = false;
  } else if (isDraw()) {
    messageBox.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateMessage();
  }
}

/* ---------- Helpers ---------- */
function updateMessage() {
  const name = currentPlayer === 1 ? player1Name : player2Name;
  messageBox.textContent = `${name}, you're up`;
}

function isWin() {
  const target = currentPlayer === 1 ? "x" : "o";
  return winningCombos.some(combo => combo.every(i => gameState[i] === target));
}

function isDraw() {
  return gameState.every(cell => cell !== "");
}

/* ---------- Reset ---------- */
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  currentPlayer = 1;
  gameActive    = true;
  gameState.fill("");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken", "x", "o");
  });

  updateMessage();
}
