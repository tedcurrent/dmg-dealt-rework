"use strict";

import React from "react";
import test from "tape";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import Search from "../../../src/js/components/Search/";
import SearchResult from "../../../src/js/components/Search/SearchResult";

const mockSummoner = {
	id: 51520537,
	name: "tetsii",
	profileIconId: 28,
	region: "euw",
	level: 30
};

test("<Search />", (t) => {
	const wrapper = mount(<Search />, {context: {router: {}}});

	wrapper.setState({results: {summoner: mockSummoner}});
	t.ok(wrapper.find("SearchResult").length, "Should have a search result if summoner exists");

	wrapper.find("#search-input").simulate("keydown", {key: "ArrowDown"});
	wrapper.setState({results: {summoner: mockSummoner}});
	t.ok(wrapper.state().resultSelected, "Should select result on ArrowDown");

	wrapper.find("#search-input").simulate("keydown", {key: "ArrowDown"});
	wrapper.setState({results: {summoner: mockSummoner}});
	t.ok(!wrapper.state().resultSelected, "Should de-select result on ArrowDown");

	wrapper.setState({input: {summoner: "eskaroo", region: "euw"}});
	t.equal(wrapper.find("#search-input").props().value, "eskaroo", "Should have simulated input value");

	wrapper.setState({input: {summoner: "eskaroo", region: "eune"}});
	t.equal(wrapper.find("select").props().value, "eune", "Should have simulated input value");

	wrapper.setState({results: {summoner: false}});
	t.ok(wrapper.find(".search-result").text("No summoner found."), "Should have text when no result");

	t.end();
});

test("<SearchResult />", (t) => {
	const mockClick = sinon.spy();
	const wrapper = shallow(
		<SearchResult 
			summoner={mockSummoner}
			onClick={mockClick}
			resultSelected={false}
		/>
	);

	t.ok(!wrapper.find(".search-result").hasClass("selected"), "Should not be selected");

	wrapper.setProps({resultSelected: true});
	t.ok(wrapper.find(".search-result").hasClass("selected"), "Should be selected after prop change");
	
	wrapper.find(".search-result").simulate("click");
	t.ok(mockClick.calledOnce, "Should have registered a single click");

	t.end();
});