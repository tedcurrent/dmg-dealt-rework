"use scrict";

var React = require("react");

var Test = React.createClass({
	render: function() {
		return (
			<div className="test">
				<p>I am hohoho {this.props.test}</p>
			</div>
		);
	}
});

module.exports = Test;