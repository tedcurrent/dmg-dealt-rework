"use strict";

var React = require("react");
var Util = require("../../util/utils");

var Game = React.createClass({
	render: function() {
		var game = this.props.game;
		return (
			<div className="game-list">
				<span>{game.dmgDealt}</span>
				<span>{game.gameMode}</span>
				<span>{game.champion}</span>
				<span>{Util.fixDateToString(game.gameDate)}</span>
			</div>
		);
	}
});

module.exports = Game;