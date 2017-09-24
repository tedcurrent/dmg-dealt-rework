"use strict";

import React from "react";
import AppConstants from "../../constants/AppConstants";
import Util from "../../util/utils";

export default function GameBackground({ champion }) {
  const splashUrl = Util.championSplashUrl(champion);
  const gameBackgroundStyle = {
    background: "url(" + splashUrl + ")"
  };

  return (
    <div className="game-header-background" style={gameBackgroundStyle}></div>
  );
}