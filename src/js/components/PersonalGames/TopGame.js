"use strict";

import React from "react";
import SummonerInfo from "../Game/SummonerInfo";
import GameWrapper from "../Game";

// Top game with summoner details and custom coloring, otherwise a regular game
export default function TopGame({newHs, topGame, summoner}) {
	const infoMessage = newHs ? "New Top DMG" : "All-time top dmg";
	const scoreType = newHs ? "new" : "old";
	
	return (
		<GameWrapper game={topGame} gameClass={"game-header top-game " + scoreType}>
			<SummonerInfo info={infoMessage} summoner={summoner} />
		</GameWrapper>
	);
}