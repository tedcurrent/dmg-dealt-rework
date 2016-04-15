"use strict";

var React = require("react");
var SearchInputContainer = require("./SearchInputContainer");
var SearchInput = require("./SearchInput");
var SearchDropDown = require("./SearchDropDown");
var SummonerSearchStore = require("../../stores/SummonerSearchStore");

var dropOptions = [
	{
		description: "EUW",
		code: "euw"
	},
	{
		description: "EUNE",
		code: "eune"
	}
];

var Search = React.createClass({
	getInitialState: function() {
		return {
			searchResults: SummonerSearchStore.getAll(),
			selected: "euw"
		};
	},

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

	dropDownOnChange: function(newValue) {
		console.log("old val: " + this.state.selected);
		this.setState({
			selected: newValue
		}, function() {
			console.log("new val: " + this.state.selected);
		});
	},

	render: function() {
		return (
			<div id="search">
				<h1>I am search</h1>
				<SearchInputContainer>
					<SearchInput />
					<SearchDropDown
						options={dropOptions} 
						value={this.state.selected}
						labelField="description"
						valueField="code"
						onChange={this.dropDownOnChange}
						/>
				</SearchInputContainer>

			</div>
		);
	}
});

module.exports = Search;