"use strict";

var React = require("react");
var Game = require("./Game");
var Overlay = require("./Overlay");

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