"use strict";

var React = require("react");
var TopGame = require("./TopGame");
var GameList = require("./GameList");
var SummonerInfo = require("./SummonerInfo");
var ErrorPage = require("../Error");
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
				<div className="games-container">
					<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
					<h3>Last 10 Days of DMG</h3>
					<GameList games={results.games}/>
				</div>
			);
		} else if (results.errors) {
			return (
				<ErrorPage
					errorNumber={404}
					errorMessage={"No games found with the name and region combination. Please try something else."}
				/>
			);
		} else {
			return (<div></div>);
		}
	},

	render: function() {
		return this.renderComponents();
	}
});

module.exports = PersonalGamesController;