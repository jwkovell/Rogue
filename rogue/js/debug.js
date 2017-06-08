// Debugging functions
function listValidMoves(validMoves) {

	'use strict';

	var html = 'CARDS<br />';
	
	var cards = game.players[game.currentPlayer].hand.getCardRanks();
	for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
		html += cards[cardIndex] + '<br />';
	}

	html += '<br />VALID MOVES<br /><br />';

	for (var move in validMoves) {

		html += '';

		if (validMoves[move].playedCards.length > 1) {
			html += 'PILE ON!<br />';
		}

		if (validMoves[move].strategicScore < 0) {
			if (validMoves[move].strategicScore < -1) {
				html += 'VERY ';
			}
			html += 'BAD MOVE!<br />';
		}

		if (validMoves[move].strategicScore > 0) {
			if (validMoves[move].strategicScore > 1) {
				html += 'VERY ';
			}
			html += 'GOOD MOVE!<br />';
		}

		html += 'COST: ' + validMoves[move].cost + '<br />';
		html += 'BENEFIT: ' + validMoves[move].benefit + '<br />';
		html += 'HARM: ' + validMoves[move].harm + '<br />';

		html += '<br />';

	}

	$('#print').html(html);
	
}

/*
	console.log('REVIEW MOVES');
	for (var moveIndex = moveCount - 1; moveIndex >= 0; moveIndex--) {
		console.log(
			'==== MOVE ====' + '\n' +
			'cost: ' + moves[moveIndex].cost + '\n' +
			'benefit: ' + moves[moveIndex].benefit + '\n' +
			'harm: ' + moves[moveIndex].harm
		);
	}
*/