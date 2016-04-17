"use strict";

var React = require("react");
var Game = require("./Game");

var TopGame = React.createClass({
	highScoreMessage: function() {
		var newHs = this.props.newHs;
		var topGameClass = newHs ? "top-game-new" : "top-game-old";
		var message = newHs? "New highscore!" : "All-time highscore";

		return (
			<span className={topGameClass}>
				{message}
			</span>
		);
	},

	renderTopGame: function() {
		var topGame = this.props.topGame;
		return (
			<div>
				{this.highScoreMessage()}
				<Game key={topGame.gameId} game={topGame}/>
			</div>
		);
	},

	render: function() {
		return (
			<div className="top-game">
				{this.renderTopGame()}
			</div>
		);
	}
});

module.exports = TopGame;