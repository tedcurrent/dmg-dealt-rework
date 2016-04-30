"use strict";

var React = require("react");

// Any top game is rendered with summoner details
var SummonerInfo = React.createClass({
	renderTopMessage: function() {
		if (this.props.region) {
			return (
				<span className="region-info">
					{this.props.region.toUpperCase()}
				</span>
			);
		} else {
			return (
				<span className="top-info">
					{this.props.newHs ? "New Top DMG" : "All-time top dmg"}
				</span>
			);
		}
		
	},

	render: function() {
		return (
			<div className="summoner-info">
				<span className="name">{this.props.summoner.summonerName}</span>
				{this.renderTopMessage()}
			</div>
		);
	}
});

module.exports = SummonerInfo;