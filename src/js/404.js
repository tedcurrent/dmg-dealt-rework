"use strict";

var React = require("react");
var ErrorPage = require("./components/Error");

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