"use strict";

var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var shortid = require("shortid");

var Collapse = React.createClass({
	render: function() {
		return (
			<ReactCSSTransitionGroup 
				transitionName="animate-collapse"
				transitionEnterTimeout={250}
				transitionLeaveTimeout={250}
			>
				<div className="collapse" key={shortid.generate()}>
					{this.props.children}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
});

module.exports = Collapse;