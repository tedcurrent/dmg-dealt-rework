"use strict";

import React from "react";

export default function GameOverlay({statsOpen}) {	
	return (
		<div className="game-header-overlay">
			<span>{statsOpen ? "Hide stats" : "Show stats"}</span>
			<i className={"fa fa-chevron-" + (statsOpen ? "up" : "down")}></i>
		</div>
	);
}