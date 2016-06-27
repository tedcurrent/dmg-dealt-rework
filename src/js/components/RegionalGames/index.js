"use strict";

var React = require("react");
var RegionalGame = require("./RegionalGame");
var ErrorPage = require("../Error");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var RegionalGamesStore = require("../../stores/RegionalGamesStore");
var _ = require("lodash");

// A wrapper for regional top scores page
var RegionsPage = React.createClass({
	getInitialState: function() {
		return {
			regionalResults: RegionalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		_refreshRegionals();

		RegionalGamesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		RegionalGamesStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			regionalResults: RegionalGamesStore.getAll()
		});
	},

	// Renders either top game results, error or nothing
	renderComponents: function() {
		var results = this.state.regionalResults;

		if (results.errors === 0 && results.games.length) {
			return _renderGames(results);
		} else if (results.errors) {
			return _renderError();
		} else {
			return _renderNothing();
		}
	},

	render: function() {
		return this.renderComponents();
	}
});

var _refreshRegionals = function() {
	ApiRequestActions.getRegionalGames();
};

var _renderGames = function(results) {
	return (
		<div className="games-container">
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
};

var _renderError = function() {
	return (
		<ErrorPage
			errorNumber={"500"}
			errorMessage={"There was an error in game search."}
			errorDetail={"Please try again later."}
		/>
	);
};

var _renderNothing = function() {
	return <div></div>;
};

module.exports = RegionsPage;