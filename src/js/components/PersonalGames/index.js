"use strict";

var React = require("react");
var TopGame = require("./TopGame");
var GameList = require("./GameList");
var SummonerInfo = require("./SummonerInfo");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var PersonalGamesStore = require("../../stores/PersonalGamesStore");
var _ = require("lodash");

var _refreshGames = function(props) {
	var query = {
		id: props.params.id,
		region: props.params.region
	};

	ApiRequestActions.getPersonalGames(query);
};

var PersonalGamesController = React.createClass({
	getInitialState: function() {
		return {
			gameResults: PersonalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		_refreshGames(this.props);

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

	componentWillReceiveProps: function(nextProps) {
		_refreshGames(nextProps);
	},

	renderComponents: function() {
		var results = this.state.gameResults;

		if (results.errors === 0 && !_.isEmpty(results.summoner)) {
			return (
				<div>
					<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
					<h3>Last 10 Days of DMG</h3>
					<GameList games={results.games}/>
				</div>
			);
		} else if (results.errors) {
			return (
				<h3 className="error">There was an error in game search. Please try again.</h3>
			);
		}
	},

	render: function() {
		return (
			<div className="games-container">
				{this.renderComponents()}
			</div>
		);
	}
});

module.exports = PersonalGamesController;