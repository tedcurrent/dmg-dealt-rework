"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var Image = React.createClass({
	getInitialState: function() {
		return {
			loaded: false
		};
	},

	onImageLoad: function() {
		if (this.isMounted()) {
			this.setState({loaded: true});
		}
	},

	componentDidMount: function() {
		var imgTag = ReactDOM.findDOMNode(this.refs.img);
		var imgSrc = imgTag.getAttribute("src");
		var img = new window.Image();
		img.onload = this.onImageLoad;
		img.src = imgSrc;
	},

	render: function() {
		var imgClass = !this.state.loaded ? "image" : "image loaded";
		return (
			<img ref="img" src={this.props.src} alt={this.props.alt} className={imgClass} />
		);
	}
});

module.exports = Image;