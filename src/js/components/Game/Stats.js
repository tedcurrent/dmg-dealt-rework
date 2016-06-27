"use strict";

var React = require("react");

var Stats = React.createClass({
	render: function() {
		return (
			<div>{this.props.stats.timePlayed}</div>
		);
	}
});

module.exports = Stats;