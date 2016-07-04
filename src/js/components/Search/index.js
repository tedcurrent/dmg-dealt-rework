"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var SearchInputContainer = require("./SearchInputContainer");
var SearchResultWrapper = require("./SearchResultWrapper");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var ApiResponseActions = require("../../actions/ApiResponseActions");
var SummonerSearchStore = require("../../stores/SummonerSearchStore");
var Util = require("../../util/utils");
var _ = require("lodash");

// Search controller
var Search = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			searchResults: SummonerSearchStore.getAll(),
			regionSelected: "euw",
			queryValue: "",
			queryLengthOk: true,
			resultSelected: false
		};
	},

	componentWillMount: function() {
		SummonerSearchStore.addChangeListener(this._onChange);
		this._anyInputChange = _.debounce(this._anyInputChange, 400);
	},

	componentWillUnmount: function() {
		SummonerSearchStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div className="search">
				<SearchInputContainer
					queryValue={this.state.queryValue}
					resultSelected={this.state.resultSelected}
					queryStringChange={this._queryStringChange}
					resultSubmitHandler={this._resultSubmitHandler}
					arrowKeyNavigation={this._arrowKeyNavigation}
					regionSelected={this.state.regionSelected}
					dropDownChange={this._dropDownChange}
				/>
				<SearchResultWrapper 
					searchResult={this.state.searchResults}
					queryLengthOk={this.state.queryLengthOk}
					onClick={this._resultSubmitHandler}
					bodyClick={this._bodyClickHandler}
					resultSelected={this.state.resultSelected}
				/>
			</div>
		);
	},

	_onChange: function() {
		this.setState({searchResults: SummonerSearchStore.getAll()});
	},

	_dropDownChange: function(value) {
		this.setState({regionSelected: value}, this._anyInputChange);
	},

	_queryStringChange: function(value) {
		this.setState({queryValue: value}, this._anyInputChange);
	},

	// Calls to this are debounced (see lifecycle) to avoid server call overload
	_anyInputChange: function() {
		this._resetResults();
		this._validateQueryLength(this.state.queryValue, function() {
			if (this.state.queryLengthOk)
				this._querySubmit();
		}.bind(this));
	},

	_querySubmit: function() {
		var query = {
			summonerName: this.state.queryValue,
			summonerRegion: this.state.regionSelected
		};
		ApiRequestActions.getSummoner(query);
		this.setState({querySent: true});
	},

	_resetResults: function() {
		ApiResponseActions.updateSummonerSearchResult({});
		this._arrowKeyNavigation(false);
		this.setState({queryLengthOk: true});
	},

	_resultSubmitHandler: function() {
		var summoner = this.state.searchResults.summoner;
		this.context.router.push("/" + summoner.id + "/" + summoner.region);
		this._resetResults();
	},

	_bodyClickHandler: function(e) {
		if (!ReactDOM.findDOMNode(this).contains(e.target))
			this._resetResults();
	},

	_arrowKeyNavigation: function(selected) {
		this.setState({resultSelected: selected});
	},

	_validateQueryLength: function(queryValue, callback) {
		this.setState({queryLengthOk: Util.isQueryLengthOk(queryValue)}, callback);
	}
});

module.exports = Search;