// Define Stack class.
function Stack() {

	'use strict';

	// Stack is a type of card set.
	Set.call(this);

	this.locked = false;

}

Stack.prototype = Object.create(Set.prototype);
Stack.prototype.constructor = Stack;

// Add get top card method.
Stack.prototype.getTopCard = function(){

	'use strict';

	var topCard = this.cards[this.cards.length - 1];

	return topCard;

};

// Add print stack method.
Stack.prototype.printStack = function(){
	'use strict';
	var text = this.getCardCount() + ' card ';
	text += 'stack containing a [';
	text += this.getTopCard().getName();
	text += '] with a value of ';
	text += this.getTotalValue();
	return text;
};
