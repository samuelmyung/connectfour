"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)
const htmlBoard = document.getElementById("board");


/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// Could change parameters later
function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  // Use a nested for loop to make the board
  // Outside for loop being the height
  // Keep using y and x for loops
  for (let y = 0; y < HEIGHT; y++) {
    // Row would be better name, simpler
    const row = [];
    // Nested loop being the width
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

/*
fill missing comments, line 45, 49
create DOM elements => rowElement, tableCellElements using for loops
add IDs to rowElement, tableCellElements id = c-y-x
append table cell elements to table row, append to our html board
stick to indexing starting at 0
*/

function makeHtmlBoard() {
  // create top table row element, give id of column top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // creating table data for WIDTH, give each td top-x position, add click listener to td for the user to click on
  // which column they want to place their piece
  // append headcell to top table row

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }

  // appending toptable row to html board

  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row

  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    let row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable

      // add an id, c-y-x, to the table cell element
      //   (for example, for the cell at y=2, x=3, the ID should be "c-2-3")
      let cell = document.createElement('td');
      cell.setAttribute('id', `c-${y}-${x}`);


      // append the table cell to the table row
      row.append(cell);

    }

    // append the row to the html board
    htmlBoard.append(row);

  }
}

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

function findSpotForCol(x) {
  // write the real version of this, rather than always returning 5
  // Iterate through the board using a for loop
  // Possibly need to change variable name
  // Start from the last array
  for (let y = HEIGHT - 1; y >= 0; y--) {
    // In each array, access each specific cell data
    // Within the for loop if we access a null value
    if (board[y][x] === null) {
      // Return y coordinate
      // board[y][x] = currPlayer;
      return y;
    }
  }
  // Return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Make a div and insert into correct table cell
  // Declare variable cell for td cell
  const cell = document.getElementById(`c-${y}-${x}`);
  // Make a div element
  const piece = document.createElement("div");
  // add to class list, the piece class and a current player class
  piece.classList.add("piece");
  if (currPlayer === 1) {
    piece.classList.add("p1");
  } else {
    piece.classList.add("p2");
  }
  cell.append(piece);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */


function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * is this subarray within our bounds, do all cells match values if so return true
   *  [ [6, 9], [3, 4], [5, 5], [4, 3] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */

  // statement that checks, if this value is undefined, then not legal
  // if all 4 indexes have the same value, this is a winner

  function _win(cells) { //  cells = [ [6, 9], [3, 4], [5, 5], [4, 3] ]

    // TODO: Check four cells to see if they're all legal & all color of current
    // player


    // for (let i = 0; i < cells.length; i++) { // for of

    //   y = cells[i][0];
    //   x = cells[i][1];

    //   if (board[y][x] === undefined) { // legal
    //     return false;
    //   }
    // }
    for (let cell of cells) {
      let y = cell[0];
      let x = cell[1];

      if (y > HEIGHT || x > WIDTH) { // legal bounds
        return false;
      }

      if (board[y][x] !== currPlayer) {
        return false;
      }
    }
    debugger;

    return true;

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [x + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // TODO: add line to update global `board` variable with new piece
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled

  // TODO: check if all cells in board are filled; if so, call endGame
  if(board.every(row => !(row.includes(null)))) {
    endGame();
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();