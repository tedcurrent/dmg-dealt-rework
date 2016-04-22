"use strict";

var React = require("react");
var Header = require("../Header/index");
var Splash = require("../Splash/index");

var Main = React.createClass({
	render: function() {
		return (
			<div id="main">
				<Header />
				<Splash />
			</div>
		);
	}
});

module.exports = Main;