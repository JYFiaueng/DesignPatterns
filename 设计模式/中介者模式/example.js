//模拟泡泡堂游戏

//2016年6月11日 09:17:39

//对象原型
function Player(name, teamColor){
	this.name = name;
	this.teamColor = teamColor;
	this.state = 'alive';
}

Player.prototype.win = function(){
	console.log(this.name + 'won');
};

Player.prototype.lose = function(){
	console.log(this.name + 'lose');
};

Player.prototype.die = function(){
	this.state = 'dead';
	playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function(){
	playerDirector.ReceiveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function(color){
	playerDirector.ReceiveMessage('changeTeam', this, color);
};

//对象工厂
var playerFactory = function(name, teamColor){
	var newPlayer = new Player(name, teamColor);
	playerDirector.ReceiveMessage('addPlayer', newPlayer);
	return newPlayer;
};

//中介者
var playerDirector = (function(){
	var players = {},operations = {};

	operations.addPlayer = function(player){
		var teamColor = player.teamColor;
		players[teamColor] = players[teamColor] || [];
		players[teamColor].push(player);
	};

	operations.removePlayer = function(player){
		var teamColor = player.teamColor,
			teamPlayers = players[teamColor] || [];
		for(var i = teamPlayers.length - 1; i >= 0; i--){
			if(teamPlayers[i] === player){
				teamPlayers.splice(i, 1);
			}
		}
	};

	operations.changeTeam = function(player, newTeamColor){
		operations.removePlayer(player);
		player.teamColor = newTeamColor;
		operations.addPlayer(player);
	};

	operations.playerDead = function(player){
		var teamColor = player.teamColor,
			teamPlayers = players[teamColor];
	};

	operations.playerDead = function(player){
		var teamColor = player.teamColor,
			teamPlayers = players[teamColor];
		var all_dead = true;
		for(var i = 0, player; player = teamPlayers[i++]; ){
			if(player.state !== 'dead'){
				all_dead = false;
				break;
			}
		}
		if(all_dead === true){
			for(var i = 0, player; player = teamPlayers[i++]; ){
				player.lose();
			}
			for(var color in players){
				if(color !== teamColor){
					var teamPlayers = players[color];
					for(var i = 0, player; player = teamPlayers[i++]; ){
						player.win();
					}
				}
			}
		}
	};

	var ReceiveMessage = function(){
		var message = Array.prototype.shift.call(arguments);
		operations[message].apply(this, arguments);
	};

	return {
		ReceiveMessage: ReceiveMessage
	};

})();

var player1 = playerFactory('1号玩家', 'red');
var player2 = playerFactory('2号玩家', 'red');
var player3 = playerFactory('3号玩家', 'red');
var player4 = playerFactory('4号玩家', 'red');
var player5 = playerFactory('5号玩家', 'blue');
var player6 = playerFactory('6号玩家', 'blue');
var player7 = playerFactory('7号玩家', 'blue');
var player8 = playerFactory('8号玩家', 'blue');

// player1.die();
// player2.die();
// player3.die();
// player4.die();

// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();