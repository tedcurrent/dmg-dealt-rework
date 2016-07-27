"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import { spy } from "sinon";
import GameHeader from "../../../src/js/components/Game/GameHeader";

test("<GameHeader />", (t) => {
	const props = {
		gameClass: "game",
		game: {
			champion: "Lulu"
		},
		statsOpen: false
	};
	const mockClick = spy();
	const wrapper = shallow(
		<GameHeader {...props} onClick={mockClick}>
			<div className="dummyDiv" />
		</GameHeader>
	);

	t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");

	wrapper.simulate("click");
	t.ok(mockClick.calledOnce, "Should have called click handler upon click");

	t.end();
});