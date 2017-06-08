// Define game settings.
var settings = {};
settings.handSize = 5;
settings.stackLimit = 8;

settings.players = [
	{
		computer: false,
		name: 'Joe',
		avatar: 'joe'
	},
	{
		computer: true,
		name: 'Adam',
		avatar: 'adam',
		personality: {
			cautious: 1
		},
		bonuses: {},
		penalties: {},
		thresholds: {}
	},
	{
		computer: true,
		name: 'Brian',
		avatar: 'brian',
		personality: {
			cautious: 1
		},
		bonuses: {},
		penalties: {},
		thresholds: {}
	},
	{
		computer: true,
		name: 'Cassie',
		avatar: 'cassie',
		personality: {
			cautious: 1
		},
		bonuses: {},
		penalties: {},
		thresholds: {}
	},
	{
		computer: true,
		name: 'Dominic',
		avatar: 'dominic',
		personality: {
			cautious: 1
		},
		bonuses: {},
		penalties: {},
		thresholds: {}
	}
];

var game = {};

$(function(){

	// Instantiate the game.
	game = new Game(settings);

	// Prepare game.
	game.prepareGame(settings);

	// Start game.
	game.startGame();

});

/*
	function next() {

		// Manually proceed to the next turn.
		game.startNextTurn();

	}

	function start() {

		// Instantiate the game.
		game = new Game(settings);

		// Prepare game.
		game.prepareGame(settings);

		// Start game.
		game.startGame();

	}
*/
