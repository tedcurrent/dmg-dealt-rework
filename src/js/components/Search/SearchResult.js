"use strict";

var React = require("react");
var Image = require("../Common/Image");

var SearchResult = React.createClass({
	noResults: function() {
		return "No results";
	},

	gotResults: function() {
		if (!this.props.searchResult.summoner.id) {
			return;
		}
		return (
			<div>
				<div className="thumbnail-container">
					<Image src={this.props.searchResult.summoner.profileIconUrl} alt={"summoner icon"} />
				</div>
				<span>{this.props.searchResult.summoner.name}</span>
				<span>{this.props.searchResult.summoner.region}</span>
				<span>{this.props.searchResult.summoner.level}</span>
			</div>
		);
	},

	render: function() {
		return (
			<div className="search-result">
				{this.props.searchResult.errors ? this.noResults() : this.gotResults()}
			</div>
		);
	}
});

module.exports = SearchResult;