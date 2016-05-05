"use strict";

var React = require("react");
var Header = require("./components/Header/");

// The application wrapper component
var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<Header />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
});

module.exports = App;