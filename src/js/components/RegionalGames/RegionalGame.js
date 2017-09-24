"use strict";

import React from "React";
import SummonerInfo from "../Game/SummonerInfo";
import GameWrapper from "../Game";

// Similar to TopGame, but an <li> with extra visual details for regions
export default function RegionalGame({ highScore: { game, summoner }, region }) {
  return (
    <li>
      <GameWrapper game={game} gameClass={"game-header top-game region " + region}>
        <SummonerInfo info={region.toUpperCase()} summoner={summoner} />
      </GameWrapper>
    </li>
  );
}