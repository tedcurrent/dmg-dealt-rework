"use strict";

var React = require("react");
var Header = require("./components/Header/");
var Main = require("./components/Main/");
var PersonalGamesStore = require("./stores/PersonalGamesStore");

var App = React.createClass({
	getInitialState: function() {
		return {
			gameResults: PersonalGamesStore.getAll()
		};
	},

	componentWillMount: function() {
		PersonalGamesStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		PersonalGamesStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			gameResults: PersonalGamesStore.getAll()
		});
	},

	render: function() {
		return (
			<div>
				<Header />
				<Main
					gameResults={this.state.gameResults}
				>
					{this.props.children}
				</Main>
			</div>
		);
	}
});

module.exports = App;