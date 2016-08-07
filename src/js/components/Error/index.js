"use strict";

import React from "react";

// Rendered upon errors (eg. 404)
export default function ErrorPage(props) {
	return (
		<div className="splash">
			<div className="text-container">
				<h1>{props.errorNumber}</h1>
				<h2>{props.errorMessage}</h2>
				<h2>{props.errorDetail}</h2>
			</div>
		</div>
	);
}