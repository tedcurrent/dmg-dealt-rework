"use strict";

var React = require("react");
var ErrorPage = require("../Error");

// NotFoundPage controller
var NotFoundPage = React.createClass({
	render: function() {
		return (
			<ErrorPage
				errorNumber={404}
				errorMessage={"Page Not Found"}
			/>
		);
	}
});

module.exports = NotFoundPage;