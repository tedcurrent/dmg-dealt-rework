"use strict";

var React = require("react");

// Footer
var Footer = React.createClass({
	render: function() {
		var dateNow = new Date();
		return (
			<footer>
				<span>
					&copy;
					<a href="mailto:teemu.virta@pp2.inet.fi" target="_top"> Teemu Virta </a>
					{dateNow.getFullYear()}
				</span>
			</footer>
		);
	}
});

module.exports = Footer;