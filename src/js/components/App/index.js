"use strict";

var React = require("react");
var Header = require("../Header/");
var Footer = require("../Footer/");

// The application wrapper component
var App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				<Header />
				<main>
					{this.props.children}
				</main>
				<Footer />
			</div>
		);
	}
});

module.exports = App;