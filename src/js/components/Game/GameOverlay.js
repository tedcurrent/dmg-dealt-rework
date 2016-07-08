"use strict";

var React = require("react");

var GameOverlay = React.createClass({
	render: function() {		
		return (
			<div className="game-header-overlay">
				<span>{this.props.statsOpen ? "Hide stats" : "Show stats"}</span>
				<i className={"fa fa-chevron-" + (this.props.statsOpen ? "up" : "down")}></i>
			</div>
		);
	}
});

module.exports = GameOverlay;