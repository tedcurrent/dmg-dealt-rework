"use strict";

import React from "react";
import ReactDOM from "react-dom";

// A common component for images
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      errored: false
    };
    this._changeToDefault = this._changeToDefault.bind(this);
    this._onImageLoad = this._onImageLoad.bind(this);
  }

  componentDidMount() {
    const imgTag = ReactDOM.findDOMNode(this.refs.img);
    const imgSrc = imgTag.getAttribute("src");
    const img = new window.Image();
    img.src = imgSrc;
  }

  render() {
    const imgClass = !this.state.loaded ? "image" : "image loaded";
    const imgSrc = !this.state.errored ? this.props.src : this.props.defaultImage;
    return (
      <img
        ref="img" src={imgSrc}
        alt={this.props.alt}
        className={imgClass}
        onError={this._changeToDefault}
        onLoad={this._onImageLoad}
      />
    );
  }

  _changeToDefault() {
    this.setState({ errored: true });
  }

  _onImageLoad() {
    this.setState({ loaded: true });
  }
}