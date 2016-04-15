"use strict";

var React = require("react");

var SearchInput = React.createClass({
	render: function() {
		return (
			<input
				id="search-input"
				placeholder="Summoner name"
				autoFocus={true}
			/>
		);
	}
});

module.exports = SearchInput;