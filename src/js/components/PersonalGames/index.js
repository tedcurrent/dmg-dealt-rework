"use strict";

var React = require("react");
var PersonalGamesStore = require("../../stores/PersonalGamesStore");
var TopGame = require("./TopGame");
var GameList = require("./GameList");
var SummonerInfo = require("./SummonerInfo");
var _ = require("lodash");

var PersonalGamesController = React.createClass({
	getInitialState: function() {
		return {
			gameResults: PersonalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		PersonalGamesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PersonalGamesStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			gameResults: PersonalGamesStore.getAll()
		});
	},

	renderComponents: function() {
		var results = this.state.gameResults;
		if (results.errors === 0 && !_.isEmpty(results.summoner)) {
			return (
				<div>
					<SummonerInfo summoner={results.summoner} />
					<TopGame topGame={results.highScore} newHs={results.newHighScore}/>
					<GameList games={results.games}/>
				</div>
			);
		} else if (results.errors > 0) {
			return (
				<span>There was an error in game search. Please try again.</span>
			);
		}
	},

	render: function() {
		return (
			<div className="personal-games">
				<h1>Games component</h1>
				{this.renderComponents()}
			</div>
		);
	}
});

module.exports = PersonalGamesController;