// Define Game class
function Game(settings) {

	'use strict';

	this.settings = {
		handSize: 5,
		stackLimit: 8,
		playerCount: 2,
		deckCount: 1
	};
	this.currentPlayer = 1;
	this.players = [];
	this.deck = {};

}

Game.prototype = {

	prepareGame:function (settings) {
		'use strict';

		// Instantiate deck.
		this.deck = new Deck();

		// Get number of players from game settings.
		var playerCount = settings.players.length;

		// Update settings.
		this.settings.handSize = settings.handSize;
		this.settings.stackLimit = settings.stackLimit;
		this.settings.playerCount = playerCount;

		// If more than 4 players are playing...
		if (playerCount > 4) {

			// Play with 2 decks.
			this.settings.deckCount = 2;

		}

		// Build deck.
		this.deck.buildDeck();

		// Loop through players.
		for (var playerIndex = 0; playerIndex < playerCount; playerIndex++) {

			// If the player is a computer...
			if (settings.players[playerIndex].computer) {

				// Instantiate computer player.
				this.players.push(new Computer(
					settings.players[playerIndex].name,
          settings.players[playerIndex].avatar,
					settings.players[playerIndex].personality,
					settings.players[playerIndex].bonuses,
					settings.players[playerIndex].penalties,
					settings.players[playerIndex].thresholds
				));

			} else {

				// Instantiate player.
				this.players.push(new Player(
					settings.players[playerIndex].name,
          settings.players[playerIndex].avatar
				));

			}

			// Define player attributes.
			var attributes = {
				transform: 'translate(0, ' + (10 + (310 * playerIndex)) + ')',
        id: 'player-' + playerIndex
			}

			// Draw player.
			this.players[playerIndex].drawPlayer('#stage', attributes, playerIndex);

		}

		// Loop through players.
		for (var playerIndex = 0; playerIndex < playerCount; playerIndex++) {

			// Deal cards to player.
			this.players[playerIndex].fillHand();

		}

	},

	startGame:function () {
		'use strict';

		// Randomly select a starting player.
		this.currentPlayer = Math.floor(Math.random() * game.settings.playerCount) + 1;

		// Start first player's turn
		this.startNextTurn();

	},

	startNextTurn:function () {
		'use strict';

		// If current player is not the last player...
		if (this.currentPlayer < this.players.length - 1) {

			// Increment current player.
			this.currentPlayer++;

		} else {

			// Set the first player as the current player.
			this.currentPlayer = 0;

		}

		// Start next player's turn
		this.players[this.currentPlayer].startTurn();

	},

	getWinningPlayer: function() {
		'use strict';
		var winningPlayer = {};
		var topScore = 0;
		// Loop through players.
		for (var playerIndex = 0; playerIndex < game.settings.playerCount; playerIndex++) {
			// If player's score is higher than the top score...
			if (game.players[playerIndex].getScore() > topScore) {
				// Note this player as the winning player.
				winningPlayer = game.players[playerIndex];
				// Note new top score.
				topScore = game.players[playerIndex].getScore();
			}
		}
		return winningPlayer;
	},

	isGameOver: function() {
		'use strict';
		// Define variable to check for game over status.
		var gameOver = true;
		// Loop through players.
		for (var playerCount = 0; playerCount < this.settings.playerCount; playerCount++) {
			// If player's hand contains cards...
			if (this.players[playerCount].hand.getCardCount()) {
				// Game should continue.
				gameOver = false;
			}
		}
		return gameOver;
	},

	endGame: function() {
		'use strict';
		console.log('COMPLETE!');
	},

	printStacks: function() {
		'use strict';
		var text = '';
		var totalStackndex = 0;
		// Loop through players.
		for (var playerIndex = 0; playerIndex < this.settings.playerCount; playerIndex++) {
			// Get number of stacks.
			var stackCount = this.players[playerIndex].stacks.length;
			for (var stackIndex = 0; stackIndex < stackCount; stackIndex++) {
				text += totalStackndex + '. ' + this.players[playerIndex].name.toUpperCase() + ' has a [' + this.players[playerIndex].stacks[stackIndex].printStack() + ']';
				if (this.players[playerIndex].stacks[stackIndex].locked) {
					text += ' (LOCKED)';
				}
				text += '\n';
				totalStackndex++;
			}
		}
		return text;
	},

	printGameScore: function() {
		'use strict';
		var text = '';
		var playerCount = this.players.length
		// Loop through players.
		for (var playerIndex = 0; playerIndex < playerCount; playerIndex++) {
			text += this.players[playerIndex].name + ': ';
			text += this.players[playerIndex].getScore()  + '\n';
		}
		return text;
	}

}