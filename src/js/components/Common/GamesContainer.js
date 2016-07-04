"use strict";

var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");

var GamesContainer = React.createClass({
	render: function() {
		return (
			<ReactCSSTransitionGroup 
				transitionName="animate-games-container" 
				transitionAppear={true}
				transitionAppearTimeout={250}
			>
				<div className="games-container" key="games-container">
					{this.props.children}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
});

module.exports = GamesContainer;