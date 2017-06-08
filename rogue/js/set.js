// Define Set class
function Set(cards) {

	'use strict';

	if (cards === undefined) {
		this.cards = [];
	} else {
		this.cards = cards;
	}

}

Set.prototype = {

	getCardCount: function() {
		'use strict';
		return this.cards.length;
	},

	getCourtCardCount: function() {
		'use strict';
		var courtCardCount = 0;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			if (this.cards[cardIndex].getRankID() > 10 && this.cards[cardIndex].getRankID() < 15) {
				cardCount = cardCount + 1;
			}
		}
		return courtCardCount;
	},

	getCardNames: function() {
		'use strict';
		var cardNames = [];
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			cardNames.push(this.cards[cardIndex].getName());
		}
		return cardNames;

	},

	getCard: function(cardIndex) {
		'use strict';
		cardIndex = cardIndex || 0;
		return this.cards[cardIndex];
	},

	getTotalValue: function() {
		'use strict';
		var totalValue = 0;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			totalValue = totalValue + this.cards[cardIndex].getValue();
		}
		return totalValue;
	},

	getTotalRank: function() {
		'use strict';
		var totalRank = 0;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			totalRank = totalRank + this.cards[cardIndex].getRankID();
		}
		return totalRank;
	},

	hasJoker: function() {
		'use strict';
		var hasJoker = false;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			if (this.cards[cardIndex].getRankID() === 15) {
				hasJoker = true;
			}
		}
		return hasJoker;
	},

	hasFullCourt: function() {
		'use strict';
		var hasFullCourt = false;
		var hasJack = false;
		var hasQueen = false;
		var hasKing = false;
		var hasAce = false;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			if (this.cards[cardIndex].getRankID() === 11) {
				hasJack = true;
			}
			else if (this.cards[cardIndex].getRankID() === 12) {
				hasQueen = true;
			}
			else if (this.cards[cardIndex].getRankID() === 13) {
				hasKing = true;
			}
			else if (this.cards[cardIndex].getRankID() === 14) {
				hasAce = true;
			}
		}
		if (hasJack && hasQueen && hasKing && hasAce) {
			hasFullCourt = true;
		}
		return hasFullCourt;
	},

	hasCard: function(card) {
		'use strict';
		var hasCard = false;
		var cardCount = this.getCardCount();
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
			if (this.cards[cardIndex] === card) {
				hasCard = true;
			}
		}
		return hasCard;
	},

	addCard: function(card) {
		'use strict';
		// If card is an array...
		if (card instanceof Array) {
			var cardCount = card.length;
			// Loop thorugh array.
			for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
				// Process array item.
				this.addCard(card[cardIndex]);
			}
		}
		else if (card instanceof Card) {
			// Add card to this set.
			this.cards.push(card);
		}
	},

	removeCard: function(card) {
		'use strict';
		var self = this;
		// If card is an array...
		if (card instanceof Array) {
			var cardCount = card.length;
			// Loop thorugh array.
			for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
				// Process array item.
				this.removeCard(card[cardIndex]);
			}
		}
		else if (card instanceof Card) {
			// Loop through cards in set.
			var cardCount = this.getCardCount();
			// Loop thorugh array.
			for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {
				// If the provided card is this card...
				if (this.cards[cardIndex] == card) {
					// Remove this card
					this.cards.splice(cardIndex, 1);
				}
			}
		}
	},

	drawCard: function() {
		'use strict';
		// If the set has cards to draw...
		if (this.getCardCount() > 0) {
			// Draw the top card.
			return this.cards.splice(0, 1)[0];
		}
	},

	// compare this set to another set.
	matchesSet: function(set) {

		// Define sort function.
		function sortCards(a,b) {
			if (a.getSuitID() < b.getSuitID()) {
				return 1;
			} else if (a.score > b.score) {
				return -1;
			} else {
				if (a.getRankID() < b.getRankID()) {
					return 1;
				} else if (a.score > b.score) {
					return -1;
				} else {
					return 0;
				}
			}
		}

		var match = true;
		var thisSet = this.cards.slice(0);
		var thisSetCardCount = thisSet.length;
		var thatSet = set.cards.slice(0);
		var thatSetCardCount = thatSet.length;

		thisSet.sort(sortCards);
		thatSet.sort(sortCards);

		console.log('THIS SET');
		console.log(thisSet);
		console.log('THAT SET');
		console.log(thatSet);

		// If the number of cards in each set don't match...
		if (thisSetCardCount !== thatSetCardCount) {

			// Sets don't match.
			match = false;

		} else {

			// Loop through cards in this set.
			for (var cardIndex = 0; cardIndex < thisSetCardCount; cardIndex++) {

				// If this card downs't match that card...
				if (thisSet[cardIndex] !== thatSet[cardIndex]) {

					// Sets don't match.
					match = false;

				}

			}

		}

		return match;

	}

};