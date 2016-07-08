"use strict";

var React = require("react");

// Search input component with mouse and keyboard handlers
var SearchInput = React.createClass({
	render: function() {
		return (
			<input
				id="search-input"
				type="text"
				placeholder="Summoner name"
				autoFocus={true}
				value={this.props.value}
				onChange={this._handleChange}
				onKeyDown={this._handleKeyDown}
			/>
		);
	},

	_handleChange: function(e) {
		this.props.resultSelectedChange(false);
		this.props.onChange(e.target.value);
	},

	_handleKeyDown: function(e) {
		switch (e.key) {
			case "Enter":
				this.props.resultSelected ? this.props.onEnter() : this._handleChange(e);
				break;
			case "ArrowDown":
				e.preventDefault();
				this.props.resultSelectedChange(!this.props.resultSelected);
				break;
			case "ArrowUp":
				e.preventDefault();
				this.props.resultSelectedChange(!this.props.resultSelected);
				break;
			default:
		}
	}
});

module.exports = SearchInput;