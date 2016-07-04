"use strict";

var React = require("react");
var RegionalGame = require("./RegionalGame");
var GamesContainer = require("../Common/GamesContainer");
var _ = require("lodash");

var RegionContainer = React.createClass({
	render: function() {
		var results = this.props.results;
		return (
			<GamesContainer>
				<ul>
					{results.games.map(function (game) {
						return (
							<li key={game._id}>
								<RegionalGame game={game}/>
							</li>
						);
					})}
				</ul>
			</GamesContainer>
		);
	}
});

module.exports = RegionContainer;