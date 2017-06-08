// Define Player class.
function Player(name, avatar) {

	'use strict';

	this.name = name;
  this.avatar = avatar;
	this.hand = new Hand();
	this.stacks = [];
	this.turn = {};

}

Player.prototype = {

	startTurn: function() {
		'use strict';

// Clear log.
//console.clear();

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

console.log(this.name.toUpperCase() + '\'S MOVES' + '\n' + this.printMoves());

this.hand.drawHand();

/*

			// If moves are available...
			if (this.turn.moves.length > 0) {

				//this.takeTurn(0);

				// Prompt user to pick a move.
				var moveIndex = prompt('What move?','');

				if (moveIndex) {

					this.takeTurn(moveIndex);

				} else {

					this.takeTurn(0);

				}

			} else {

				//next();

			}

*/

		}

	},

	takeTurn: function(moveIndex) {
		'use strict';

		if (!isNaN(moveIndex)) {

console.log('CHOSEN MOVE \n %c' + this.turn.moves[moveIndex].printMove() + '\n \n', 'color: red;');

			// Execute move.
			this.turn.moves[moveIndex].executeMove();

			// Refill player's hand.
			this.fillHand();

			game.startNextTurn();

		} else {

			// Prompt user to pick a move.
			var moveIndex = prompt('What move?','');

			this.takeTurn(moveIndex);

		}

	},


	fillHand: function() {
		'use strict';

		// Define how many cards the player needs.
		var cardsNeeded = game.settings.handSize - this.hand.getCardCount();

		// For every card the player needs...
		while (cardsNeeded) {

			// Draw card from deck and add to hand.
			var drawnCard = game.deck.drawCard();

			// If drawn card is not undefined...
			if (drawnCard !== undefined) {
      	this.hand.cards.push(drawnCard);
			}

			// Decrement cards needed count.
			cardsNeeded--;

		}

	},

	getStackCount: function() {
		'use strict';

		// Get stack count.
		var stackCount = this.stacks.length;;

		return stackCount;

	},

	getScore: function() {
		'use strict';
		var stackCount = this.getStackCount();
		var score = 0;

		// Loop through player's stacks.
		for (var stackIndex = 0; stackIndex < stackCount; stackIndex++) {
			score = score + this.stacks[stackIndex].getTotalValue();
		}

		return score;

	},

	printMoves: function() {
		'use strict';
		var text = '';
		var moveCount = this.turn.moves.length;
		if (moveCount) {
			for (var moveIndex = 0; moveIndex < moveCount; moveIndex++) {
				text += moveIndex + '. ';
				text += this.turn.moves[moveIndex].printMove();
				text += '\n';
			}
		} else {
			text += '- No moves';
		}
		return text;
	},

	
};