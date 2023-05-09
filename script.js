//sets the size for the board upon loading the page

board = document.getElementById("board");
const cells = [];


nextStepButton = document.getElementById("nextStepButton")
finishTourButton = document.getElementById("finishTourButton")
previousStepButton = document.getElementById("previousStepButton")
findNextMovesButton = document.getElementById("findNextMovesButton")
resetButton = document.getElementById("resetButton")

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
        const tr = document.createElement("tr"); //creates rows for table based on boardSize variable
        cells[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement("td"); //creates data cells (columns) for table based on boardSize variable
            td.addEventListener("click", () => startTour(row, col));  
            cells[row][col] = td;
            tr.appendChild(td); //adds column to table row
        }
        board.appendChild(tr); //adds row to table
    }
}

initialize();


//code for the reset button
function reset(){
    board.innerHTML = ""; //removes the previous board
    window.location.reload();
    initialize();
}

resetButton.onclick = function(){reset()}

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

    //buttons on control panel
    nextStepButton.onclick = function(){nextStep()}
    previousStepButton.onclick = function(){previousStep()}
    finishTourButton.onclick = function(){finishTour()}
    findNextMovesButton.onclick = function(){findNextMoves()}

    //function for moving knight forward a step
    function nextStep(){
        const moves = findMoves(x, y);
        
        if (x == startX && y == startY){ //pop start position off when using next button
            knightPositions.pop()
        }

        if (moves.length === 0) {
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


        //HUGE BIG ALGORITHM FIXER
        if (countUnvisitedNeighbors(nextX, nextY) == 0 && moves.length != 1){
            //console.log("Test")
            [nextX, nextY] = moves[1];
        }

        console.log(moves.length)

        cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
        moveCount++;
        cells[x][y].textContent = moveCount;

        x = nextX;
        y = nextY;
        step++;
        cells[x][y].classList.add("visited", "current");
        cells[startX][startY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag">';
    }
    
    //function for moving the knight back a step
    function previousStep(){
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
        previousX = previousPosition[0];
        previousY = previousPosition[1];
        cells[previousX][previousY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';

        x = previousX;
        y = previousY;
    }

    //function for knight to finish tour
    return function finishTour(){
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
            

            //HUGE BIG ALGORITHM FIXER
            if (countUnvisitedNeighbors(nextX, nextY) == 0 && moves.length != 1){
                //console.log("Test")
                [nextX, nextY] = moves[1];
        }

            cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
            moveCount++;
            cells[x][y].textContent = moveCount;

            x = nextX;
            y = nextY;
            step++;
            cells[x][y].classList.add("visited", "current");
            cells[startX][startY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Emojione1_1F6A9.svg" id="flag">';

            
        }

        if ([x, y].toString() === knightPositions.slice(-1)[0].toString()){
            knightPositions.pop();
        }

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
        }
    }
    
    //function to find the next possible moves and the count of their unvisited neighbours
    function findNextMoves(){
        const moves = findMoves(x, y);
        //console.log(findMoves(x, y));
        console.log(countUnvisitedNeighbors(x, y));
        
        for (let index=0; index < moves.length; ++index){
            const element = moves[index]

            cells[element[0]][element[1]].classList.add("visited");
            cells[element[0]][element[1]].textContent = countUnvisitedNeighbors(element[0],element[1]);
            //console.log(element)
        }
    }    
}


let knightMoves = [[2, 1],[1, 2],[-2, -1],[-1, -2],[2, -1],[1, -2],[-2, 1],[-1, 2]];


function findMoves(x, y) {
    const moves = [];
    for (const [dx, dy] of knightMoves) {
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
    for (const [dx, dy] of knightMoves) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !cells[newX][newY].classList.contains("visited")) {
        count++;
    }
    }
    return count;
}

function calculateSuccess(){
    var tourSuccess = 0;
    var completeTour = 0;
    var incompleteTour = 0;
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            startTour(r, c)();
            var visitedCells = document.getElementsByClassName("visited")
            tourSuccess += (visitedCells.length)
            //console.log(tourSuccess + "%")

            if (visitedCells.length == boardSize*boardSize){
                //console.log("True")
                completeTour = completeTour + 1;
            }
            else{
                //console.log("False")
                incompleteTour = incompleteTour + 1;
            }
        }
    }
    //console.log("Tour Success Percentage: " + ((tourSuccess / (boardSize*boardSize)) * 100) / (boardSize*boardSize) + "%")
    //console.log((completeTour-incompleteTour) / (boardSize*boardSize) * 100 + "%")
    console.log("Completed tour count vs uncomplete tour count: " + completeTour + "/" + incompleteTour)
    //boardSize++
    //reset();

}

calculateSuccess();