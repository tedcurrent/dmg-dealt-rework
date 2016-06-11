"use strict";

var React = require("react");
var Image = require("../Common/Image");
var Util = require("../../util/utils");
var Link = require("react-router").Link;
var _ = require("lodash");

// A result component for rendering summoner icon, name and level
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
		return <div className="search-result">An error occurred. Please try again</div>;
	},

	// If results, render, else return or display "nothing found"
	gotResults: function() {
		var summoner = this.props.searchResult.summoner;

		if (!this.props.queryLengthOk) {
			return <div className="search-result">A summoner name should be at least 2 characters.</div>;
		}

		if (!summoner) {
			return <div className="search-result">No summoner found.</div>;
		}

		if (_.isEmpty(summoner)) {
			return;
		}

		var handleClick = this.clickHandler.bind(this, summoner);

		var profileIconUrl = Util.buildProfileIconUrl(summoner.profileIconId);

		var resultClass = "search-result";

		resultClass = this.props.resultSelected ? resultClass + " selected" : resultClass;

		return (
			<div onClick={handleClick} 
				className={resultClass}>
				<div className="thumbnail-container">
					<Image src={profileIconUrl} defaultImage={"/images/default_profile_icon.png"} alt={"summoner icon"} />
				</div>
				<span className="name">{summoner.name}</span>
				<span className="level">
					{"level "}
					<span className="emphasis">
						{summoner.level}
					</span>
				</span>
			</div>
		);
	},

	clickHandler: function(summoner) {
		this.props.onClick();
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