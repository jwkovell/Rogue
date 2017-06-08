// Add draw player method.
Player.prototype.drawPlayer = function(targetElement, attributes, playerIndex){
	'use strict';

	var player = document.createElementNS('http://www.w3.org/2000/svg', 'g');

	// If attributes object was provided.
	if (typeof attributes === 'object' ) {
		// Loop through attributes.
		for (var attribute in attributes) {
			// If the object has this attribute...
			if(attributes.hasOwnProperty(attribute)) {
				player.setAttributeNS(null, attribute, attributes[attribute]);
			}
		}
	}

	var table;
	var avatar, avatarFrame, avatarImage;
  var courtFrame;
  var stats, statsFrame;
  var stack, stackFrame, stackGroup, translateX, translateY;

	// Add table image to player.
	table = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	table.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/parts/table.png');
	table.setAttributeNS(null, 'width', 600);
	table.setAttributeNS(null, 'height', 300);
	$(player).append(table);

	// add avatar group to player.
	avatar = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	avatar.setAttributeNS(null, 'transform', 'translate(0, 0)');
  avatar.setAttributeNS(null, 'class', 'avatar');
	$(player).append(avatar);

	// Add avatar frame to player.
	avatarFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	avatarFrame.setAttributeNS(null, 'x', 4);
	avatarFrame.setAttributeNS(null, 'y', 4);
	avatarFrame.setAttributeNS(null, 'width', 192);
	avatarFrame.setAttributeNS(null, 'height', 192);
  avatarFrame.setAttributeNS(null, 'fill', '#000000');
  avatarFrame.setAttributeNS(null, 'opacity', '.5');
	$(avatar).append(avatarFrame);

	// Add avatar image to player.
	avatarImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	avatarImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/players/' + this.avatar + '.png');
	avatarImage.setAttributeNS(null, 'x', 8);
	avatarImage.setAttributeNS(null, 'y', 8);
	avatarImage.setAttributeNS(null, 'width', 184);
	avatarImage.setAttributeNS(null, 'height', 184);
	$(avatar).append(avatarImage);

	// Add court frame to player.
	courtFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	courtFrame.setAttributeNS(null, 'x', 8);
	courtFrame.setAttributeNS(null, 'y', 167);
	courtFrame.setAttributeNS(null, 'width', 184);
	courtFrame.setAttributeNS(null, 'height', 25);
  courtFrame.setAttributeNS(null, 'fill', 'rgba(0, 0, 0, .75)');
	$(avatar).append(courtFrame);



	// add stats to player.
	stats = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	stats.setAttributeNS(null, 'transform', 'translate(0, 200)');
  stats.setAttributeNS(null, 'class', 'stats');
	$(player).append(stats);

	// add stats frame to player.
	/* statsFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	statsFrame.setAttributeNS(null, 'width', 100);
	statsFrame.setAttributeNS(null, 'height', 50);
  statsFrame.setAttributeNS(null, 'fill', '#000000');
  statsFrame.setAttributeNS(null, 'opacity', '.5');
	$(stats).append(statsFrame); */

	// Loop through stacks.
	for (var stackIndex = 0; stackIndex < 8; stackIndex++) {

		// Position stack based on index.
		if (stackIndex < 4) {
			translateX = 200 + (100 * stackIndex);
			translateY = 0;
		} else {
			translateX = -200 + (100 * stackIndex);
			translateY = 150;
		}

		// add stack group to player.
		stackGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		stackGroup.setAttributeNS(null, 'transform', 'translate(' + translateX + ', ' + translateY + ')');
		stackGroup.setAttributeNS(null, 'class', 'stack stack-' + stackIndex);
		$(player).append(stackGroup);

		// Add stack drop shadow to player.
		stack = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		stack.setAttributeNS(null, 'x', 4);
		stack.setAttributeNS(null, 'y', 4);
		stack.setAttributeNS(null, 'width', 92);
		stack.setAttributeNS(null, 'height', 142);
		stack.setAttributeNS(null, 'fill', '#000000');
		stack.setAttributeNS(null, 'opacity', '.25');
		stack.setAttributeNS(null, 'filter', 'url(#drop-shadow)');
		$(stackGroup).append(stack);

    if (stackIndex === 0) {
      // Add stack frame to player.
      stackFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      stackFrame.setAttributeNS(null, 'x', 2);
      stackFrame.setAttributeNS(null, 'y', 2);
      stackFrame.setAttributeNS(null, 'width', 96);
      stackFrame.setAttributeNS(null, 'height', 146);
      stackFrame.setAttributeNS(null, 'fill', 'rgba(0, 0, 0, 0)');
      stackFrame.setAttributeNS(null, 'stroke', 'rgba(30, 15, 5, 1)');
      stackFrame.setAttributeNS(null, 'stroke-width', '4');
      $(stackGroup).append(stackFrame);
    }

	}

	// Add player to target element.
	$(targetElement).append(player);

}

// Add draw stack method.
Stack.prototype.drawStack = function(targetElement, attributes, stackIndex){
	'use strict';

}

// Add draw card method.
Card.prototype.drawCard = function(targetElement, attributes, cardIndex){
	'use strict';

	var card = document.createElementNS('http://www.w3.org/2000/svg', 'image');

	// If attributes object was provided.
	if (typeof attributes === 'object' ) {
		// Loop through attributes.
		for (var attribute in attributes) {
			// If the object has this attribute...
			if(attributes.hasOwnProperty(attribute)) {
				card.setAttributeNS(null, attribute, attributes[attribute]);
			}
		}
	}

	// Add data attributes.
	card.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/cards/' + this.getSuitID() + '-' + this.getRankID() + '.png');
	card.setAttributeNS(null, 'data-suitID', this.getSuitID());
	card.setAttributeNS(null, 'data-rankID', this.getRankID());
	card.setAttributeNS(null, 'opacity', 1);

	// Add card to target element.
	$(targetElement).append(card);

}

// Add draw card method.
Card.prototype.playCard = function(targetElement, attributes, cardIndex){
	'use strict';

	// Play card.
	$('#current-player .card:nth-child(' + (cardIndex + 1) + ')').animate({
		svgY: 30
	}, duration, function() {});

}

// Add draw hand method.
Hand.prototype.drawHand = function(){
	'use strict';
	var cardCount = this.getCardCount();

	if (cardCount) {

		var cardAttributes;

		// Loop through cards.
		for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

			// Define card attributes.
			cardAttributes = {
				x: 220,
				y: 300,
				width: 160,
				height: 240,
				class: 'card',
        'data-index': cardIndex,
				transform: 'rotate(0 300 600)'
			};

			// Add card to hand.
			this.cards[cardIndex].drawCard('#current-player', cardAttributes);

		}

		// Raise Hand.
		this.raiseHand();

	}

}

// Raise hand method.
Hand.prototype.raiseHand = function(){
	'use strict';
	var cardCount = this.getCardCount();
	var self = this;
	var duration = 300;

	$('#current-player .card').animate({
		svgY: 90
	}, duration, function() {

		// Drecrease card count.
		cardCount--;

		// If this is the last card...
		if (cardCount === 0) {

			// Animate hand.
			self.spreadHand();

		}

	});

}

// Spread hand method.
Hand.prototype.spreadHand = function(){
	'use strict';
	var cardCount = this.getCardCount();
	var self = this;
	var duration = 300;

	// Loop through cards.
	for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

		// Calculate card's end rotation angle.
		var rotation = 
			cardIndex * this.spreadAngle - 
			(Math.floor(cardCount / 2) * this.spreadAngle) +
			this.spreadAngle / 2 -
			cardCount % 2 * this.spreadAngle / 2;

		$('#current-player .card:nth-child(' + (cardIndex + 1) + ')').animate({
			svgTransform: 'rotate(' + rotation + ' 300 600)'
		}, duration, function() {

			// Drecrease card count.
			cardCount--;

			// If this is the last card...
			if (cardCount === 0) {

				// Animate hand.
				self.addHandListeners();

			}

		});

	}

}

// Raise selected cards.
Hand.prototype.raiseSelectedCards = function(){
	'use strict';
	var cardCount = this.getCardCount();
	var self = this;
	var duration = 150;

	// Loop through cards.
	for (var cardIndex = 0; cardIndex < cardCount; cardIndex++) {

		var card = self.cards[cardIndex];

		// If this ceard is a selected card...
		if (self.selectedCards.hasCard(card)) {

			// Raise card.
			$('#current-player .card:nth-child(' + (cardIndex + 1) + ')').animate({
					svgY: 60
			}, duration, function() {});

		} else {

			// Lower card.
			$('#current-player .card:nth-child(' + (cardIndex + 1) + ')').animate({
					svgY: 90
			}, duration, function() {});

		}

	}

}
