"use strict";

import React from "react";

// Any top game is rendered with summoner details
export default function SummonerInfo({ summoner: { summonerName }, info }) {
  return (
    <div className="summoner-info">
      <span className="name">{summonerName}</span>
      <span className="info">{info}</span>
    </div>
  );
}