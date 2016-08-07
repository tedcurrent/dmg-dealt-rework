"use strict";

import React from "react";
import GameListItem from "./GameListItem";
import Util from "../../util/utils";

// Personal games listed
export default function GameList({games}) {
	return (
		<ul>
			{Util.sortGamesByDmg(games).map((game) => {
				return <GameListItem key={game.gameId} game={game} gameClass={"game-header"} />;
			})}
		</ul>
	);
}