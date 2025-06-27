// DOM Elements
const buttons = document.querySelectorAll(".button");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newBtn");
const winnerBox = document.getElementById("winner-box");
const winnerText = document.getElementById("winner");

// Game State
let turnO = true; // true for O, false for X
let gameActive = true;

// Winning Patterns
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [pos1, pos2, pos3] = pattern;
        const pos1Val = buttons[pos1].innerText;
        const pos2Val = buttons[pos2].innerText;
        const pos3Val = buttons[pos3].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    // Check for draw
    if ([...buttons].every(btn => btn.innerText)) {
        showWinner(null); // Draw case
    }
};

const disableButtons = () => {
    buttons.forEach(button => button.disabled = true);
};

const enableButtons = () => {
    buttons.forEach(button => {
        button.disabled = false;
        button.innerText = "";
    });
    gameActive = true;
};

const showWinner = (winner) => {
    if (winner) {
        winnerText.innerHTML = `Congratulations, Winner is ${winner}`;
        winnerBox.classList.remove("hide");
    } else if (winner === null) {
        winnerText.innerHTML = "Game is a Draw!";
        winnerBox.classList.remove("hide");
    }
    disableButtons();
    gameActive = false;
};

const resetGame = () => {
    turnO = true;
    enableButtons();
    winnerBox.classList.add("hide");
};

// Event Listeners
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!gameActive || button.innerText) return;

        if (turnO) {
            button.innerHTML = "O";
            button.style.color = "blue";
            turnO = false;
        } else {
            button.innerText = "X";
            button.style.color = "red";
            turnO = true;
        }
        button.disabled = true;

        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initial State
enableButtons();