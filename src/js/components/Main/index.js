"use strict";

var React = require("react");

// Jos ei damageita --> this props children (splash)
// else --> damage
// NOTE: Tänne tulee sit ihan kaikki
// elikkä 404 renderöidää kans main sisällä
// regions renderöidää kans main sisällä

var Main = React.createClass({
	render: function() {
		return (
			<main>
				{this.props.children}
			</main>
		);
	}
});

module.exports = Main;