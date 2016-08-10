"use strict";

import React from "react";
import GameBackground from "./GameBackground";
import GameOverlay from "./GameOverlay";
import GameHeaderContainer from "./GameHeaderContainer";

export default function GameHeader(props) {
	return (
		<div className={props.gameClass} onClick={props.onClick}>
			{props.children}
			<GameHeaderContainer game={props.game} />
			<GameBackground champion={props.game.champion} />
			<GameOverlay statsOpen={props.statsOpen} />
		</div>
		
	);
}