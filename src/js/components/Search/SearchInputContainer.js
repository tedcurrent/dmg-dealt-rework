"use strict";

var React = require("react");

// Search wrapper (input, dropdown..)
var SearchInputContainer = React.createClass({
	render: function() {
		return (
			<div className="input-container">
				{this.props.children}
			</div>
		);
	}
});

module.exports = SearchInputContainer;