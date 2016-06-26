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
		} else if (results.errors) {
			return (
				<ErrorPage
					errorNumber={"500"}
					errorMessage={"There was an error in game search."}
					errorMessage2={"Please try again later."}
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

var _refreshRegionals = function() {
	ApiRequestActions.getRegionalGames();
};

module.exports = RegionsPage;