"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import SummonerInfo from "../../../src/js/components/Game/SummonerInfo";

test("<SummonerInfo />", (t) => {
	const props = {
		summoner: {
			summonerName: "tetsii"
		},
		info: "extra details"
	};
	const wrapper = shallow(<SummonerInfo {...props} />);
	const summonerInfo = wrapper.find(".summoner-info");

	t.ok(summonerInfo.text(props.summoner.summonerName), "Should have rendered summoner name text");
	t.ok(summonerInfo.text(props.info), "Should have rendered extra info text");

	t.end();
});