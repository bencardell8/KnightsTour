//sets the default size for the board upon loading the page
boardSize = 8;
board = document.getElementById("board");
const cells = [];

function initialize(){ //initializes first board or reinitializes a new board of given input size
    for (let row = 0; row < boardSize; row++) {
        const tr = document.createElement("tr");
        cells[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement("td");
            //td.textContent = `${row},${col}`;
            td.addEventListener("click", () => startTour(row, col));
            td.addEventListener("click", () => td.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg">');
            cells[row][col] = td;
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}

initialize();


//code for the reset button
reset.addEventListener("click", function(){
    board.innerHTML = ""; //removes the previous board

    //reassigns boardSize to given input
    boardSizeHolder = document.getElementById("boardsize");
    boardSize = boardSizeHolder.value;
    
    initialize();

});

function startTour(row, col) {
    // Clear the board.
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            cells[r][c].classList.remove("visited", "current");
            cells[r][c].textContent = ""
        }
    }

    let moveCount = 1
    // Perform the tour.
    let step = 1;
    let x = row;
    let y = col;
    cells[x][y].classList.add("visited");
    while (step < boardSize * boardSize) {
    //find  available moves from  current position.
    const moves = findMoves(x, y);
    if (moves.length === 0) {
        //dead end so backtrack.
        break;
    }

    //sort moves by the number of unvisited neighbors
    moves.sort((a, b) => countUnvisitedNeighbors(a[0], a[1]) - countUnvisitedNeighbors(b[0], b[1]));

    //choose the next move.
    const [nextX, nextY] = moves[0];

    moveCount++;
    cells[nextX][nextY].textContent = moveCount;

    x = nextX;
    y = nextY;
    step++;
    cells[x][y].classList.add("visited", "current");
    }
}

function findMoves(x, y) {
    const moves = [];
    const deltas = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    ];
    for (const [dx, dy] of deltas) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !cells[newX][newY].classList.contains("visited")) {
        moves.push([newX, newY]);
    }
    }
    return moves;
}

function countUnvisitedNeighbors(x, y) {
    let count = 0;
    const deltas = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    ];
    for (const [dx, dy] of deltas) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !cells[newX][newY].classList.contains("visited")) {
        count++;
    }
    }
    return count;
}