let activePlayer = 'X'; //this variable keeps track of who's turn it is
let selectedSquares = []; //this array stores an array of moves, used to determine win conditions

function placeXOrO(squareNumber) { //function for place X or O in a square
    //condition ensures a square hasn't be selected already
    //the .some()method is used to check each element of selectedSquare array to
    //see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retrieves the html id that was clicked
        let select = document.getElementById(squareNumber);
        //this condition checks who's turn it is
        if (activePlayer === 'X') {
            //if activeplayer is equal to X, the x.png is placed
            select.style.backgroundImage = 'url("images/x.png")';
            //active player may only be X or O so, if not X must be O
        } else {
            //if active player is equal to O, the o.png is placed
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activeplayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for any win conditions
        checkWinConditions();
        //this condition is for changing the active player
        if (activePlayer === 'X') {
            //if active player is X change it to O
            activePlayer = 'O';
            //if active player is anthing other than X
        } else {
            //change the activeplayer to X
            activePlayer = 'X';
        }
        //this function plays placement sound
        Audio('./media/place/mp3');
        //this condition checks to see if it is computers turn
        if (activePlayer === 'O') {
            //this function disables clicking for computer choice
            disableClick();
            //this function waits 1 second before placing the image
            //and enabling click
            setTimeout(function (){ computersTurn(); }, 1000);
        }
        //returning true is needed for our computersTurn function to work
        return true;
    }
        
        //this function results in a random square being selected
        function computersTurn() {
            //this boolean is needed for our while loop
            let success = false;
            //this variable stores a random number 0-8
            let pickASquare;
            //this condition allows our while loop to keep tryinf if a square is selected already
            while(!success) {
                //A random number between 0 and 8 is selected
                pickASquare = String(Math.floor(Math.random() * 9));
                //if the random number evaluates returns true, the square hasnt been selected yet
                if (placeXOrO(pickASquare)) {
                    //this line calls the function
                    placeXOrO(pickASquare);
                    //this changes boolean and ends the loop
                    success = true;
                };
            }
        }
    }

//those function parses the selectedSquares array to search for win conditions
//drawWinline function is called to draw line if condition is met.
function checkWinConditions() {
    // X 0, 1, 2 condition
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100);}
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304);}
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508);}
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558);}
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558);}
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '58')) {drawWinLine(508, 50, 508, 558);}
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90);}
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520);}
    // O 0, 1, 2 condition
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558,304);}
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304);}
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508);}
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558);}
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558);}
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '5O')) {drawWinLine(508, 50, 508, 558);}
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90);}
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520);}
    //This condition checks for tie. if none of the above conditions register
    //and 9 squares are selected, the code executes
    else if (selectedSquares.length >= 9) {
        //This function plays the tie game sound
        Audio('./media/tie.mp3');
        //This function sets a .3 second timer before the resetGame is called
        setTimeout(function () { resetGame();}, 1000);
        //This function checks if an array includes 3 strings
        //It is used to check for each win condition
        function arrayIncludes(squareA, squareB, squareC) {
            //The next 3 variables will be used to check for 3 in a row
            const a = selectedSquares.includes(squareA);
            const b = selectedSquares.includes(squareB);
            const c = selectedSquares.includes(squareC);
            //If the 3 variables we pass are all included in our array true is
            //returned and our else if condition executes the drawWinLine function
            if (a === true && b === true && c === true) {return true; } 
        }
    }
}
    

