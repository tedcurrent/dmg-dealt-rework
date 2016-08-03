"use strict";

var React = require("react");
var RegionalGame = require("./RegionalGame");
import GamesContainer from "../Common/GamesContainer";

var RegionContainer = React.createClass({
	render: function() {
		var results = this.props.results;
		return (
			<GamesContainer>
				<ul>
					{results.games.map(function (game) {
						return <RegionalGame key={game._id} game={game}/>;
					})}
				</ul>
			</GamesContainer>
		);
	}
});

module.exports = RegionContainer;