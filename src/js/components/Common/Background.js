"use strict";

var React = require("react");
var AppConstants = require("../../constants/AppConstants");
var Util = require("../../util/utils");

var Background = React.createClass({
	render: function() {
		var splashUrl = Util.championSplashUrl(this.props.champion);
		var gameBackgroundStyle = {
			background: "url(" + splashUrl + ")",
			backgroundPosition: "50% 20%",
			backgroundSize: "cover" 
		};
		
		return (
			<div className="game-background" style={gameBackgroundStyle}></div>
		);
	}
});

module.exports = Background;