"use strict";

var React = require("react");
var Search = require("../Search/index");
var Link = require("react-router").Link;

var Header = React.createClass({
	render: function() {
		return (
			<header>
				<span className="logo">
					<a href="/">DMGDealt</a>
				</span>
				<Search />

				<ul>
					<li>
						<Link to="/regions">
							<i className="fa fa-globe" aria-hidden="true"></i>
						</Link>
					</li>
				</ul>
			</header>
		);
	}
});

module.exports = Header;