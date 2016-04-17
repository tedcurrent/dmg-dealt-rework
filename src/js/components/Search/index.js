"use strict";

var React = require("react");
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
	getInitialState: function() {
		return {
			searchResults: SummonerSearchStore.getAll(),
			regionSelected: "euw",
			querySent: false,
			queryValue: "",
			canBlur: true
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
		this.setState({canBlur: true});
	},

	resultClickHandler: function(summoner) {
		var query = summoner;
		ApiRequestActions.getPersonalGames(query);
		this.resetResults();
	},

	toggleAllowBlur: function() {
		this.setState({canBlur: !this.state.canBlur});
	},

	blurHandler: function() {
		if (this.state.canBlur) {
			this.resetResults();
		}
	},

	render: function() {
		return (
			<div id="search">
				<SearchInputContainer>
					<SearchInput 
						value={this.state.queryValue}
						querySent={this.state.querySent}
						onChange={this.queryStringChange}
						onBlur={this.blurHandler}
					/>
					<SearchDropDown
						options={regionOptions} 
						value={this.state.regionSelected}
						labelField="description"
						valueField="short"
						onChange={this.dropDownChange}
						onHover={this.toggleAllowBlur}
					/>
				</SearchInputContainer>
				<SearchResult 
					searchResult={this.state.searchResults}
					onClick={this.resultClickHandler}
					onHover={this.toggleAllowBlur}
				/>
			</div>
		);
	}
});

module.exports = Search;