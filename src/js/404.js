"use strict";

var React = require("react");

var NotFoundPage = React.createClass({
	render: function() {
		return (
			<div>
				<h1>404</h1>
				<h1>Page Not Found</h1>
			</div>
		);
	}
});

module.exports = NotFoundPage;