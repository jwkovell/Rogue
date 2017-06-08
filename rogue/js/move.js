// Define Move class.
function Move(currentPlayer, playedCards, targetPlayer, targetStack) {

	'use strict';

	this.currentPlayer = currentPlayer;
	this.playedCards = new Set();
	this.targetPlayer = targetPlayer;
	this.targetStack = targetStack;
	this.score = 0;

	// Add cards to played cards.
	this.playedCards.addCard(playedCards);

	// Score move.
	this.scoreMove();

}

Move.prototype = {

	scoreMove: function() {
		'use strict';

		// Reset move score.
		this.score = 0;

		// Define default score modifiers.
		var cautious = 1;
		var clever = 1;
		var evil = 1;
		var greedy = 1;

		// Define default score bonuses.
		var pileOnBonus = 10;
		var fullCourtBonus = 600;
		var smartJestBonus = 100;

		// Define default score penalties.
		var discardPenalty = 50;
		var impatientPlayPenalty = 100;

		// Define default thresholds to use in assessing smart moves.
		var minimumJestTargetValue = 11;
		var minimumFullCourtTargetValue = 6;

		// If this is a computer player...
		if ( this.currentPlayer instanceof Computer ) {

			// Update custom personality score modifiers.
			if ('cautious' in this.currentPlayer.personality) {
				cautious = this.currentPlayer.personality.cautious;
			}
			if ('clever' in this.currentPlayer.personality) {
				clever = this.currentPlayer.personality.clever;
			}
			if ('evil' in this.currentPlayer.personality) {
				evil = this.currentPlayer.personality.evil;
			}
			if ('greedy' in this.currentPlayer.personality) {
				greedy = this.currentPlayer.personality.greedy;
			}

			/*
				// Update custom score bonuses.
				if ('pileOnBonus' in this.currentPlayer.bonuses) {
					pileOnBonus = this.currentPlayer.bonuses.pileOnBonus;
				}
				if ('fullCourtBonus' in this.currentPlayer.bonuses) {
					fullCourtBonus = this.currentPlayer.bonuses.fullCourtBonus;
				}
				if ('smartJestBonus' in this.currentPlayer.bonuses) {
					smartJestBonus = this.currentPlayer.bonuses.smartJestBonus;
				}

				// Update custom score penalties.
				if ('discardPenalty' in this.currentPlayer.penalties) {
					discardPenalty = this.currentPlayer.penalties.discardPenalty;
				}
				if ('impatientPlayPenalty' in this.currentPlayer.penalties) {
					impatientPlayPenalty = this.currentPlayer.penalties.impatientPlayPenalty;
				}

				// Update custom thresholds to use in assessing smart moves.
				if ('minimumJestTargetValue' in this.currentPlayer.thresholds) {
					minimumJestTargetValue = this.currentPlayer.thresholds.minimumJestTargetValue;
				}
			*/

		}

		// Track whether this move is a jest (killing a deck).
		var jest = false;

		// Define the number of played cards.
		var playedCardCount = this.playedCards.getCardCount();

		// Loop through played cards.
		for (var playedCardIndex = 0; playedCardIndex < playedCardCount; playedCardIndex++) {

			// Get card.
			var card = this.playedCards.cards[playedCardIndex];

			// Get card rank.
			var cardRank = card.getRankID();

			// Get card value.
			var cardValue = card.getValue();

			// Subtract the card's rank and value from this move's score.
			this.score = this.score - (cardRank + cardValue) * cautious;

			// If the card is not being discarded...
			if (this.targetPlayer !== null) {

				// Add the benefit of playing this card to this move's score.
				this.score = this.score + cardValue * greedy;

			} else {

				// Subtract the discard penalty from this move's score.
				this.score = this.score - discardPenalty;

			}

			// If the card is a joker...
			if (cardRank === 15) {

				// Note the jest.
				jest = true;

			}

			// If card is a joker...
			if (cardRank === 15) {

				// If player has at least one other card in hand...
				if (this.currentPlayer.hand.getCardCount() > 1) {

					// Subtract the impatient play penalty from this move's score.
					this.score = this.score - impatientPlayPenalty * this.currentPlayer.hand.getCardCount();

				}

			}

			// Else, if card is an ace...
			if (cardRank === 14) {

				// If player has at least two other cards in hand...
				if (this.currentPlayer.hand.getCardCount() > 2) {

					// Subtract the impatient play penalty from this move's score.
					this.score = this.score - impatientPlayPenalty;

				}

			}

			// Else, if card rank is a jack, queen or king...
			else if (cardRank > 10) {

				// If deck is not yet empty...
				if (game.deck.getCardCount() > 0) {

					// Subtract the impatient play penalty from this move's score.
					this.score = this.score - impatientPlayPenalty;

				}

			}

		}

		// If a stack is targeted...
		if (this.targetStack !== null) {

			// If the current player is not the target player...
			if (this.currentPlayer !== this.targetPlayer) {

				// Get total value for the targeted stack.
				var totalStackValue = this.targetStack.getTotalValue();

				// If this is a jest...
				if (jest === true) {

					// If this jest destroys a valuable stack.
					if (totalStackValue > minimumJestTargetValue) {

						// Add the smart jest bonus to this move's score.
						this.score = this.score + smartJestBonus;

					}

				} else {

					// Add the benefit of gaining this stack to this move's score.
					this.score = this.score + totalStackValue * greedy;

				}

				// Add the harm of stealing this stack to this move's score.
				this.score = this.score + totalStackValue * evil;

			}

		}

		// If this is a pile on...
		if (playedCardCount > 1) {

			// If this is a full court...
			if (this.playedCards.hasFullCourt()) {

				// If this is not starting a new stack...
				if (this.targetStack !== null) {

					// If target stack's value is at least the minimum full court target value threshold...
					if (this.targetStack.getTotalValue() >= minimumFullCourtTargetValue) {

						// Add full court bonus to this move's score.
						this.score = this.score + fullCourtBonus;

					}

				}

			}

			// Else, this is a normal pile on.
			else {

				// Add pile on bonus to this move's score.
				this.score = this.score + playedCardCount * pileOnBonus;

			}

		}

	},

	executeMove: function() {

		var playedCardCount = this.playedCards.getCardCount();

		// If move is creating a stack...
		if (this.targetPlayer !== null && this.targetStack === null) {

			// Create new stack.
			this.targetStack = new Stack();

			// Add new stack to current player
			this.currentPlayer.stacks.push(this.targetStack);

		}

		// Reverse played cards array so cards can be reviewed in a reverse loop.
		this.playedCards.cards.reverse();

		// Loop through played cards.
		for (var playedCardIndex = playedCardCount - 1; playedCardIndex >= 0; playedCardIndex--) {

			// Define number of cards in current player's hand.
			var handCardCount = this.currentPlayer.hand.getCardCount();

			// Loop through current player's hand.
			for (var cardIndex = 0; cardIndex < handCardCount; cardIndex++) {

				// If the current played card matches the card in hand.
				if ( this.playedCards.cards[playedCardIndex] === this.currentPlayer.hand.cards[cardIndex]) {

					// If move is a discard...
					if (this.targetPlayer == null) {

						// Discard this card.
						this.currentPlayer.hand.cards.splice(cardIndex, 1);

					}

					// Else, this move is adding to (or creating) a stack...
					else {

						// Add card to the target stack.
						this.targetStack.cards.push(this.currentPlayer.hand.cards.splice(cardIndex, 1)[0]);

					}

				}

			}

		}

		// If a target stack is provided...
		if (this.targetStack !== null) {

			// If the target player is not the current player...
			if (this.targetPlayer !== this.currentPlayer) {

				// Loop through players.
				for (var playerIndex = 0; playerIndex < game.settings.playerCount; playerIndex++) {

					// Get stack count for this player.
					var stackCount = game.players[playerIndex].getStackCount();

					// Loop through this player's stacks.
					for (var stackIndex = 0; stackIndex < stackCount; stackIndex++) {

						// If this stack matches the target stack...
						if (game.players[playerIndex].stacks[stackIndex] == this.targetStack) {

							// If the targeted stack has a joker...
							if (this.targetStack.getTopCard().getRankID() === 15) {

								// Discard the stack.
								game.players[playerIndex].stacks.splice(stackIndex, 1);

							}
							else {

								// Give this stack to the current player.
								this.currentPlayer.stacks.push(game.players[playerIndex].stacks.splice(stackIndex, 1)[0]);

							}

						}

					}

				}

			}

			// If this is a full court...
			if (this.playedCards.hasFullCourt()) {

				// Lock stack.
				this.targetStack.locked = true;

			}

		}

	},

	printMove: function() {
		'use strict';
		var text = this.currentPlayer.name;
		if (this.targetPlayer === null) {
			text += ' discards ';
			text += '[' + this.playedCards.cards[0].getName() + ']';
		} else {
			if (this.targetStack === null) {

				text += ' starts a new stack with ';

			} else {
				if (this.currentPlayer === this.targetPlayer) {

					text += ' adds to ';
					text += '[' + this.targetStack.printStack() + ']';
					text += ' with ';

				} else {

					if (this.playedCards.cards[0].getRankID() === 15) {
						text += ' kills ';
					} else {
						text += ' steals ';
					}

					text += '[' + this.targetStack.printStack() + ']';
					text += ' from ';
					text += this.targetPlayer.name;
					text += ' with ';

				}
			}

			var playedCardsCount = this.playedCards.getCardCount();
			if (playedCardsCount === 1) {
				text += '[' + this.playedCards.cards[0].getName() + ']';
			} else {
				for (var cardIndex = 0; cardIndex < playedCardsCount; cardIndex++) {
					if (cardIndex === playedCardsCount - 1) {
						text += 'and ';
					}
					text += '[' + this.playedCards.cards[cardIndex].getName() + ']';
					if (cardIndex !== playedCardsCount - 1) {
						text += ', ';
					}
				}
			}

		}
		text += ' (' + this.score + ')';
		return text;
	}

};