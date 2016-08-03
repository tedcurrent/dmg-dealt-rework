"use strict";

var React = require("react");
var GameListItem = require("./GameListItem");
var Util = require("../../util/utils");

// Personal games listed
var GameList = React.createClass({
	render: function() {
		var sortedGames = Util.sortGamesByDmg(this.props.games);
		return (
			<ul>
				{sortedGames.map(function (game) {
					return <GameListItem key={game.gameId} game={game} gameClass={"game-header"} />;
				})}
			</ul>
		);
	}
});

module.exports = GameList;