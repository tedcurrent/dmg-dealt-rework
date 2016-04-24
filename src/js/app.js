"use strict";

var React = require("react");
var Header = require("./components/Header/");

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
});

module.exports = App;