"use strict";

var React = require("react");
var Header = require("./components/Header/");
var Main = require("./components/Main/");

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<Main>
					{this.props.children}
				</Main>
			</div>
		);
	}
});

module.exports = App;