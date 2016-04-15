"use strict";

var React = require("react");

var SearchResult = React.createClass({
	noResults: function() {
		return "No results";
	},

	gotResults: function() {
		return (
			<div>
				<span>{this.props.searchResult.summoner.profileIconUrl}</span>
				<span>{this.props.searchResult.summoner.name}</span>
				<span>{this.props.searchResult.summoner.region}</span>
			</div>
		);
	},

	render: function() {
		return (
			<div className="search-result">
				{this.props.searchResult.errors > 0 ? this.noResults() : this.gotResults()}
			</div>
		);
	}
});

module.exports = SearchResult;