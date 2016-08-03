"use strict";

var React = require("react");
var GameHeader = require("./GameHeader");
var GameStats = require("./GameStats/");
import Collapse from "../Common/Collapse";

// A wrapper for the game header and the stats view. Also acts as a controller for showing stats
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
					statsOpen={this.state.statsOpen}
				>
					{this.props.children}
				</GameHeader>
				<Collapse>
					{this._showStats()}
				</Collapse>
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