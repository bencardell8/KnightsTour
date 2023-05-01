//sets the size for the board upon loading the page

board = document.getElementById("board");
const cells = [];


nextStepButton = document.getElementById("nextStepButton")
finishTourButton = document.getElementById("finishTourButton")

function initialize(){ //initializes first board or reinitializes a new board of given input size


    //reassigns boardSize to given input
    boardSizeHolder = document.getElementById("boardsize");
    boardSize = boardSizeHolder.value;
    if (boardSize > 12){
        boardSize = 12;
        boardSizeHolder.value = 12;
    }
    
    if (boardSize < 1){
        boardSize = 1;
        boardSizeHolder.value = 1
    }


    for (let row = 0; row < boardSize; row++) {
        const tr = document.createElement("tr");
        cells[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement("td");
            //td.textContent = `${row},${col}`;
            td.addEventListener("click", () => startTour(row, col));
            //td.addEventListener("click", () => td.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag" max-width: 20%;>');
            //td.addEventListener("click", () => td.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg">');
            cells[row][col] = td;
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
    //td.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg">';
}

initialize();


//code for the reset button
reset.addEventListener("click", function(){
    board.innerHTML = ""; //removes the previous board
    window.location.reload();
    initialize();
    
    //td.removeEventListener("click", () => startTour(row, col));
});

function startTour(row, col) {
    var knightPositions = [];
    // Clear the board.
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            cells[r][c].classList.remove("visited", "current");
            //cells[r][c].innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png" id="cross">';
            cells[r][c].innerHTML = '';
        }
    }

    let moveCount = -1
    // Perform the tour.
    let step = 1;
    let x = row;
    let y = col;
    console.log([x,y]);
    cells[x][y].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';

    cells[x][y].classList.add("visited");
    
    startX = x;
    startY = y;

    knightPositions.push([startX, startY]);
    
   // while (step < boardSize * boardSize) {
    //find  available moves from  current position.
    nextStepButton.onclick = function(){    
        const moves = findMoves(x, y);
        
        if (x == startX && y == startY){ //pop start position off when using next button
            knightPositions.pop()
        }

        if (moves.length === 0) {
            //dead end so backtrack.
            //cells[x][y].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
            //console.log("movecount: " + moveCount)
            //console.log("moves: " + moves.length)
            //console.log("knight positions: ")
            //console.log(knightPositions)

            for (let r = 0; r < boardSize; r++) {
                for (let c = 0; c < boardSize; c++) {
                    if (cells[r][c].innerHTML == ""){
                        cells[r][c].innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png" id="cross">';
                    }
                }
            }


            return;
        }

        //sort moves by the number of unvisited neighbors
        moves.sort((a, b) => countUnvisitedNeighbors(a[0], a[1]) - countUnvisitedNeighbors(b[0], b[1]));
        

        knightPositions.push([x, y]); //adds knight position to array
        
        //choose the next move.
        [nextX, nextY] = moves[0];

        //console.log("moves: " , moves)

        //console.log(knightPositions)

        cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
        moveCount++;
        cells[x][y].textContent = moveCount;

        x = nextX;
        y = nextY;
        step++;
        cells[x][y].classList.add("visited", "current");
        cells[startX][startY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag">';
    }

    previousStepButton.onclick = function(){    

        if (x == startX && y == startY){ // if knight returns to start position
            //console.log("back to the start :)")
            return;
        }

        cells[x][y].innerHTML='';
        cells[x][y].classList.remove("visited", "current");
        
        
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (cells[r][c].innerHTML == '<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png" id="cross">'){
                    cells[r][c].innerHTML = '';
                }
            }
        }

        moveCount--;
        step--;

        var previousPosition = knightPositions.pop();
        //console.log(previousPosition)
        previousX = previousPosition[0];
        previousY = previousPosition[1];
        console.log(previousPosition)
        console.log(knightPositions)
        //console.log(previousX)
        cells[previousX][previousY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
        //cells[x][y].classList.add("visited", "current");
        //cells[startX][startY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag">';

        x = previousX;
        y = previousY;
    }

    finishTourButton.onclick = function(){ //function for Finish Tour button
        const moves = findMoves(x, y);
        while (step < boardSize * boardSize) { //repeats next step code until done
            const moves = findMoves(x, y);
            moves.sort((a, b) => countUnvisitedNeighbors(a[0], a[1]) - countUnvisitedNeighbors(b[0], b[1]));
            
            knightPositions.push([x, y]); //adds knight position to array

            if (x == startX && y == startY){ //pop start position off when using next button
                knightPositions.pop()
            }
            
            
            
            if (moves.length === 0) {
                //dead end so backtrack.
                if (moves.length === 0)
                break;
            }
            

            //choose the next move.
            [nextX, nextY] = moves[0];
            

            cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
            moveCount++;
            cells[x][y].textContent = moveCount;

            x = nextX;
            y = nextY;
            step++;
            cells[x][y].classList.add("visited", "current");
            cells[startX][startY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag">';

            
        }

       // if (moves.length === 0) {
            //dead end so backtrack.
         //   return;
        //}

        //console.log("movecount: " + moveCount)
        //console.log("moves: " + moves.length)
        //console.log("next move: " + nextX, nextY)
        //console.log(x, y)
        //knightPositions.pop();
        
        //console.log("Previous position: " + knightPositions.slice(-1)[0])
        //console.log("Previous position: " + knightPositions.pop())
        

        //console.log("x, y: ", [x, y])
        //console.log("slice: ", knightPositions.slice(-1)[0])

        if ([x, y].toString() === knightPositions.slice(-1)[0].toString()){
            //console.log("check")
            knightPositions.pop();
        }

        //console.log("Knights positions: ")
        //console.log(knightPositions)

        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (cells[r][c].innerHTML == ""){
                    cells[r][c].innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png" id="cross">';
                }
            }
        }

    }

    findNextMovesButton.onclick = function(){
        const moves = findMoves(x, y);
        //console.log(findMoves(x, y));
        console.log(countUnvisitedNeighbors(x, y));
        
        for (let index=0; index < moves.length; ++index){
            const element = moves[index]

            cells[element[0]][element[1]].classList.add("visited");
            cells[element[0]][element[1]].textContent = countUnvisitedNeighbors(element[0],element[1]);
            console.log(element)
        }
    }
    
    //console.log([x, y]);
    //cells[x][y].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
    
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