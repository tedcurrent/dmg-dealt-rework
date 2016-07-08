"use strict";

var React = require("react");
var GameListItem = require("./GameListItem");

// Personal games listed
var GameList = React.createClass({
	render: function() {
		return (
			<ul>
				{this.props.games.map(function (game) {
					return <GameListItem key={game.gameId} game={game} gameClass={"game-header"}/>;
				})}
			</ul>
		);
	}
});

module.exports = GameList;