"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import sinon from "sinon";
import mockApiRegionalResults from "../mocks/mockApiRegionalResults";
import RegionalGames from "../../../src/js/components/RegionalGames/";
import RegionContainer from "../../../src/js/components/RegionalGames/RegionContainer";
import RegionalGame from "../../../src/js/components/RegionalGames/RegionalGame";
import ApiRequestActions from "../../../src/js/actions/ApiRequestActions";

test("<RegionalGames />", (t) => {
	const getRegionalGames = sinon.stub(ApiRequestActions, "getRegionalGames");
	const wrapper = shallow(<RegionalGames />);

	t.ok(!wrapper.find("div").children().length, "Should render empty <div /> initially");
	t.ok(getRegionalGames.called, "Should call API without parameters");

	wrapper.setState({regionalResults: mockApiRegionalResults()});
	t.ok(wrapper.find("RegionContainer").length, "Should render <RegionContainer /> if results");

	wrapper.setState({regionalResults: mockApiRegionalResults({errors: 1})});
	t.ok(wrapper.find("ErrorPage").length, "Should render <ErrorPage /> if errors length > 0");

	getRegionalGames.restore();
	t.end();
});

test("<RegionContainer />", (t) => {
	const results = mockApiRegionalResults();
	const wrapper = shallow(<RegionContainer results={results}/>);

	t.equal(wrapper.find("RegionalGame").length, results.games.length, "Should have rendered all games in the list");

	t.end();
});

test("<RegionalGame />", (t) => {
	const game = mockApiRegionalResults().games[0];
	const wrapper = shallow(<RegionalGame highScore={game.highScore} region={game._id} />);

	t.ok(wrapper.find("GameWrapper").length, "Should render <GameWrapper />"); 
	t.ok(wrapper.find("GameWrapper").length, "Should render <SummonerInfo />"); 

	t.end();
});