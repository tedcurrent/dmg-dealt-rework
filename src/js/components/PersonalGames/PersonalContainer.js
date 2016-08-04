"use strict";

import React from "react";
import GamesContainer from "../Common/GamesContainer";
import TopGame from "./TopGame";
import GameList from "./GameList";

export default function PersonalContainer({results}) {
	return (
		<GamesContainer>
			<TopGame summoner={results.summoner} topGame={results.highScore} newHs={results.newHighScore}/>
			<h2>Last 10 Games of DMG</h2>
			<GameList games={results.games}/>
		</GamesContainer>
	);
}