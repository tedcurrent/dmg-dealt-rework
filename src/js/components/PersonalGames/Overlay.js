"use strict";

var React = require("react");
var AppConstants = require("../../constants/AppConstants");
var Util = require("../../util/utils");

var Overlay = React.createClass({
	render: function() {
		var splashUrl = Util.championSplashUrl(this.props.champion);
		var overlayStyle = {
			background: "url(" + splashUrl + ")",
			backgroundPosition: "50% 20%",
			backgroundSize: "cover" 
		};
		return (
			<div className="overlay" style={overlayStyle}></div>
		);
	}
});

module.exports = Overlay;