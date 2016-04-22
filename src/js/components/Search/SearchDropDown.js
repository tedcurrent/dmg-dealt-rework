"use strict";

var React = require("react");

var Dropdown = React.createClass({
	handleChange: function(e) {
		this.props.onChange(e.target.value);
	},
	
	render: function() {
		var options = this.props.options.map(function(option) {
			return (
				<option key={option[this.props.valueField]} value={option[this.props.valueField]}>
					{option[this.props.labelField]}
				</option>
			);
		}.bind(this));
		
		return (
			<select id={this.props.id}
				value={this.props.value} 
				onChange={this.handleChange}>
				{options}
			</select>
		);
	}
});

module.exports = Dropdown;