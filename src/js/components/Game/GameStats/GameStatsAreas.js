"use strict";

import React from "react";
import GameStatsChartArea from "./GameStatsChartArea";
import GameStatsDetailArea from "./GameStatsDetailArea";

export default function GameStatsAreas({game}) {
	return (
		<div className="game-stats-areas">
			<GameStatsChartArea game={game} />
			<GameStatsDetailArea stats={game.stats} />
		</div>
	);
}