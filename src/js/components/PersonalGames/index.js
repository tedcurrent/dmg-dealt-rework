"use strict";

var React = require("react");
var PersonalGamesStore = require("../../stores/PersonalGamesStore");

var PersonalGamesController = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Games here</h1>
			</div>
		);
	}
});

module.exports = PersonalGamesController;