"use strict";

var React = require("react");

// Starting screen for the app
var Splash = React.createClass({
	render: function() {
		var tagline = "Spice up your game";
		return (
			<div className="splash">
				<div className="text-container">
					<h1>{tagline}</h1>
					<h3>
						Find out recent damage numbers from 
						<a href="http://eune.leagueoflegends.com/"> League of Legends </a>
					</h3>
					<h3>and compare how you stack up with the deadliest.</h3>
				</div>
			</div>
		);
	}
});

module.exports = Splash;