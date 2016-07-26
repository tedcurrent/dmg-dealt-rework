"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Collapse from "../../../src/js/components/common/Collapse";

test("<Collapse />", (t) => {
	const wrapper = shallow(
		<Collapse>
			<div className="dummyDiv" />
		</Collapse>
	);

	t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");
	t.ok(wrapper.find(".collapse").key(), "Should have a key value");

	t.end();
});