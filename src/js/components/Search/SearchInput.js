"use strict";

var React = require("react");

var SearchInput = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},

	handleKeyDown: function(e) {
		switch (e.key) {
			case "Enter":
				this.handleChange(e);
				break;
			default:
		}
	},

	render: function() {
		return (
			<input
				id="search-input"
				type="text"
				placeholder="Summoner name"
				autoFocus={true}
				value={this.props.value}
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
			/>
		);
	}
});

module.exports = SearchInput;