"use strict";

var React = require("react");
var Image = require("../Common/Image");
var Util = require("../../util/utils");
var Link = require("react-router").Link;
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
		return <div className="search-result">An error occurred. Please try again</div>;
	},

	gotResults: function() {
		var summoner = this.props.searchResult.summoner;

		if (!summoner) {
			return <div className="search-result">No summoner found.</div>;
		}

		if (_.isEmpty(summoner)) {
			return;
		}

		var handleClick = this.clickHandler.bind(this, summoner);

		var profileIconUrl = Util.buildProfileIconUrl(summoner.profileIconId);

		return (
			<Link to={"/" + summoner.id + "/" + summoner.region}>
				<div onClick={handleClick} 
					className="search-result">
					<div className="thumbnail-container">
						<Image src={profileIconUrl} alt={"summoner icon"} />
					</div>
					<span className="name">{summoner.name}</span>
					<span className="level">
						{"level "}
						<span className="emphasis">
							{summoner.level}
						</span>
					</span>
				</div>
			</Link>
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