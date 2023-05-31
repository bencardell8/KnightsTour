//sets the size for the board upon loading the page

board = document.getElementById("board");
cells = [];


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
            cells[r][c].innerHTML = '';
        }
    }

    let moveCount = -1
    // Perform the tour.
    let step = 1;
    let x = row;
    let y = col;
    //let tieBreakAX = 0;
    //let tieBreakAY = 0;
    //tempMoveHolder = []
    console.log([x,y]); //Prints starting position of knight in console
    cells[x][y].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
    // ^ Places knight icon on starting position ^

    cells[x][y].classList.add("visited");
    
    [startX, startY] = [x, y]

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

        //sort moves by the number of unvisited neighbours
        moves.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));
        
        /*console.log(moves)

        
        if(moves.length !== 1 && moves[0].countUnvisitedNeighbours == moves[1].countUnvisitedNeighbours){

            for(let i = 0; i < moves.length; i++){
                const target = moves[0].countUnvisitedNeighbours

                if (moves[i].countUnvisitedNeighbours == target){
                    //console.log("True")
                    [tieBreakAX, tieBreakAY] = moves[0];
                    [tieBreakBX, tieBreakBY] = moves[i];

                    const tieBreak1 = findMoves(tieBreakAX, tieBreakAY);
                    const tieBreak2 = findMoves(tieBreakBX, tieBreakBY);

                    tieBreak1.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));
                    tieBreak2.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));


                    //console.log(countUnvisitedNeighbours(tempMoves[0]))

                    var moveCounter1 = 0
                    var moveCounter2 = 0

                    for (let index = 0; index < tieBreak1.length; ++index) {
                        const element2 = tieBreak1[index]
                        //console.log(countUnvisitedNeighbours(moveTest))
                        //console.log(countUnvisitedNeighbours(element2[0], element2[1]))
                        moveCounter1 = moveCounter1 + countUnvisitedNeighbours(element2[0], element2[1])
                    } 

                    for (let index = 0; index < tieBreak2.length; ++index) {
                        const element2 = tieBreak2[index]
                        //console.log(countUnvisitedNeighbours(moveTest))
                        //console.log(countUnvisitedNeighbours(element2[0], element2[1]))
                        moveCounter2 = moveCounter2 + countUnvisitedNeighbours(element2[0], element2[1])
                    } 


                    if(moveCounter1 > moveCounter2){
                        console.log("BIGGER")
                        tempMoveHolder = moves[0]
                        moves[0] = moves[i]
                        moves[i] = tempMoveHolder
                    }

                    //console.log(moveCounter1)
                    //console.log(moveCounter2)

                    }                   
                }
            }

*/

        knightPositions.push([x, y]); //adds knight position to array
        
        [nextX, nextY] = moves[0]; //choose the next move

        //If moving to dead end, choose next best move
        if (countUnvisitedNeighbours(nextX, nextY) == 0 && moves.length != 1){
            [nextX, nextY] = moves[1];
        }

        cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
        
        moveCount++;
        step++;

        cells[x][y].textContent = moveCount;

        //console.log([x,y]);

        [x, y] = [nextX, nextY];

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

        [previousX, previousY] = knightPositions.pop(); //get previous position

        cells[previousX][previousY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';

        [x, y] = [previousX, previousY];
    }

    //function for knight to finish tour
    return function finishTour(){
        while (step < boardSize * boardSize) { //repeats next step code until done
            const moves = findMoves(x, y);
            moves.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));
            
            /*
            if(moves.length !== 1 && moves[0].countUnvisitedNeighbours == moves[1].countUnvisitedNeighbours){

                for(let i = 0; i < moves.length; i++){
                    const target = moves[0].countUnvisitedNeighbours
    
                    if (moves[i].countUnvisitedNeighbours == target){
                        //console.log("True")
                        [tieBreakAX, tieBreakAY] = moves[0];
                        [tieBreakBX, tieBreakBY] = moves[i];
    
                        const tieBreak1 = findMoves(tieBreakAX, tieBreakAY);
                        const tieBreak2 = findMoves(tieBreakBX, tieBreakBY);
    
                        tieBreak1.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));
                        tieBreak2.sort((a, b) => countUnvisitedNeighbours(a[0], a[1]) - countUnvisitedNeighbours(b[0], b[1]));
    
    
                        //console.log(countUnvisitedNeighbours(tempMoves[0]))
    
                        var moveCounter1 = 0
                        var moveCounter2 = 0
    
                        for (let index = 0; index < tieBreak1.length; ++index) {
                            const element2 = tieBreak1[index]
                            //console.log(countUnvisitedNeighbours(moveTest))
                            //console.log(countUnvisitedNeighbours(element2[0], element2[1]))
                            moveCounter1 = moveCounter1 + countUnvisitedNeighbours(element2[0], element2[1])
                        } 
    
                        for (let index = 0; index < tieBreak2.length; ++index) {
                            const element2 = tieBreak2[index]
                            //console.log(countUnvisitedNeighbours(moveTest))
                            //console.log(countUnvisitedNeighbours(element2[0], element2[1]))
                            moveCounter2 = moveCounter2 + countUnvisitedNeighbours(element2[0], element2[1])
                        } 
    
    
                        if(moveCounter1 > moveCounter2){
                            console.log("BIGGER")
                            tempMoveHolder = moves[0]
                            moves[0] = moves[i]
                            moves[i] = tempMoveHolder
                        }
    
                        //console.log(moveCounter1)
                        //console.log(moveCounter2)
    
                        }                   
                    }
                }
*/

            knightPositions.push([x, y]); //adds knight position to array

            if (x == startX && y == startY){ //pop start position off when using next button
                knightPositions.pop()
            }
            
             //dead end so backtrack.
            if (moves.length === 0) {
                break;
            }
            
            //choose the next move.
            [nextX, nextY] = moves[0];
            
            //If moving to dead end, choose next best move
            if (countUnvisitedNeighbours(nextX, nextY) == 0 && moves.length != 1){
                [nextX, nextY] = moves[1];
            }

            cells[nextX][nextY].innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" id="knight">';
           
            moveCount++;
            step++;

            cells[x][y].textContent = moveCount;

            [x, y] = [nextX, nextY];

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
        //console.log("Running finishTour function:")
        //console.log("Knight positions array:")
        //console.log(knightPositions)
    }

    // Function to find the next possible moves and the count of their unvisited neighbours
    function findNextMoves(){
        const moves = findMoves(x, y); // Uses findMoves function to find all possible moves from location
        
        for (let index=0; index < moves.length; ++index){ // Iterates through all possible moves
            const element = moves[index]
            cells[element[0]][element[1]].classList.add("visited"); // Makes movable cells orange (easier to see)
            cells[element[0]][element[1]].textContent = countUnvisitedNeighbours(element[0],element[1]);
            // ^ Displays number of unvisited neighbors onto movable cells ^
        }
    }    
}

//all possible moves a knight piece can make, as coordinates (L shape)
let knightMoves = [[2, 1],[1, 2],[-2, -1],[-1, -2],[2, -1],[1, -2],[-2, 1],[-1, 2]];

function findMoves(x, y) {
    const moves = []; //initialiazes empty array
    for (const [dx, dy] of knightMoves) { //loops through all knight moves
        const newX = x + dx; //stores x coordinate of future position
        const newY = y + dy; //stores y coordinate of future position
        //if next move is inside board size and has not been visited before, push to array
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !cells[newX][newY].classList.contains("visited")) {
            moves.push([newX, newY]);
        }
    }
    return moves;
}

function countUnvisitedNeighbours(x, y) {
    let countNeighbours = 0; //initialiazes count variable
    for (const [dx, dy] of knightMoves) { //loops through all knight moves
        const newX = x + dx; //stores x coordinate of future position
        const newY = y + dy; //stores y coordinate of future position
        //if next move is inside board size and has not been visited before, increase count
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !cells[newX][newY].classList.contains("visited")) {
            countNeighbours++;
        }
    }
    return countNeighbours;
}

function calculateSuccess(){
    var tourSuccess = 0;
    var completeTour = 0;
    var incompleteTour = 0;
    var timeTakenTotal = 0;
    for (let r = 0; r < boardSize; r++) { // Iterates through every position avaliable
        for (let c = 0; c < boardSize; c++) {
            var startTime = performance.now() //Starts timer for function
            startTour(r, c)(); // Run start tour function to place knight at first position, run finishTour() to finish tour
            var endTime = performance.now() //Ends timer for function
            timeTaken = endTime - startTime // Assigns time taken to variable
            console.log("Tour from position (" + r + ",", c + "): " + (timeTaken) + " milliseconds") //Prints times in console
            timeTakenTotal = timeTakenTotal + timeTaken;

            var visitedCells = document.getElementsByClassName("visited") // Visited cells can be counted by counting how many are in the class
            tourSuccess += (visitedCells.length)

            if (visitedCells.length == boardSize*boardSize){ // If all cells are visited, success
                completeTour++; // Counter for when knight completes tour
            }
            else{ // If not all cells are visited, fail
                incompleteTour++; // Counter for when knight fails tour
            }
        }
    }

    //Print test results for completing tour
    console.log("Completed tour count vs uncomplete tour count: " + completeTour + "/" + incompleteTour)
    console.log("Percentage of chance to complete tour: " + (completeTour / (boardSize*boardSize)) * 100 + "%")

    //Print test results for board coverage
    console.log("Average visisted squares: " + tourSuccess / (boardSize*boardSize) + "/" + boardSize*boardSize)
    console.log("Board coverage %: " + ((tourSuccess / (boardSize*boardSize)) * 100) / (boardSize*boardSize) + "%")

    //console.log("Average time taken to complete tour: " + (timeTakenTotal / (boardSize*boardSize)) + "ms")
}

calculateSuccess();
