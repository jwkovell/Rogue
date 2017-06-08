// Define Card class
function Card(suitID, rankID) {

	'use strict';

	// Store suit and rank as private variables so
	// they are slightly more difficult to find.
	var suitID = suitID;
	var rankID = rankID;

	this.suitID = suitID;
	this.rankID = rankID;

	// Retrieve private suit.
	this.getSuitID = function() {
		return suitID;
	};

	// Retrieve private rank.
	this.getRankID = function() {
		return rankID;
	};

}

Card.prototype = {

	getValue: function() {

		'use strict';

		// Get private suitID.
		var rankID = this.getRankID();

		// If this is a joker...
		if (rankID === 15) {
			return 0;
		}

		// Else, if this is an ace...
		else if (rankID === 14) {
			return 3;
		}

		// Else, if this is a king, queen, or jack...
		else if (rankID > 10) {
			return 2;
		}

		// Else, this is a number card...
		else {
			return 1;
		}

	},

	getSuitName: function() {

		'use strict';

		// Get private suitID.
		var suitID = this.getSuitID();

		// If this suit is clubs...
		if (suitID === 1) {
			return 'club';
		}

		// Else, if this suit is diamonds...
		else if (suitID === 2) {
			return 'diamond';
		}

		// Else, if this suit is hearts...
		else if (suitID === 3) {
			return 'heart';
		}

		// Else, this suit is spades...
		else if (suitID === 4) {
			return 'spade';
		}

		// Else, this card has no suit.
		else {
			return '';
		}

	},

	getRankName: function() {

		'use strict';

		// Get private suitID.
		var rankID = this.getRankID();

		// If this rank is joker...
		if (rankID === 15) {
			return 'joker';
		}

		// Else, if this rank is ace...
		else if (rankID === 14) {
			return 'ace';
		}

		// Else, if this rank is king...
		else if (rankID === 13) {
			return 'king';
		}

		// Else, if this rank is queen...
		else if (rankID === 12) {
			return 'queen';
		}

		// Else, if this rank is jack...
		else if (rankID === 11) {
			return 'jack';
		}

		// Else, if this rank is ten...
		else if (rankID === 10) {
			return 'ten';
		}

		// Else, if this rank is nine...
		else if (rankID === 9) {
			return 'nine';
		}

		// Else, if this rank is eight...
		else if (rankID === 8) {
			return 'eight';
		}

		// Else, if this rank is seven...
		else if (rankID === 7) {
			return 'seven';
		}

		// Else, if this rank is six...
		else if (rankID === 6) {
			return 'six';
		}

		// Else, if this rank is five...
		else if (rankID === 5) {
			return 'five';
		}

		// Else, if this rank is four...
		else if (rankID === 4) {
			return 'four';
		}

		// Else, if this rank is three...
		else if (rankID === 3) {
			return 'three';
		}

		// Else, this rank is two...
		else if (rankID === 2) {
			return 'two';
		}

	},

	getName: function() {

		'use strict';

		// If this rank is a joker...
		if (this.getRankID() === 15) {

			// Return only the rank name.
			return 'joker';

		} else {

			// Return the rank name and suit name.
			return (this.getRankName()) + ' of ' + (this.getSuitName()) + 's';

		}

	},

	getMachineName: function() {
		'use strict';

		// If this rank is a joker...
		if (this.getRankID() === 15) {

			// Return only the rank name.
			return 'joker';

		} else {

			// Return the rank name and suit name.
			return this.getRankName() + '_' + this.getSuitName();

		}

	}

};