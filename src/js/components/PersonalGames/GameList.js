"use strict";

var React = require("react");
var Game = require("./Game");

var GameList = React.createClass({
	render: function() {
		return (
			<ul className="game-list">
				{this.props.games.map(function (game) {
					return <Game key={game.gameId} game={game}/>;
				})}
			</ul>
		);
	}
});

module.exports = GameList;