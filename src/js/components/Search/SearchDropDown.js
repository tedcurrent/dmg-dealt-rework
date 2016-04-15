"use strict";

var React = require("react");

var Dropdown = React.createClass({
	render: function() {
		var self = this;
		var options = self.props.options.map(function(option) {
			return (
				<option key={option[self.props.valueField]} value={option[self.props.valueField]}>
					{option[self.props.labelField]}
				</option>
			);
		});
		return (
			<select id={this.props.id} 
				className="form-control" 
				value={this.props.value} 
				onChange={this.handleChange}>
				{options}
			</select>
		);
	},

	handleChange: function(e) {
		this.props.onChange(e.target.value);
	}

});

module.exports = Dropdown;