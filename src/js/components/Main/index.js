"use strict";

var React = require("react");
var Search = require("../Search/index");

var Main = React.createClass({
	render: function() {
		return (
			<div id="main">
				<h1>I am main</h1>
				<Search />
			</div>
		);
	}
});

module.exports = Main;