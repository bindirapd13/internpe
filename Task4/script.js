const rows = 6;
const cols = 7;
let board = Array(rows).fill(null).map(() => Array(cols).fill(null));
let currentPlayer = 'red'; 

const boardElement = document.getElementById('board');
const winnerMessage = document.getElementById('winnerMessage');

function createBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => dropPiece(c));
            boardElement.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            updateBoard();
            if (checkWin(r, col)) {
                winnerMessage.textContent = `${currentPlayer.toUpperCase()} Wins!`;
                disableBoard();
            } else {
                currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
            }
            return;
        }
    }
}

function updateBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
            cell.classList.remove('red', 'blue');
            if (board[r][c]) {
                cell.classList.add(board[r][c]);
            }
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) ||  
           checkDirection(row, col, 0, 1) ||  
           checkDirection(row, col, 1, 1) ||  
           checkDirection(row, col, 1, -1);   
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countPieces(row, col, rowDir, colDir);
    count += countPieces(row, col, -rowDir, -colDir);
    return count >= 4;
}

function countPieces(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
}

createBoard();
document.getElementById('restartButton').addEventListener('click', resetGame);

function resetGame() {
    board = Array(rows).fill(null).map(() => Array(cols).fill(null)); 
    currentPlayer = 'red'; 
    winnerMessage.textContent = ''; 
    createBoard(); 
}
