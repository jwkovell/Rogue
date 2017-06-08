// Define Deck class.
function Computer(name, avatar, personality, bonuses, penalties, thresholds) {

	'use strict';

	// Computer is a type of player.
	Player.call(this);

	this.name = name;
  this.avatar = avatar;
	this.personality = personality;
	this.bonuses = bonuses;
	this.penalties = penalties;
	this.thresholds = thresholds;

}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

// Edit start turn method.
Computer.prototype.startTurn = function(){
	'use strict';

	// If game is over...
	if (game.isGameOver()) {

		// End game.
		game.endGame();

	}

  // Else, continue the game.
  else {

console.log('START ' + this.name.toUpperCase() + '\'S TURN');
console.log('CARDS LEFT IN DECK: ' + game.deck.getCardCount());

		// Start a new turn object.
		this.turn = new Turn();

console.log('CARDS IN ' + this.name.toUpperCase() + '\'S HAND \n' + this.hand.printHand());
console.log('CURRENT STACKS \n' + game.printStacks());

		// Get valid moves.
		this.turn.getValidMoves();

		// Reject bad moves.
		this.turn.rejectBadMoves();

		var chosenMove = this.turn.moves[0];

console.log('CHOSEN MOVE \n %c' + chosenMove.printMove() + '\n \n', 'color: red;');

		// Execute move.
		chosenMove.executeMove();

		// Refill player's hand.
		this.fillHand();

		// Proceed to the next turn.
		game.startNextTurn();

	}

};

// Add choose move method.
Computer.prototype.chooseMove = function(){

	'use strict';

	// Get number of possible moves.
	var moveCount = this.moves.length;

	// If only one move is available...
	if (moveCount === 1) {

		// Return this result
		return this.moves[0];

	} else {

		// Sort moves somehow.

		// Return the first result
		return this.moves[0];

	}

};
