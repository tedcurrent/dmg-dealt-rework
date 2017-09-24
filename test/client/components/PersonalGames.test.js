"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import sinon from "sinon";
import mockApiPersonalResults from "../mocks/mockApiPersonalResults";
import PersonalGames from "../../../src/js/components/PersonalGames/";
import GameList from "../../../src/js/components/PersonalGames/GameList";
import GameListItem from "../../../src/js/components/PersonalGames/GameListItem";
import PersonalContainer from "../../../src/js/components/PersonalGames/PersonalContainer";
import TopGame from "../../../src/js/components/PersonalGames/TopGame";
import ApiRequestActions from "../../../src/js/actions/ApiRequestActions";

test("<PersonalGames />", (t) => {
  const getPersonalGames = sinon.stub(ApiRequestActions, "getPersonalGames");
  const wrapper = shallow(<PersonalGames params={{ id: 51520537, region: "euw" }} />);

  t.ok(!wrapper.find("div").children().length, "Should render empty <div /> initially");
  t.ok(getPersonalGames.calledWith({ id: 51520537, region: "euw" }), "Should call API with correct parameters");

  wrapper.setState({ gameResults: mockApiPersonalResults() });
  t.ok(wrapper.find("PersonalContainer").length, "Should render <PersonalContainer /> if results");

  wrapper.setState({ gameResults: mockApiPersonalResults({ errors: 1 }) });
  t.ok(wrapper.find("ErrorPage").length, "Should render <ErrorPage /> if errors length > 0");

  getPersonalGames.restore();
  t.end();
});

test("<GameList />", (t) => {
  const games = mockApiPersonalResults().games;
  const wrapper = shallow(<GameList games={games} />);

  t.equal(wrapper.find("GameListItem").length, games.length, "Should have rendered all games in the list");

  t.end();
});

test("<GameListItem />", (t) => {
  const wrapper = shallow(<GameListItem game={{ gameId: 123 }} />);

  t.ok(wrapper.find("li").length, "Should render an <li />");
  t.ok(wrapper.find("GameWrapper").length, "Should render a <GameWrapper /> component");

  t.end();
});

test("<PersonalContainer />", (t) => {
  const wrapper = shallow(<PersonalContainer results={mockApiPersonalResults()} />);

  t.ok(wrapper.find("GamesContainer").length, "Should render a <GamesContainer /> component");
  t.ok(wrapper.find("TopGame").length, "Should render a <TopGame /> component");
  t.ok(wrapper.find("GameList").length, "Should render a <GameList /> component");

  t.end();
});

test("<TopGame />", (t) => {
  const results = mockApiPersonalResults({ newHighScore: false });
  const wrapper = shallow(
    <TopGame
      summoner={results.summoner}
      topGame={results.highScore}
      newHs={results.newHighScore}
    />
  );

  t.ok(wrapper.find("GameWrapper").length, "Should render a <GameWrapper /> component");
  t.ok(wrapper.props().gameClass.includes("old"), "Should have 'old' score styling");

  wrapper.setProps({ newHs: true });
  t.ok(wrapper.props().gameClass.includes("new"), "Should have 'new' score styling");

  t.end();
});