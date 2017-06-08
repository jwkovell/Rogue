// Add hand listener method.
Hand.prototype.addHandListeners = function(){
}


// Add hand listener method.
Hand.prototype.addHandListeners = function(){
	'use strict';
	var cardCount = this.getCardCount();
	var self = this;

  // Remove existing click listeners.
  $('#current-player .card').unbind('click');

	// Add click listener.
  $('#current-player .card').click(function(){

		var clickedCardIndex = $(this).attr('data-index');
		var card = self.cards[clickedCardIndex];

		// If this card is a selected card...
		if (self.selectedCards.hasCard(card)) {

			// Remove card from selected cards.
			self.selectedCards.removeCard(card);

			// If at lease one card is still selected...
			if (self.selectedCards.getCardCount() > 0) {

				// Get valid moves using the selected cards.
				game.players[game.currentPlayer].turn.getValidMoves(self.selectedCards, true);

			} else {

				// Discard all moves.
				game.players[game.currentPlayer].turn.moves = [];

			}

		} else {

			// Add this card to selected cards.
			self.selectedCards.addCard(card);

			// Get valid moves using the selected cards.
			game.players[game.currentPlayer].turn.getValidMoves(self.selectedCards, true);

			// If no valid moves were found...
			if (game.players[game.currentPlayer].turn.moves.length === 0) {

				// Set seleced cards to only this card.
				self.selectedCards.cards = [card];

				// Get valid moves using the selected cards.
				game.players[game.currentPlayer].turn.getValidMoves(self.selectedCards, true);

			}

		}



		console.log(game.players[game.currentPlayer].name.toUpperCase() + '\'S MOVES' + '\n' + game.players[game.currentPlayer].printMoves());



		// Raise selected cards.
		self.raiseSelectedCards();

	});

}
