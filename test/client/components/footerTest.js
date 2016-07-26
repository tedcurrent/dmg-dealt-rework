"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Footer from "../../../src/js/components/Footer";

test("<Footer />", (t) => {
	const wrapper = shallow(<Footer />);

	t.equal(wrapper.find(".year").text(), new Date().getFullYear().toString(), "Should change year text dynamically");

	t.end();
});