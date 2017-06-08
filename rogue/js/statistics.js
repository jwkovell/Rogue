// Define statistics.
var statistics = {
	'gamesPlayed': 0,
	'players': [
		{
		'name': 'Adam',
		'wins': 0,
		'totalStacks': 0,
		'fullCourts': 0,
		'totalScore': 0
		},
		{
		'name': 'Brian',
		'wins': 0,
		'totalStacks': 0,
		'fullCourts': 0,
		'totalScore': 0
		},
		{
		'name': 'Cassie',
		'wins': 0,
		'totalStacks': 0,
		'fullCourts': 0,
		'totalScore': 0
		},
		{
		'name': 'Dominic',
		'wins': 0,
		'totalStacks': 0,
		'fullCourts': 0,
		'totalScore': 0
		}
	]
};

function updateStatistics() {

	var winningPlayer = game.getWinningPlayer();

	statistics.gamesPlayed++;

	// Loop through players.
	for (var playerIndex = 0; playerIndex < game.settings.playerCount; playerIndex++) {

		var player = game.players[playerIndex];

		if (winningPlayer.name === player.name) {

			statistics.players[playerIndex].wins = statistics.players[playerIndex].wins + 1;

		}

		statistics.players[playerIndex].totalScore = statistics.players[playerIndex].totalScore + player.getScore();

		// Get player stack count.
		var stackCount = player.getStackCount();

		statistics.players[playerIndex].totalStacks = statistics.players[playerIndex].totalStacks + stackCount;


		for (var stackIndex = 0; stackIndex < stackCount; stackIndex++) {

			// If stack is locked...
			if (player.stacks[stackIndex].locked) {

				statistics.players[playerIndex].fullCourts = statistics.players[playerIndex].fullCourts + 1;

			}

		}

	}

	//displayStatistics();

}

function displayStatistics() {

	var text = '';

	// Loop through players.
	for (var playerIndex = 0; playerIndex < game.settings.playerCount; playerIndex++) {

		text += statistics.players[playerIndex].name + '\n';
		text += 'Wins: ' + statistics.players[playerIndex].wins + '\n';
		text += 'Total Stacks: ' + statistics.players[playerIndex].totalStacks + '\n';
		text += 'Full Courts: ' + statistics.players[playerIndex].fullCourts + '\n';
		text += 'Total Score: ' + statistics.players[playerIndex].totalScore + '\n \n';

	}

	$('#print').html(text);

	if (statistics.gamesPlayed < 1) {

		console.clear();

		start();

	}

}