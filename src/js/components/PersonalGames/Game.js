"use strict";

var React = require("react");
var Util = require("../../util/utils");
var Image = require("../Common/Image");

var Game = React.createClass({
	render: function() {
		var game = this.props.game;
		var championSquareUrl = Util.championSquareUrl(game.champion);
		return (
			<div className="game">
				<div className="thumbnail-container">
					<Image src={championSquareUrl} alt={game.champion} />
				</div>
				<span>{game.dmgDealt}</span>
				<span>{game.gameMode}</span>
				<span>{game.champion}</span>
				<span>{Util.fixDateToString(game.gameDate)}</span>
			</div>
		);
	}
});

module.exports = Game;