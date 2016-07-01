"use strict";

var React = require("react");
var RegionalGame = require("./RegionalGame");
var _ = require("lodash");

var RegionContainer = React.createClass({
	render: function() {
		var results = this.props.results;
		return (
			<div className="games-container regions">
				<ul>
					{results.games.map(function (game) {
						return (
							<li key={game._id}>
								<RegionalGame game={game}/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
});

module.exports = RegionContainer;