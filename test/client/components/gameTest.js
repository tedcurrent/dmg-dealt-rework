"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Game from "../../../src/js/components/Game/";

test("<Game />", (t) => {
	const props = {
		game: {},
		gameClass: "game",
		statsOpen: false
	};
	const wrapper = shallow(<Game {...props}><div className="dummyDiv" /></Game>);

	t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");
	t.ok(wrapper.find("Collapse").length, "Should contain a <Collapse />");
	t.ok(!wrapper.find("GameStats").length, "Should not contain <GameStats /> on initial render");

	wrapper.find("GameHeader").simulate("click");
	t.ok(wrapper.find("GameStats").length, "Should contain <GameStats /> after click");

	wrapper.find("GameHeader").simulate("click");
	t.ok(!wrapper.find("GameStats").length, "Should not contain <GameStats /> after second click");

	t.end();
});