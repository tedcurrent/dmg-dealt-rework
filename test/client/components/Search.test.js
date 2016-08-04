"use strict";

import React from "react";
import test from "tape";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import ApiRequestActions from "../../../src/js/actions/ApiRequestActions";
import ApiResponseActions from "../../../src/js/actions/ApiResponseActions";
import Search from "../../../src/js/components/Search/";
import SearchResult from "../../../src/js/components/Search/SearchResult";
import _ from "lodash";

// Override debounce while testing
_.debounce = function(func) {
	return func;
};

const mockSummoner = {
	id: 51520537,
	name: "tetsii",
	profileIconId: 28,
	region: "euw",
	level: 30
};

test("<Search />", (t) => {
	const getSummoner = sinon.stub(ApiRequestActions, "getSummoner");
	const updateSummonerSearchResult = sinon.stub(ApiResponseActions, "updateSummonerSearchResult");
	const wrapper = mount(<Search />, {context: {router: {}}});

	wrapper.find("#search-input").simulate("change", {target: {value: "eskaroo"}});
	t.ok(wrapper.find("SearchResult").length, "Should have a search result if good query");
	t.ok(getSummoner.calledWith({
		summonerName: "eskaroo", 
		summonerRegion: "euw"
	}), "Should call API with params if ok input");

	wrapper.find("#search-input").simulate("keydown", {key: "ArrowDown"});
	t.ok(!wrapper.state().resultSelected, "Should not select on ArrowDown without results");

	wrapper.find("select").simulate("change", {target: {value: "eune"}});
	t.ok(getSummoner.calledWith({
		summonerName: "eskaroo", 
		summonerRegion: "eune"
	}), "Should call API with params if ok input");

	wrapper.find("#search-input").simulate("change", {target: {value: "e"}});
	t.ok(wrapper.find(".search-result").hasClass("error"), "Should have error if bad query length");
	t.ok(!getSummoner.calledWith({
		summonerName: "e", 
		summonerRegion: "eune"
	}), "Should not call API if faulty input");

	wrapper.setState({searchResults: {errors: 1}});
	t.ok(wrapper.find(".search-result").hasClass("error"), "Should render error on error");

	getSummoner.restore();
	updateSummonerSearchResult.restore();
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