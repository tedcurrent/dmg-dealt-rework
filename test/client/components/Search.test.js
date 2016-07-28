"use strict";

import React from "react";
import test from "tape";
import { mount } from "enzyme";
import sinon from "sinon";
import ApiRequestActions from "../../../src/js/actions/ApiRequestActions";
import ApiResponseActions from "../../../src/js/actions/ApiResponseActions";
import Search from "../../../src/js/components/Search/";

// NOTE: Unable to write proper tests as lodash debounce doesn't work with sinon faketimers
test("<Search />", (t) => {
	const clock = sinon.useFakeTimers();
	const getSummoner = sinon.stub(ApiRequestActions, "getSummoner");
	const updateSummonerSearchResult = sinon.stub(ApiResponseActions, "updateSummonerSearchResult");
	const fakeRouter = {};
	const wrapper = mount(<Search />, {context: {router: fakeRouter}});

	// wrapper.find("#search-input").simulate("change", {target: {value: "t"}});
	// clock.tick(3000);
	// console.log(wrapper.state());
	// t.ok(wrapper.find(".search-result").hasClass("error"), "Should have error if bad query length");
	// t.ok(!getSummoner.called, "Should not call API if faulty input");

	getSummoner.restore();
	updateSummonerSearchResult.restore();
	clock.restore();
	t.end();
});