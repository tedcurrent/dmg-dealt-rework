"use strict";

var React = require("react");

var GameStatsDetail = React.createClass({
	render: function() {
		return (
			<div className="game-stats-detail">
				<div className="description">{this.props.description}</div>
				<div className="detail">{this.props.detail}</div>
			</div>
		);
	}
});

module.exports = GameStatsDetail;