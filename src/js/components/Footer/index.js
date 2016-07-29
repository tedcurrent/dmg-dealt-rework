"use strict";

var React = require("react");

// Footer
var Footer = React.createClass({
	render: function() {
		return (
			<footer>
				<span>
					&copy;
					<a href="mailto:teemu.virta@pp2.inet.fi" target="_top"> Teemu Virta </a>
					<span className="year">{new Date().getFullYear()}</span>
				</span>
			</footer>
		);
	}
});

module.exports = Footer;