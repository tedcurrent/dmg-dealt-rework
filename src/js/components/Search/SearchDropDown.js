"use strict";

var React = require("react");

// Select component. Country options come from the owning component
var Dropdown = React.createClass({
	render: function() {
		var options = this.props.options.map(function(option) {
			return (
				<option key={option[this.props.valueField]} value={option[this.props.valueField]}>
					{option[this.props.labelField]}
				</option>
			);
		}.bind(this));
		
		return (
			<div className="drop-down">
				<select id={this.props.id}
					value={this.props.value} 
					onChange={this._handleChange}>
					{options}
				</select>
				<span className="drop-arrow">&#9660;</span>
			</div>
		);
	},

	_handleChange: function(e) {
		this.props.onChange(e.target.value);
	}
});

module.exports = Dropdown;