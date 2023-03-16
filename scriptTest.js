/*var c=document.getElementById("chessBoard");
var ctx=c.getContext("2d");

for(i=0;i<8;i++)
{for(j=0;j<8;j++)
{ctx.moveTo(0,70*j);
ctx.lineTo(560,70*j);
ctx.stroke();

ctx.moveTo(70*i,0);
ctx.lineTo(70*i,560);
ctx.stroke();
var left = 0;
for(var a=0;a<8;a++) {
    for(var b=0; b<8;b+=2) {
      startX = b * 70;
      if(a%2==0) startX = (b+1) * 70;
      ctx.fillRect(startX + left,(a*70) ,70,70);
	}}
}}
*/

/*  
// Javascript program for Knight Tour problem
let N = 8;
  
// A utility function to check if i,j are
// valid indexes for N*N chessboard 
function isSafe(x, y, sol)
{
    return(x >= 0 && x < N && y >= 0 && 
            y < N && sol[x][y] == -1);
}
  
// A utility function to print solution
// matrix sol[N][N] 
function printSolution(sol)
{
    for(let x = 0; x < N; x++) 
    {
        for(let y = 0; y < N; y++)
            document.write(sol[x][y] + " ");
              
        document.write("<br/>");
    }
}
  
// This function solves the Knight Tour problem
// using Backtracking.  This  function mainly
// uses solveKTUtil() to solve the problem. It
// returns false if no complete tour is possible,
// otherwise return true and prints the tour.
// Please note that there may be more than one
// solutions, this function prints one of the
// feasible solutions.  
function solveKT()
{
    let sol = new Array(8);
    for(var i = 0; i < sol.length; i++)
    {
        sol[i] = new Array(2);
    }
  
    // Initialization of solution matrix 
    for(let x = 0; x < N; x++)
        for(let y = 0; y < N; y++)
            sol[x][y] = -1;
  
    // xMove[] and yMove[] define next move of Knight.
    // xMove[] is for next value of x coordinate
    // yMove[] is for next value of y coordinate 
    let xMove = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
    let yMove = [ 1, 2, 2, 1, -1, -2, -2, -1 ];
  
    // Since the Knight is initially at the first block
    sol[0][0] = 0;
  
    // Start from 0,0 and explore all tours using
    // solveKTUtil() 
    if (!solveKTUtil(0, 0, 1, sol, xMove, yMove))
    {
        document.write("Solution does not exist");
        return false;
    }
    else
        printSolution(sol);
  
    return true;
}
  
// A recursive utility function to solve Knight
// Tour problem 
function solveKTUtil(x, y, movei, sol, xMove, yMove)
{
    let k, next_x, next_y;
    if (movei == N * N)
        return true;
  
    // Try all next moves from the 
    // current coordinate x, y 
    for(k = 0; k < 8; k++) 
    {
        next_x = x + xMove[k];
        next_y = y + yMove[k];
          
        if (isSafe(next_x, next_y, sol)) 
        {
            sol[next_x][next_y] = movei;
            if (solveKTUtil(next_x, next_y, movei + 1,
                            sol, xMove, yMove))
                return true;
            else
                sol[next_x][next_y] = -1; // backtracking
        }
    }
    return false;
}
  
// Driver code
  
// Function Call
solveKT();
  
// This code is contributed by target_2
*/

/**
 * Solve the Knight's Tour problem given starting coordinates.
 
const solve = ([x, y], moveNumber = 0) => {
  if (!isValid([x, y])) {
    throw new Error(`The starting position x:${x} and y:${y} is invalid`);
  }

  board[x][y] = moveNumber;
  if (moveNumber + 1 === SIZE * SIZE) {
    return true;
  }
  const sortedMoves = getValidMoves([x, y]).sort(
    (a, b) => getValidMoves(a).length - getValidMoves(b).length
  );
  for (const [toX, toY] of sortedMoves) {
    if (solve([toX, toY], moveNumber + 1)) {
      return true;
    }
    board[toX][toY] = -1;
  }
  return false;
};

let successes = 0;
let failures = 0;
for (startX = 0; startX < 8; startX++) {
  for (startY = 0; startY < 8; startY++) {
    resetBoard();
    const success = solve([startX, startY]);
    if (success) {
      successes = successes + 1;
    } else {
      failures = failures + 1;
    }
    renderBoard(board);
  }
}

console.log("Successes", successes);
console.log("Failures", failures);
*/





/*
// function to solve the knight's tour problem
function knightsTour(size) {
  // create the chessboard
  let board = new Array(size);
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size).fill(0);
  }

  // helper function to check if a move is valid
  function isMoveValid(x, y) {
    return (x >= 0 && x < size && y >= 0 && y < size && board[x][y] == 0);
  }

  // recursive function to move the knight
  function moveKnight(x, y, move) {
    board[x][y] = move;

    // if all squares are visited, the problem is solved
    if (move == size * size) {
      return true;
    }

    // possible moves for a knight
    let dx = [2, 1, -1, -2, -2, -1, 1, 2];
    let dy = [1, 2, 2, 1, -1, -2, -2, -1];

    // try all possible moves
    for (let i = 0; i < 8; i++) {
      let nextX = x + dx[i];
      let nextY = y + dy[i];
      if (isMoveValid(nextX, nextY)) {
        if (moveKnight(nextX, nextY, move+1)) {
          return true;
        }
      }
    }

    // backtrack if no solution is found
    board[x][y] = 0;
    return false;
  }

  // start at position (0,0)
  moveKnight(0, 0, 1);

  // print the solution
  console.log(board);
}

// solve the knight's tour problem for a 6x6 board
knightsTour(6);
*/


var canvas = document.getElementById("chessboard");
		var ctx = canvas.getContext("2d");

		// set the size of each square and the number of squares on the board
		var squareSize = canvas.width / 8;
		var numSquares = 8;

		// loop through each row and column of the board
		for (var row = 0; row < numSquares; row++) {
			for (var col = 0; col < numSquares; col++) {
				// calculate the x and y positions of the current square
				var x = col * squareSize;
				var y = row * squareSize;

				// draw the square
				if ((row + col) % 2 == 0) {
					ctx.fillStyle = "#fff";
				} else {
					ctx.fillStyle = "#666";
				}
				ctx.fillRect(x, y, squareSize, squareSize);
			}
		}