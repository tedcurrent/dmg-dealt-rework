"use strict";

var React = require("react");
var SearchResultThumbnail = require("./SearchResultThumbnail");
var _ = require("lodash");

var SearchResult = React.createClass({
	render: function() {
		return (
			<div>
				{_.isEmpty(this.props.summoner) ? this._emptyResult() : this._renderResult()}
			</div>
		);
	},

	_emptyResult: function() {
		return;
	},

	_renderResult: function() {
		var summoner = this.props.summoner;
		return (
			<div 
				onClick={this.props.onClick} 
				className={this.props.resultSelected ? "search-result selected" : "search-result"}
			>
				<SearchResultThumbnail icon={summoner.profileIconId} />
				<span className="name">{summoner.name}</span>
				<span className="level">
					{"level "} <span className="emphasis">{summoner.level}</span>
				</span>
			</div>
		);
	}
});

module.exports = SearchResult;