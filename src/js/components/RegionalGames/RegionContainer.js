"use strict";

import React from "react";
import RegionalGame from "./RegionalGame";
import GamesContainer from "../Common/GamesContainer";

export default function RegionContainer({results}) {
	return (
		<GamesContainer>
			<ul>
				{results.games.map((game) => {
					return <RegionalGame key={game._id} highScore={game.highScore} region={game._id} />;
				})}
			</ul>
		</GamesContainer>
	);
}