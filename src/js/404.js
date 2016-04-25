"use strict";

var React = require("react");
var ErrorPage = require("./components/Error");

var NotFoundPage = React.createClass({
	render: function() {
		return (
			<div>
				<ErrorPage
					errorNumber={404}
					errorMessage={"Page Not Found"}
				/>
			</div>
		);
	}
});

module.exports = NotFoundPage;