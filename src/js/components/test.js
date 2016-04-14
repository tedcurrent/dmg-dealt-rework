"use scrict";

var React = require("react");
var ApiRequestActions = require("../actions/ApiRequestActions");
var SummonerSearchStore = require("../stores/SummonerSearchStore");

var Test = React.createClass({
	test: function(e) {
		e.preventDefault();
		var query = {
			summonerName: "taist    elusamppa",
			summonerRegion: "euasdw"
		};
		ApiRequestActions.getSummoner(query);
	},

	render: function() {
		return (
			<div className="test">
				<form>
					<input type="submit" value="Get summoner" onClick={this.test}/>
				</form>
			</div>
		);
	}
});

module.exports = Test;