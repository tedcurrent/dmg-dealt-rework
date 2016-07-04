"use strict";

var React = require("react");
var GameHeader = require("./GameHeader");
var GameStats = require("./GameStats/");

// A wrapper for the game "header" and the stats view. Also acts as a controller for showing stats
var GameWrapper = React.createClass({
	getInitialState: function() {
		return {
			statsOpen: false
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.state.statsOpen)
			this.setState({statsOpen: false});
	},

	render: function() {
		return (
			<div className="game-wrapper">
				<GameHeader 
					game={this.props.game} 
					gameClass={this.props.gameClass}
					onClick={this._headerClickHandler}
				>
					{this.props.children}
				</GameHeader>
				{this._showStats()}
			</div>
		);
	},

	_headerClickHandler: function() {
		this.setState({statsOpen: !this.state.statsOpen});
	},

	_showStats: function() {
		if (this.state.statsOpen)
			return <GameStats game={this.props.game} />;
	}
});

module.exports = GameWrapper;