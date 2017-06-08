// Define Hand class.
function Hand() {
	'use strict';

	// Hand is a type of card set.
	Set.call(this);

	this.spreadAngle = 10;
  this.selectedCards = new Set();

}

Hand.prototype = Object.create(Set.prototype);
Hand.prototype.constructor = Hand;

// Add get valid moves method.
Hand.prototype.getValidMoves = function(){

	// Define move variables.
	var currentPlayer = game.players[game.currentPlayer];
	var currentCard = null;
	var targetPlayer = null;
	var targetStack = null;

	// Define array to hold valid moves for this hand.
	var validMoves = [];

	// get the number of cards in this hand.
	var cardCount = this.getCardCount();

	// Loop through the hand's cards.
	for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

		// Set current card to this card.
		currentCard = this.cards[cardIndex];

		// Define number of players.
		var playerCount = game.settings.playerCount;

		// Define number of active stacks.
		var activeStackCount = 0;

		// Loop through players.
		for (var playerIndex = 0; playerIndex < playerCount; playerIndex++) {

			// Set target player to this player.
			targetPlayer = game.players[playerIndex];

			// Define number of stacks for this player.
			var stackCount = game.players[playerIndex].stacks.length;

			// Loop through player's stacks.
			for (var stackIndex = 0; stackIndex < stackCount; stackIndex++) {

				// Set target stack to this stack.
				targetStack = game.players[playerIndex].stacks[stackIndex];

				// If this stack is not locked.
				if (game.players[playerIndex].stacks[stackIndex].locked === false) {

					// Increment activeStackCount.
					activeStackCount++;

					// If this card is a joker...
					if (currentCard.rankID == 15) {

						// Killing this stack is a valid move.
						validMoves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

					}
					
					// Else, if this card is an ace...
					else if (currentCard.rankID == 14) {

						// Taking/Adding to this stack is a valid move.
						validMoves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

					}
					
					// Else, if this card is a two...
					else if (currentCard.rankID == 2) {

						// If the target stack has only 1 card...
						if (targetStack.getCardCount() === 1) {

							// Taking/Adding to this stack is a valid move.
							validMoves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

						}

					}

					// Else, this card has no special action.
					else {

						// Get the target stack's top card.
						var topCard = targetStack.cards[targetStack.cards.length - 1];

						// If the top card's rank is less than that of the current card...
						if (topCard.getRankID() < currentCard.rankID) {

							// Taking/Adding to this stack is a valid move.
							validMoves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

						}

					}

				}

			}

		}

		// If fewer than 8 stacks are active...
		if (activeStackCount < 8) {

			// If the current card is not a joker...
			if (currentCard.getRankID() < 15) {

				// Creating a new stack is a valid move.
				validMoves.push(new Move(currentPlayer, [currentCard], currentPlayer, null));

				// Get valid pile moves.
				validMoves = validMoves.concat(this.getPileOnMoves(currentPlayer, [currentCard], currentPlayer, null));

			}

		}

		// Discarding is always a valid move.
		validMoves.push(new Move(currentPlayer, [currentCard], null, null));

	}

	return validMoves;

}

// Add get pile on moves method.
Hand.prototype.getPileOnMoves = function(currentPlayer, playedCards, targetPlayer, targetStack){

	// Define array to hold valid moves for this hand.
	var validMoves = [];

	// Get top played card.
	var topCard = playedCards[playedCards.length - 1];

	// Get the next rank for this pile on.
	var nextRank = topCard.getRankID() + 1;

	// If the next rank is less than a joker (15)...
	if (nextRank < 15) {

		// Get the number of cards in this hand.
		var cardCount = this.getCardCount();

		// Loop through cards in player's hand.
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

			// Get card.
			var card = this.cards[cardIndex];

			// Get this card's rank.
			var cardRank = card.getRankID();

			// If the card's rank matches the next rank...
			if (cardRank === nextRank) {

				// Pile on is a valid move.
				validMoves.push(new Move(currentPlayer, playedCards.concat([card]), targetPlayer, targetStack));

				// Get recursive pile on moves.
				validMoves = validMoves.concat(this.getPileOnMoves(currentPlayer, playedCards.concat([card]), targetPlayer, targetStack));

			}

		}

	}

	return validMoves;

}

// Add print hand method.
Hand.prototype.printHand = function(){
	'use strict';
	var text = '';
	var cardCount = this.getCardCount();
	if (cardCount) {
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			text += cardIndex + '. ';
			text += this.cards[cardIndex].getName();
			text += '\n';
		}
	} else {
		text += '- No cards' + '\n';
	}
	return text;
}
