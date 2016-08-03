"use strict";

var React = require("react");
import ErrorPage from "../Error";
var RegionContainer = require("./RegionContainer");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var RegionalGamesStore = require("../../stores/RegionalGamesStore");

// A wrapper for regional top scores page
var RegionalGamesController = React.createClass({
	getInitialState: function() {
		return {
			regionalResults: RegionalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		this._refreshRegionals();
		RegionalGamesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		RegionalGamesStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return this._renderComponents();
	},

	// Renders a list of games OR an error OR nothing
	_renderComponents: function() {
		var results = this.state.regionalResults;

		if (results.errors === 0 && results.games.length) {
			return this._renderGames(results);
		} else if (results.errors) {
			return this._renderError();
		} else {
			return this._renderNothing();
		}
	},

	_renderGames: function(results) {
		return <RegionContainer results={results} />;
	},

	_renderError: function() {
		return (
			<ErrorPage
				errorNumber={"500"}
				errorMessage={"There was an error in game search."}
				errorDetail={"Please try again later."}
			/>
		);
	},

	_renderNothing: function() {
		return <div></div>;
	},

	_onChange: function() {
		this.setState({regionalResults: RegionalGamesStore.getAll()});
	},

	_refreshRegionals: function() {
		ApiRequestActions.getRegionalGames();
	}
});

module.exports = RegionalGamesController;