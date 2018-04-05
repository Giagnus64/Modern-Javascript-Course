/*
GAME FUNCTION
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lost
- Let Player choose to play again
*/

//Game Vars
let min = 1, 
	max = 10,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
	  minNum = document.querySelector('.min-num'),
	  maxNum = document.querySelector('.max-num'),
	  guessBtn = document.querySelector('#guess-btn'),
	  guessInput = document.querySelector('#guess-input'),
	  message = document.querySelector('.message');

//Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value);

//PlayAgain event listener
game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}

});

//Validate Input
	if(isNaN(guess) || guess < min || guess > max){
		setMessage(`Please enter a number between ${min} and ${max}.`, 'red')
	}

	//Check if won
	if (guess === winningNum){
		gameOver(true, `Congrats! ${winningNum} is correct!`)
	} else{
		guessesLeft -= 1;

		if (guessesLeft === 0){
			//Game over - lost
			gameOver(false, `Sorry, the winning number was ${winningNum}.`)
		} else{
			//Game continues
			setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red')
			guessInput.style.borderColor = 'red';
			guessInput.value = '';
		}
	}
});

//Game Over Function
function gameOver(won, msg){
	let color;
	won === true ? color = 'green' : color = 'red';
	//Game over - lost
			guessInput.disabled = true;
			guessInput.style.borderColor = color;
			setMessage(msg, color)

	//Play Again
	guessBtn.value = 'Play Again';
	guessBtn.className = 'play-again';
}

// Get winning number function
function getRandomNum(min, max){
	return Math.floor(Math.random()*(max-min + 1) + min);
}
//Set Message
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}