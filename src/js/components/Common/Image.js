"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

// A common component that should be used for every image
var Image = React.createClass({
	getInitialState: function() {
		return {
			loaded: false,
			errored: false
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

	changeToDefault: function() {
		this.setState({errored: true});
	},

	render: function() {
		var imgClass = !this.state.loaded ? "image" : "image loaded";
		var imgSrc = !this.state.errored ? this.props.src : this.props.defaultImage;
		return (
			<img onError={this.changeToDefault} ref="img" src={imgSrc} alt={this.props.alt} className={imgClass} />
		);
	}
});

module.exports = Image;