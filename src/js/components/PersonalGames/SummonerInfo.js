"use strict";

var React = require("react");

var SummonerInfo = React.createClass({
	render: function() {
		var topMessage = this.props.newHs ? "New Top DMG" : "All-time top dmg";

		return (
			<div className="summoner-info">
				<span className="name">{this.props.summoner.summonerName}</span>
				<span className="top-info">{topMessage}</span>
			</div>
		);
	}
});

module.exports = SummonerInfo;