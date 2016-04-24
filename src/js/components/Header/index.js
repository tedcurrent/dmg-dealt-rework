"use strict";

var React = require("react");
var Search = require("../Search/index");
var Link = require("react-router").Link;
var ApiRequestActions = require("../../actions/ApiRequestActions");

var Header = React.createClass({
	clickHandler: function() {
		ApiRequestActions.cleanUpGames();
	},

	render: function() {
		return (
			<header>
				<span className="logo">
					<a href="/">DMGDealt</a>
				</span>
				<Search />

				<ul>
					<li>
						<Link to="/regions" onClick={this.clickHandler}>
							<i className="fa fa-globe" aria-hidden="true"> Regional</i>
						</Link>
					</li>
				</ul>
			</header>
		);
	}
});

module.exports = Header;