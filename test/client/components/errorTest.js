"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import ErrorPage from "../../../src/js/components/Error";

test("<Error />", (t) => {
	const props = {
		errorNumber: "667",
		errorMessage: "You had an error!",
		errorDetail: "Please ALT+F4 right now."
	};

	const wrapper = shallow(
		<ErrorPage {...props} />
	);

	const textContainer = wrapper.find(".text-container");

	t.ok(textContainer.contains(<h1>{props.errorNumber}</h1>), "Should have error number");
	t.ok(textContainer.contains(<h2>{props.errorMessage}</h2>), "Should have error message");
	t.ok(textContainer.contains(<h2>{props.errorDetail}</h2>), "Should have error detail");

	t.end();
});