"use strict";

var React = require("react");
var Util = require("../../../util/utils");

var GameStatsDetailArea = React.createClass({
	render: function() {
		var stats = this.props.stats;
		return (
			<div className="game-stats-detail-area">
				<div>
					<div className="detail">Duration</div>
					<div className="description">{Util.getMinuteFormat(stats.timePlayed)}</div>
				</div>
				

				<div>
					<div className="detail">K/D/A</div>
					<div className="description">{Util.getKDAFormat(stats.kills, stats.deaths, stats.assists)}</div>
				</div>

				<div>
					<div className="detail">Largest multikill</div>
					<div className="description">{Util.getMultikillFormat(stats.largestMultiKill)}</div>
				</div>
			</div>
		);
	}
});

module.exports = GameStatsDetailArea;