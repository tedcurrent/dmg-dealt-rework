"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import sinon from "sinon";
import Game from "../../../src/js/components/Game/";
import GameBackground from "../../../src/js/components/Game/GameBackground";
import GameHeader from "../../../src/js/components/Game/GameHeader";
import GameHeaderContainer from "../../../src/js/components/Game/GameHeaderContainer";
import GameOverlay from "../../../src/js/components/Game/GameOverlay";

const props = {
  game: {
    gameId: 2337165086,
    gameMode: "CLASSIC",
    champion: "Morgana",
    gameDate: 1444756345019,
    dmgDealt: 120003,
    stats: {
      timePlayed: 2312,
      kills: 4,
      deaths: 10,
      assists: 10,
      largestMultiKill: 1,
      physicalDamage: 6899,
      magicDamage: 20059,
      trueDamage: 666
    }
  }
};

test("<Game />", (t) => {
  const wrapper = shallow(<Game {...props}><div className="dummyDiv" /></Game>);

  t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");
  t.ok(wrapper.find("Collapse").length, "Should contain a <Collapse />");
  t.ok(!wrapper.find("GameStats").length, "Should not contain <GameStats /> on initial render");

  wrapper.find(GameHeader).simulate("click");
  t.ok(wrapper.find("GameStats").length, "Should contain <GameStats /> after click");

  wrapper.find(GameHeader).simulate("click");
  t.ok(!wrapper.find("GameStats").length, "Should not contain <GameStats /> after second click");

  t.end();
});

test("<GameBackground />", (t) => {
  const wrapper = shallow(<GameBackground champion={props.game.champion} />);

  t.ok(wrapper.props().style.background.includes("http"), "Should have URL");

  t.end();
});

test("<GameHeader />", (t) => {
  const mockClick = sinon.spy();
  const wrapper = shallow(
    <GameHeader
      gameClass="game"
      game={props.game}
      statsOpen={false}
      onClick={mockClick}
    >
      <div className="dummyDiv" />
    </GameHeader>
  );

  t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");

  wrapper.simulate("click");
  t.ok(mockClick.calledOnce, "Should have called click handler upon click");

  t.end();
});

test("<GameHeaderContainer />", (t) => {
  const wrapper = shallow(<GameHeaderContainer {...props} />);
  const gameHeaderContainer = wrapper.find(".game-header-container");

  t.ok(gameHeaderContainer.text(props.gameMode), "Should have rendered gameMode text");
  t.ok(gameHeaderContainer.text(props.champion), "Should have rendered champion text");
  t.ok(gameHeaderContainer.text(props.dmgDealt), "Should have rendered dmgDealt text");

  t.end();
});

test("<GameOverlay />", (t) => {
  const wrapper = shallow(<GameOverlay statsOpen={false} />);

  t.ok(wrapper.find("span").text("Show stats"), "Should render 'Show stats' when stats are hidden");
  t.ok(wrapper.find("i").hasClass("fa-chevron-down"), "Should render downwards chevron when stats are hidden");

  wrapper.setProps({ statsOpen: true });
  t.ok(wrapper.find("span").text("Hide stats"), "Should render 'Hide stats' when stats are shown");
  t.ok(wrapper.find("i").hasClass("fa-chevron-up"), "Should render upwards chevron when stats are shown");

  t.end();
});