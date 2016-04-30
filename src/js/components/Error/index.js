"use strict";

var React = require("react");

// Rendered upon errors (eg. 404)
var ErrorPage = React.createClass({
	render: function() {
		return (
			<div className="splash">
				<div className="text-container">
					<h1>{this.props.errorNumber}</h1>
					<h2>{this.props.errorMessage}</h2>
					<h2>{this.props.errorMessage2}</h2>
				</div>
			</div>
		);
	}
});

module.exports = ErrorPage;