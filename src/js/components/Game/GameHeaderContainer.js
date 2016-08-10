"use strict";

import React from "react";
import DateTimeUtils from "../../util/dateTimeUtils";

// A visual wrapper for game elements
export default function GameHeaderContainer({game}){
	return (
		<div className="game-header-container">
			<div className="game-header-details">
				<span>{game.gameMode}</span>
				<span>{game.champion}</span>
				<span>{DateTimeUtils.parseDate(game.gameDate)}</span>
			</div>
			<div className="game-dmg">
				<span>{game.dmgDealt}</span>
			</div>
		</div>
	);
}
