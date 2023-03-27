let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameStatus = document.getElementById("game-status");
let resetButton = document.getElementById("reset-button");

function handleCellClick(event) {
	let cell = event.target;
	let cellIndex = parseInt(cell.id.split("-")[1]);

	if (gameBoard[cellIndex] !== "" || isGameOver()) {
		return;
	}

	gameBoard[cellIndex] = currentPlayer;
	cell.innerText = currentPlayer;
	cell.style.color = currentPlayer === "X" ? "#4285f4" : "#ea4335";

	if (checkWin() || checkTie()) {
		endGame();
	} else {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		gameStatus.innerText = `${currentPlayer}'s Turn`;
	}
}

function checkWin() {
	let winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let combo of winningCombos) {
		if (gameBoard[combo[0]] === gameBoard[combo[1]] &&
			gameBoard[combo[1]] === gameBoard[combo[2]] &&
			gameBoard[combo[0]] !== "") {
			return true;
		}
	}

	return false;
}

function checkTie() {
	return gameBoard.every((cell) => cell !== "");
}

function endGame() {
	if (checkWin()) {
		gameStatus.innerText = `${currentPlayer} wins!`;
	} else {
		gameStatus.innerText = "Tie Game";
	}

	resetButton.style.display = "block";
}

function isGameOver() {
	return checkWin() || checkTie();
}

function resetGame() {
	gameBoard = ["", "", "", "", "", "", "", "", ""];
	currentPlayer = "X";
	gameStatus.innerText = `${currentPlayer}'s Turn`;
	resetButton.style.display = "none";

	let cells = document.getElementsByClassName("cell");
	for (let cell of cells) {
		cell.innerText = "";
		cell.style.color = "#333333";
	}
}

let cells = document.getElementsByClassName("cell");
for (let cell of cells) {
	cell.addEventListener("click", handleCellClick);
}

resetButton.addEventListener("click", resetGame);
