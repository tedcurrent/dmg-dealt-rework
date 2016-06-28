"use strict";

var React = require("react");
var GameHeader = require("./GameHeader");
var GameStats = require("./GameStats");

// A wrapper for the game "header" and the stats view
var GameWrapper = React.createClass({
	getInitialState: function() {
		return {
			statsOpen: false
		};
	},

	headerClickHandler: function() {
		this.setState({statsOpen: !this.state.statsOpen});
	},

	showStats: function() {
		if(this.state.statsOpen) {
			return (
				<GameStats stats={this.props.game.stats} />
			);
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.state.statsOpen) {
			this.setState({statsOpen: false});
		}
	},

	render: function() {
		return (
			<div className="game-wrapper">
				<GameHeader 
					game={this.props.game} 
					gameClass={this.props.gameClass}
					onClick={this.headerClickHandler}
				>
					{this.props.children}
				</GameHeader>
				{this.showStats()}
			</div>
		);
	}
});

module.exports = GameWrapper;