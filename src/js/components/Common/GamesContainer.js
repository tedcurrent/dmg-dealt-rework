"use strict";

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function GamesContainer(props) {
  return (
    <ReactCSSTransitionGroup
      transitionName="animate-games-container"
      transitionAppear={true}
      transitionAppearTimeout={250}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
    >
      <div className="games-container" key="games-container">
        {props.children}
      </div>
    </ReactCSSTransitionGroup>
  );
}