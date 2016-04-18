"use strict";

var React = require("react");
var Image = require("../Common/Image");
var _ = require("lodash");

var SearchResult = React.createClass({
	componentDidMount: function() {
		document.addEventListener("click", this.bodyClickHandler);
	},

	componentWillUnmount: function() {
		document.removeEventListener("click", this.bodyClickHandler);
	},

	bodyClickHandler: function(e) {
		this.props.bodyClick(e);
	},

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

		var handleClick = this.clickHandler.bind(this, summoner);

		return (
			<div onClick={handleClick} 
				className="search-result">
				<div className="thumbnail-container">
					<Image src={summoner.profileIconUrl} alt={"summoner icon"} />
				</div>
				<span>{summoner.name}</span>
				<span>{summoner.region}</span>
				<span>{summoner.level}</span>
			</div>
		);
	},

	clickHandler: function(summoner) {
		this.props.onClick(summoner);
	},

	render: function() {
		return (
			<div className="search-result-container">
				{this.props.searchResult.errors ? this.errorResult() : this.gotResults()}
			</div>
		);
	}
});

module.exports = SearchResult;