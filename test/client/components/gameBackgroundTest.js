"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameBackground from "../../../src/js/components/Game/GameBackground";

test("<GameBackground />", (t) => {
	const props = {
		champion: "Lulu"
	};

	const wrapper = shallow(<GameBackground {...props} />);

	t.ok(wrapper.props().style.background.includes(props.champion), "Should have correct background image");

	t.end();
});