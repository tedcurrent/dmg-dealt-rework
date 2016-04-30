"use strict";

var React = require("react");
var Game = require("../Common/Game");
var Overlay = require("../Common/Overlay");

// Personal games listed
var GameList = React.createClass({
	render: function() {
		return (
			<ul>
				{this.props.games.map(function (game) {
					return (
						<li key={game.gameId}>
							<div className="game">
								<Overlay champion={game.champion} />
								<Game game={game}/>
							</div>
						</li>
					);
				})}
			</ul>
		);
	}
});

module.exports = GameList;