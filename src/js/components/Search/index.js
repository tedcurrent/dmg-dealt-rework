"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var SearchInputContainer = require("./SearchInputContainer");
var SearchInput = require("./SearchInput");
var SearchDropDown = require("./SearchDropDown");
var SearchResult = require("./SearchResult");
var ApiRequestActions = require("../../actions/ApiRequestActions");
var ApiResponseActions = require("../../actions/ApiResponseActions");
var SummonerSearchStore = require("../../stores/SummonerSearchStore");

var regionOptions = [
	{
		description: "EUW",
		short: "euw"
	},
	{
		description: "EUNE",
		short: "eune"
	},
	{
		description: "NA",
		short: "na"
	},
	{
		description: "KR",
		short: "kr"
	},
	{
		description: "CN",
		short: "cn"
	},
	{
		description: "LAN",
		short: "lan"
	}
];

var Search = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			searchResults: SummonerSearchStore.getAll(),
			regionSelected: "euw",
			querySent: false,
			queryValue: "",
			resultSelected: false
		};
	},

	timeOut: null,

	componentWillMount: function() {
		SummonerSearchStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SummonerSearchStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			searchResults: SummonerSearchStore.getAll()
		});
	},

	dropDownChange: function(value) {
		this.setState({regionSelected: value}, this.anyInputChange);
	},

	queryStringChange: function(value) {
		this.setState({queryValue: value}, this.anyInputChange);
	},

	anyInputChange: function() {
		this.setState({querySent: false}, function() {
			clearTimeout(this._timeOut);
			this._timeOut = setTimeout(function() {
				this.querySubmit();
				this.setState({querySent: true});
			}.bind(this), 400);
		});

		if (!this.state.queryValue || !this.state.regionSelected) {
			this.resetResults();
		}
	},

	querySubmit: function() {
		var query = {
			summonerName: this.state.queryValue,
			summonerRegion: this.state.regionSelected
		};
		ApiRequestActions.getSummoner(query);
	},

	resetResults: function() {
		ApiResponseActions.updateSummonerSearchResult({});
	},

	resultSubmitHandler: function() {
		this.context.router.push("/" + this.state.searchResults.summoner.id + "/" + this.state.searchResults.summoner.region);
		this.resetResults();
	},

	bodyClickHandler: function(e) {
		if (!ReactDOM.findDOMNode(this).contains(e.target)) {
			this.resetResults();
		}
	},

	arrowKeyNavigation: function(selected) {
		this.setState({resultSelected: selected});
	},

	render: function() {
		return (
			<div className="search">
				<SearchInputContainer>
					<SearchInput 
						value={this.state.queryValue}
						querySent={this.state.querySent}
						resultSelected={this.state.resultSelected}
						onChange={this.queryStringChange}
						onEnter={this.resultSubmitHandler}
						resultSelectedChange={this.arrowKeyNavigation}
					/>
					<SearchDropDown
						options={regionOptions} 
						value={this.state.regionSelected}
						labelField="description"
						valueField="short"
						onChange={this.dropDownChange}
					/>
				</SearchInputContainer>
				<SearchResult 
					searchResult={this.state.searchResults}
					onClick={this.resultSubmitHandler}
					bodyClick={this.bodyClickHandler}
					resultSelected={this.state.resultSelected}
				/>
			</div>
		);
	}
});

module.exports = Search;