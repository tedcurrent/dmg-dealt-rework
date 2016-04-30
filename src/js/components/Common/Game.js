"use strict";

var React = require("react");
var Util = require("../../util/utils");
var Image = require("../Common/Image");

// A single game component used all around
var Game = React.createClass({
	render: function() {
		var game = this.props.game;
		return (
			<div className="game-container">
				<div className="game-details">
					<span>{game.gameMode}</span>
					<span>{game.champion}</span>
					<span>{Util.fixDateToString(game.gameDate)}</span>
				</div>
				<div className="game-dmg">
					<span>{game.dmgDealt}</span>
				</div>
			</div>
		);
	}
});

module.exports = Game;