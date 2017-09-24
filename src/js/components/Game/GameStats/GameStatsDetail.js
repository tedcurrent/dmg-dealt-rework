"use strict";

import React from "react";

export default function GameStatsDetail({ description, detail }) {
  return (
    <div className="game-stats-detail">
      <div className="description">{description}</div>
      <div className="detail">{detail}</div>
    </div>
  );
}