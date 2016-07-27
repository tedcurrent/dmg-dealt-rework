"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameOverlay from "../../../src/js/components/Game/GameOverlay";

test("<GameOverlay />", (t) => {
	const props = {
		statsOpen: false
	};
	const wrapper = shallow(<GameOverlay {...props} />);

	t.ok(wrapper.find("span").text("Show stats"), "Should render 'Show stats' when stats are hidden");
	t.ok(wrapper.find("i").hasClass("fa-chevron-down"), "Should render downwards chevron when stats are hidden");

	wrapper.setProps({statsOpen: true});
	t.ok(wrapper.find("span").text("Hide stats"), "Should render 'Hide stats' when stats are shown");
	t.ok(wrapper.find("i").hasClass("fa-chevron-up"), "Should render upwards chevron when stats are shown");

	t.end();
});