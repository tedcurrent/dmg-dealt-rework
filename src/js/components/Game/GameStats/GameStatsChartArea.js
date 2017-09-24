"use strict";

import React from "react";
import GameStatsDamageChart from "./GameStatsDamageChart";
import shortid from "shortid";

export default function GameStatsChartArea({ game: { stats } }) {
  return (
    <div className="game-stats-chart-area">
      <GameStatsDamageChart
        stats={stats}
        chartName={"chart-" + shortid.generate()}
      />
    </div>
  );
}