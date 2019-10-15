var numberOfSquares = 6;
var pickedColor;
var colors = []

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var header = document.getElementById("header");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpGame();
    reset();
}

resetButton.addEventListener("click", function(){
    reset();
});


function reset(){
    //generate and pick the colors
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    //display the squares depending on mode
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i]; 
        }
        else{
            squares[i].style.display= "none";
        }
    }
    header.style.background = "steelblue";

}

function setUpModeButtons(){
    //check listener for easy or hard mode
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            for(var i = 0; i < modeButtons.length; i++){
                modeButtons[i].classList.remove("selected");
            }
        
            this.classList.add("selected");
            this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
        
            reset();
        });
    }
}

function setUpGame(){
    //set up colors of the squares
    for(var i = 0; i < squares.length; i++){
        //add initial colors
        squares[i].style.backgroundColor = colors[i]
    
        //click listners to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
    
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                header.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            }
            else{
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function changeColors(color){
    //check color of ssquare
    for(var i = 0; i < squares.length; i++){
        squares[i].style.background = color;
    }
}

function pickColor(){
    //pick random color of length of the color array
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){

    //generate random colors and push it into an array
    var arr = []

    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }

    return arr;
}

function randomColor(){
    //create randomized rgb
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}