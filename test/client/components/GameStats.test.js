"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GameStats from "../../../src/js/components/Game/GameStats/";
import GameStatsAreas from "../../../src/js/components/Game/GameStats/GameStatsAreas";
import GameStatsChartArea from "../../../src/js/components/Game/GameStats/GameStatsChartArea";
import GameStatsDetailArea from "../../../src/js/components/Game/GameStats/GameStatsDetailArea";
import GameStatsDamageChart from "../../../src/js/components/Game/GameStats/GameStatsDamageChart";
import GameStatsDetail from "../../../src/js/components/Game/GameStats/GameStatsDetail";

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

test("<GameStats />", (t) => {
	const wrapper = shallow(<GameStats {...props} />);

	t.ok(wrapper.find(GameStatsAreas).length, "Should render <GameStatsAreas />");

	t.end();
});

test("<GameStatsAreas />", (t) => {
	const wrapper = shallow(<GameStatsAreas {...props} />);

	t.ok(wrapper.find(GameStatsChartArea).length, "Should contain a <GameStatsChartArea />");
	t.ok(wrapper.find(GameStatsDetailArea).length, "Should contain a <GameStatsDetailArea />");

	t.end();
});

test("<GameStatsChartArea />", (t) => {
	const wrapper = shallow(<GameStatsChartArea {...props} />);
	const gameStatsDamageChart = wrapper.find("GameStatsDamageChart");

	t.ok(gameStatsDamageChart.length, "Should contain a <GameStatsDamageChart />");
	t.ok(gameStatsDamageChart.props().chartName, "Should have a chartName");

	t.end();
});

test("<GameStatsDetailArea />", (t) => {
	const wrapper = shallow(<GameStatsDetailArea stats={props.game.stats} />);

	t.equal(wrapper.find(GameStatsDetail).length, 3, "Should render three (3) detail components");

	t.end();
});

test("<GameStatsDamageChart />", (t) => {
	const wrapper = shallow(<GameStatsDamageChart chartName={"chart-dummy"} stats={props.game.stats} />);
	const chart = wrapper.find("HighChart");

	t.ok(chart.length, "Should contain a <HighChart /> component");
	t.equal(chart.props().container, "chart-dummy", "Should find container with chart name");

	t.end();
});

test("<GameStatsDetail />", (t) => {
	const wrapper = shallow(<GameStatsDetail description={"Desc"} detail={"Det"} />);

	t.ok(wrapper.find(".game-stats-detail").length, "Should contain stats detail wrapper class");
	t.ok(wrapper.find(".description").length, "Should contain stats description class");
	t.ok(wrapper.find(".detail").length, "Should contain stats detail class");

	t.end();
});