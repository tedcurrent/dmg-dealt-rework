"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Test = require("./js/components/test");

ReactDOM.render(
	<Test test={"moro"}/>,
	document.getElementById("app")
);