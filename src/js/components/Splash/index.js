"use strict";

import React from "react";

// Starting screen for the app
export default function Splash(props) {
  return (
    <div className="splash">
      <div className="text-container">
        <h1>{"Spice up your game"}</h1>
        <h3>
          Find out recent damage numbers from
					<a href="http://eune.leagueoflegends.com/"> League of Legends </a>
        </h3>
        <h3>and compare how you stack up with the deadliest.</h3>
      </div>
    </div>
  );
}