// Define Deck class.
function Deck() {

	'use strict';

	// Deck is a type of card set.
	Set.call(this);

}

Deck.prototype = Object.create(Set.prototype);
Deck.prototype.constructor = Deck;

// Add build deck method.
Deck.prototype.buildDeck = function(){

	// Get number of decks to play with from game settings.
	var deckCount = game.settings.deckCount;

	// Loop through decks
	for (var deckIndex = 0; deckIndex < deckCount; deckIndex++) {

		// Loop through suits.
		for (var suitID = 1; suitID < 5; suitID++) {

			// Loop through ranks.
			for (var rankID = 2; rankID < 15; rankID++) {

				// Add card to deck.
				this.cards.push(new Card(suitID, rankID));
			}
		}

		// Add 2 jokers.
		for (var joker = 0; joker < 2; joker++) {

			// Add card to deck.
			this.cards.push(new Card(0, 15));
		}
	}

	// Shuffle deck.
	this.shuffleDeck();
}

// Add shuffle deck method.
Deck.prototype.shuffleDeck = function(){

	// Define the number of unshuffled cards.
	var unshuffledCards = this.getCardCount();
	var currentCard, randomCard;

	// While there are unshuffled cards...
	while (unshuffledCards) {

		// Select a random card to switch with the card to be shuffled.
		randomCard = Math.floor(Math.random() * unshuffledCards--);

		// Select the last unshuffled card as the card to be shuffled.
		currentCard = this.cards[unshuffledCards];

		// Populate the unshuffled card's slot with the selected card.
		this.cards[unshuffledCards] = this.cards[randomCard];

		// Populate the selected card's slot with the unshuffled card.
		this.cards[randomCard] = currentCard;

	}

}