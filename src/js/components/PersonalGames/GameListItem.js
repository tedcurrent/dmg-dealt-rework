"use strict";

import React from "react";
import GameWrapper from "../Game";

export default function GameListItem({game}){
	return (
		<li>
			<GameWrapper game={game} gameClass="game-header" />
		</li>
	);
}