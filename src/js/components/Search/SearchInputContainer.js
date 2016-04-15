"use strict";

var React = require("react");

var SearchInputContainer = React.createClass({
	render: function() {
		return (
			<div>
			{this.props.children}
			</div>
		);
	}
});

module.exports = SearchInputContainer;