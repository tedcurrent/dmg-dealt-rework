"use strict";

import React from "react";
import Util from "../../../util/utils";
import DateTimeUtils from "../../../util/dateTimeUtils";
import GameStatsDetail from "./GameStatsDetail";

export default function GameStatsDetailArea({ stats }) {
  return (
    <div className="game-stats-detail-area">
      <GameStatsDetail
        description={"Duration"}
        detail={DateTimeUtils.parseDuration(stats.timePlayed)}
      />
      <GameStatsDetail
        description={"K/D/A"}
        detail={Util.getKDAFormat(stats.kills, stats.deaths, stats.assists)}
      />
      <GameStatsDetail
        description={"Largest multikill"}
        detail={Util.getMultikillFormat(stats.largestMultiKill)}
      />
    </div>
  );
}