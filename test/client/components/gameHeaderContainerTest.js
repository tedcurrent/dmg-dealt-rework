"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameHeaderContainer from "../../../src/js/components/Game/GameHeaderContainer";

test("<GameHeaderContainer />", (t) => {
	const props = {
		game: {
			gameMode: "ARAM",
			champion: "Lulu",
			dmgDealt: 6667,
			gameDate: 1444670102143
		}
	};

	const wrapper = shallow(<GameHeaderContainer {...props} />);
	const gameHeaderContainer = wrapper.find(".game-header-container");

	t.ok(gameHeaderContainer.text(props.gameMode), "Should have rendered gameMode text");
	t.ok(gameHeaderContainer.text(props.champion), "Should have rendered champion text");
	t.ok(gameHeaderContainer.text(props.dmgDealt), "Should have rendered dmgDealt text");

	t.end();
});