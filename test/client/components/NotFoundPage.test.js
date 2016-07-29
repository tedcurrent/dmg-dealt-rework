"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import NotFoundPage from "../../../src/js/components/404/";
import ErrorPage from "../../../src/js/components/Error/";

test("<NotFoundPage />", (t) => {
	const wrapper = shallow(<NotFoundPage />);
	
	t.ok(wrapper.find(ErrorPage).length, "Should have <ErrorPage />");

	t.end();
});