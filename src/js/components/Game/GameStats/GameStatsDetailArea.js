"use strict";

var React = require("react");
var Util = require("../../../util/utils");
var DateTimeUtils = require("../../../util/dateTimeUtils");
var GameStatsDetail = require("./GameStatsDetail");

var GameStatsDetailArea = React.createClass({
	render: function() {
		var stats = this.props.stats;
		return (
			<div className="game-stats-detail-area">
				<GameStatsDetail
					description={"Duration"}
					detail={DateTimeUtils.parseDuration(stats.timePlayed)}
				/>
				<GameStatsDetail
					description={"K/D/A"}
					detail={Util.getKDAFormat(stats.kills, stats.deaths, stats.assists)}
				/>
				<GameStatsDetail
					description={"Largest multikill"}
					detail={Util.getMultikillFormat(stats.largestMultiKill)}
				/>
			</div>
		);
	}
});

module.exports = GameStatsDetailArea;