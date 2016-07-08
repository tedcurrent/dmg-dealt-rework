"use strict";

var React = require("react");

// Any top game is rendered with summoner details
var SummonerInfo = React.createClass({
	render: function() {
		return (
			<div className="summoner-info">
				<span className="name">{this.props.summoner.summonerName}</span>
				<span className="info">{this.props.info}</span>
			</div>
		);
	}
});

module.exports = SummonerInfo;