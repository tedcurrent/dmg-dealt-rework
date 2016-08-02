"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

// A common component for images
var Image = React.createClass({
	getInitialState: function() {
		return {
			loaded: false,
			errored: false
		};
	},

	onImageLoad: function() {
		this.setState({loaded: true});
	},

	componentDidMount: function() {
		var imgTag = ReactDOM.findDOMNode(this.refs.img);
		var imgSrc = imgTag.getAttribute("src");
		var img = new window.Image();
		img.src = imgSrc;
	},

	render: function() {
		var imgClass = !this.state.loaded ? "image" : "image loaded";
		var imgSrc = !this.state.errored ? this.props.src : this.props.defaultImage;
		return (
			<img 
				ref="img" src={imgSrc}
				alt={this.props.alt}
				className={imgClass}
				onError={this._changeToDefault}
				onLoad={this.onImageLoad}
			/>
		);
	},

	_changeToDefault: function() {
		this.setState({errored: true});
	}
});

module.exports = Image;