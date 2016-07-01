"use strict";

var React = require("react");
var ErrorPage = require("../Error");
var GamesContainer = require("./GamesContainer");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var PersonalGamesStore = require("../../stores/PersonalGamesStore");
var _ = require("lodash");

// Controller for the PersonalGames page
var PersonalGamesController = React.createClass({
	getInitialState: function() {
		return {
			gameResults: PersonalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		this._refreshGames(this.props);
		PersonalGamesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PersonalGamesStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function(nextProps) {
		this._refreshGames(nextProps);
	},

	render: function() {
		return this._renderComponents();
	},

	// Renders a list of games OR an error OR nothing
	_renderComponents: function() {
		var results = this.state.gameResults;

		if (results.errors === 0 && !_.isEmpty(results.summoner)) {
			return this._renderGames();
		} else if (results.errors) {
			return this._renderError();
		} else {
			return this._renderNothing();
		}
	},

	_renderGames: function(results) {
		return <GamesContainer results={this.state.gameResults} />;
	},

	_renderError: function() {
		return (
			<ErrorPage
				errorNumber={404}
				errorMessage={"No games found with the name and region combination."}
				errorDetail={"Please try something else."}
			/>
		);
	},

	_renderNothing: function() {
		return <div></div>;
	},

	_onChange: function() {
		this.setState({gameResults: PersonalGamesStore.getAll()});
	},

	_refreshGames: function(props) {
		var query = {
			id: props.params.id,
			region: props.params.region
		};

		ApiRequestActions.getPersonalGames(query);
	}
});

module.exports = PersonalGamesController;