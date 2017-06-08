// Define Turn class.
function Turn() {

	'use strict';

	this.moves = [];
	this.selectedCards = [];

}

// Add get valid moves method.
Turn.prototype.getValidMoves = function(selectedCards, exactMatchesOnly){
	'use strict';

	// Reset valid moves array.
	this.moves = [];

	// Define move variables.
	var currentPlayer = game.players[game.currentPlayer];
	var currentHand = selectedCards || game.players[game.currentPlayer].hand;
	var currentCard = null;
	var targetPlayer = null;
	var targetStack = null;
	var playerCount = game.settings.playerCount;
	var activeStackCount = 0;

	// Define sort by score function.
	function sortByScore(a,b) {
		if (a.score < b.score) {
			return 1;
		} else if (a.score > b.score) {
			return -1;
		} else {
			return 0;
		}
	}

	// get the number of cards in current player's hand.
	var cardCount = currentHand.getCardCount();

	// Loop through current player's hand's cards.
	for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

		// Set current card to this card.
		currentCard = currentHand.cards[cardIndex];

		// Reset active stack count.
		activeStackCount = 0;

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
					if (currentCard.rankID === 15) {

						// Killing this stack is a valid move.
						this.moves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

						// Get valid pile moves.
						this.getPileOnMoves(currentPlayer, [currentCard], targetPlayer, targetStack);

					}

					// Else, if this card is an ace...
					else if (currentCard.rankID === 14) {

						// Taking/Adding to this stack is a valid move.
						this.moves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

						// Get valid pile moves.
						this.getPileOnMoves(currentPlayer, [currentCard], targetPlayer, targetStack);

					}

					// Else, if this card is a two...
					else if (currentCard.rankID === 2) {

						// If the target stack has only 1 card...
						if (targetStack.getCardCount() === 1) {

							// Taking/Adding to this stack is a valid move.
							this.moves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

							// Get valid pile moves.
							this.getPileOnMoves(currentPlayer, [currentCard], targetPlayer, targetStack);

						}

					}

					// Else, this card has no special action.
					else {

						// Get the target stack's top card.
						var topCard = targetStack.cards[targetStack.cards.length - 1];

						// If the top card's rank is less than that of the current card...
						if (topCard.getRankID() < currentCard.rankID) {

							// Taking/Adding to this stack is a valid move.
							this.moves.push(new Move(currentPlayer, [currentCard], targetPlayer, targetStack));

							// Get valid pile moves.
							this.getPileOnMoves(currentPlayer, [currentCard], targetPlayer, targetStack);

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
				this.moves.push(new Move(currentPlayer, [currentCard], currentPlayer, null));

				// Get valid pile moves.
				this.getPileOnMoves(currentPlayer, [currentCard], currentPlayer, null);

			}

		}

		// Discarding is always a valid move.
		this.moves.push(new Move(currentPlayer, [currentCard], null, null));

	}

	// Sort moves by score.
	this.moves.sort(sortByScore);	

	// If only exact matches should be returned...
	if (exactMatchesOnly === true) {

		// Get move count.
		var moveCount = this.moves.length;

		// Loop through moves.
		for (var moveIndex = moveCount - 1; moveIndex >= 0; moveIndex--) {

			// If this move doesn't use the cards played...
			if (!this.moves[moveIndex].playedCards.matchesSet(selectedCards)){
				// Remove this move.
				this.moves.splice(moveIndex, 1);
			}

		}

	}

};

// Add get pile on moves method.
Turn.prototype.getPileOnMoves = function(currentPlayer, playedCards, targetPlayer, targetStack) {
	'use strict';

	// Define current hand.
	var currentHand = currentPlayer.hand;

	// Get top played card.
	var topCard = playedCards[playedCards.length - 1];

	// Get the next rank for this pile on.
	var nextRank = topCard.getRankID() + 1;

	// If the next rank is less than a joker (15)...
	if (nextRank < 15) {

		// Get the number of cards in this hand.
		var cardCount = currentHand.getCardCount();

		// Loop through cards in player's hand.
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

			// Get card.
			var card = currentHand.cards[cardIndex];

			// Get this card's rank.
			var cardRank = card.getRankID();

			// If the card's rank matches the next rank...
			if (cardRank === nextRank) {

				// Pile on is a valid move.
				this.moves.push(new Move(currentPlayer, playedCards.concat([card]), targetPlayer, targetStack));

				// Get recursive pile on moves.
				this.getPileOnMoves(currentPlayer, playedCards.concat([card]), targetPlayer, targetStack);

			}

		}

	}

}

// Add reject bad moves method.
Turn.prototype.rejectBadMoves = function() {
	'use strict';

	var moveCount = this.moves.length;
	var discardMoves = [];

	// Retrieve discard moves.
	discardMoves = this.moves.filter(function( move ) {
		return move.targetPlayer === null;
	});
	
	// If there is at least one non-discard move...
	if (moveCount !== discardMoves.length) {

		// Reject all discard moves.
		this.moves = this.moves.filter(function(move){
			return discardMoves.indexOf(move) === -1;
		});

	}

	// Update move count.
	moveCount = this.moves.length;

	// Loop through moves.
	for (var moveIndex = moveCount - 1; moveIndex >= 0; moveIndex--) {

		// If there is still more than 1 move left...
		if (this.moves.length > 1) {

			// If this move is a pile on...
			if (this.moves[moveIndex].playedCards.getCardCount() > 1) {

				// If the number of cards in this pile on exceeds the cards remaining in the deck...
				if (this.moves[moveIndex].playedCards.getCardCount() > game.deck.getCardCount()) {

					// Reject this move.
					this.moves.splice(moveIndex, 1);

				}

				// Else, If this move is not a full court...
				else if (this.moves[moveIndex].playedCards.hasFullCourt() === false) {

					// If the top card in this pile has a rank that is too high...
					if (this.moves[moveIndex].playedCards.getCard(this.moves[moveIndex].playedCards.getCardCount() - 1).getRankID() > 7) {

						// Reject this move.
						this.moves.splice(moveIndex, 1);

					}

				}

			}

		}

	}

};


/*
// Get filterd moves method.
Turn.prototype.getValidMovesWithCards = function(cards){

	// Get move count.
	var moveCount = this.moves.length;

}

	// Get move count.
	var moveCount = this.moves.length;

	// Get played card count.
	var selectedCardCount = selectedCards.length;

	// Get a copy of moves to return.
	var filteredMoves = this.moves.slice(0);

var keepMove = true;

	// Loop through moves.
	for (var moveIndex = 0; moveIndex < moveCount; moveIndex++) {

// Assume remove will be kept.
keepMove = true;

		// Loop through played cards.
		for (var selectedCardIndex = 0; selectedCardIndex < selectedCardCount; selectedCardIndex++) {

			// Get the index, if any, of the card used in this move.
			cardIndex = this.moves[moveIndex].playedCards.cards.indexOf(selectedCards[selectedCardIndex]);

			// If the move does not use the current selected card...
			if (cardIndex === -1) {

keepMove = false;

			}

		}

		// If move is set to be removed...
		if (keepMove === false) {
			// Remove this move from the list of filtered moves.
			filteredMoves.splice(moveIndex, 1);
		}

	}

	console.log(filteredMoves);
*/