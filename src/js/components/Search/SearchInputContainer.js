"use strict";

var React = require("react");
var SearchInput = require("./SearchInput");
var SearchDropDown = require("./SearchDropDown");
var AppConstants = require("../../constants/AppConstants");

// Search wrapper (input, dropdown..)
var SearchInputContainer = React.createClass({
	render: function() {
		return (
			<div className="input-container">
				<SearchInput 
					value={this.props.queryValue}
					resultSelected={this.props.resultSelected}
					onChange={this.props.queryStringChange}
					onEnter={this.props.resultSubmitHandler}
					resultSelectedChange={this.props.arrowKeyNavigation}
					summoner={this.props.searchResult.summoner}
				/>
				<SearchDropDown
					options={AppConstants.SEARCH_REGION_OPTIONS} 
					value={this.props.regionSelected}
					labelField="description"
					valueField="short"
					onChange={this.props.dropDownChange}
				/>
			</div>
		);
	}
});

module.exports = SearchInputContainer;