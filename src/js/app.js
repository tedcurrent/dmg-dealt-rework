"use strict";

var React = require("react");
var Header = require("./components/Header/");
var Footer = require("./components/Footer/");
var InitActions = require("./actions/InitActions");

InitActions.initApp();

var App = React.createClass({
	render: function() {
		return (
			<div>
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