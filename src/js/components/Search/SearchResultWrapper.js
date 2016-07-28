"use strict";

var React = require("react");
var SearchResult = require("./SearchResult");

// A search result wrapper with multiple rendering options based on state
var SearchResultWrapper = React.createClass({
	componentDidMount: function() {
		document.addEventListener("click", this._bodyClickHandler);
	},

	componentWillUnmount: function() {
		document.removeEventListener("click", this._bodyClickHandler);
	},

	render: function() {
		return (
			<div className="search-result-container">
				{this._renderResults()}
			</div>
		);
	},

	_bodyClickHandler: function(e) {
		this.props.bodyClick(e);
	},

	_renderResults: function() {
		if (this.props.searchResult.errors) {
			return <div className="search-result error">An error occurred. Please try again</div>;
		}
		if (!this.props.queryLengthOk) {
			return <div className="search-result error">A summoner name should be at least 2 characters.</div>;
		}

		if (!this.props.searchResult.summoner) {
			return <div className="search-result">No summoner found.</div>;
		}

		return (
			<SearchResult
				onClick={this.props.onClick}
				summoner={this.props.searchResult.summoner}
				resultSelected={this.props.resultSelected}
			/>
		);
	}
});

module.exports = SearchResultWrapper;