"use strict";

import React from "react";
import ErrorPage from "../Error";

class NotFoundPage extends React.Component {
	render() {
		return (
			<ErrorPage
				errorNumber={404}
				errorMessage={"Page Not Found"}
			/>
		);
	}
}

export default NotFoundPage;