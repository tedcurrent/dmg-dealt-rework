"use strict";

var React = require("react");
var GameWrapper = require("../Game/GameWrapper");

// Personal games listed
var GameList = React.createClass({
	render: function() {
		return (
			<ul>
				{this.props.games.map(function (game) {
					return (
						<li key={game.gameId}>
							<GameWrapper game={game} gameClass={"game-header"}/>
						</li>
					);
				})}
			</ul>
		);
	}
});

module.exports = GameList;