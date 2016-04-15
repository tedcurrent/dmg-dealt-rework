"use strict";

var React = require("react");
var Image = require("../Common/Image");
var _ = require("lodash");

var SearchResult = React.createClass({
	errorResult: function() {
		return "An error occurred. Please try again";
	},

	gotResults: function() {
		var summoner = this.props.searchResult.summoner;

		if (!summoner) {
			return "No summoner found.";
		}

		if (_.isEmpty(summoner)) {
			return;
		}

		return (
			<div>
				<div className="thumbnail-container">
					<Image src={summoner.profileIconUrl} alt={"summoner icon"} />
				</div>
				<span>{summoner.name}</span>
				<span>{summoner.region}</span>
				<span>{summoner.level}</span>
			</div>
		);
	},

	render: function() {
		return (
			<div className="search-result">
				{this.props.searchResult.errors ? this.errorResult() : this.gotResults()}
			</div>
		);
	}
});

module.exports = SearchResult;