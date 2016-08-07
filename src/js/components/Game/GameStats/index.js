"use strict";

import React from "react";
import GameStatsAreas from "./GameStatsAreas";

export default function GameStats({game}) {
	return (
		<div className="game-stats">
			<h3>Stats</h3>
			<GameStatsAreas game={game} />
		</div>
	);
}