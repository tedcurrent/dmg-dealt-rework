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
		code: "euw"
	},
	{
		description: "EUNE",
		code: "eune"
	},
	{
		description: "NA",
		code: "na"
	},
	{
		description: "KR",
		code: "kr"
	},
	{
		description: "CN",
		code: "cn"
	},
	{
		description: "LAN",
		code: "lan"
	}
];

var Search = React.createClass({
	getInitialState: function() {
		return {
			searchResults: SummonerSearchStore.getAll(),
			regionSelected: "euw",
			querySent: false,
			queryValue: ""
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
		this.setState({regionSelected: value}, function() {
			this.anyInputChange();
		}.bind(this));
	},

	queryStringChange: function(value) {
		this.setState({queryValue: value}, function() {
			this.anyInputChange();
		}.bind(this));
	},

	anyInputChange: function() {
		this.setState({querySent: false}, function() {
			clearTimeout(this._timeOut);
			this._timeOut = setTimeout(function() {
				this.querySubmit();
				this.setState({querySent: true});
			}.bind(this), 400);
		});

		if (!this.state.queryValue) {
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

	render: function() {
		return (
			<div id="search">
				<h1>I am search</h1>
				<SearchInputContainer>
					<SearchInput 
						value={this.state.queryValue}
						querySent={this.state.querySent}
						onChange={this.queryStringChange}
					/>
					<SearchDropDown
						options={regionOptions} 
						value={this.state.regionSelected}
						labelField="description"
						valueField="code"
						onChange={this.dropDownChange}
					/>
				</SearchInputContainer>
				<SearchResult 
					searchResult={this.state.searchResults}
				/>
			</div>
		);
	}
});

module.exports = Search;