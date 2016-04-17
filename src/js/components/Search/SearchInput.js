"use strict";

var React = require("react");

var SearchInput = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},

	render: function() {
		return (
			<input
				id="search-input"
				placeholder="Summoner name"
				autoFocus={true}
				value={this.props.value}
				onChange={this.handleChange}
				onBlur={this.props.onBlur}
			/>
		);
	}
});

module.exports = SearchInput;