"use strict";

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import shortid from "shortid";

export default function Collapse(props) {
  return (
    <ReactCSSTransitionGroup
      transitionName="animate-collapse"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
    >
      <div className="collapse" key={shortid.generate()}>
        {props.children}
      </div>
    </ReactCSSTransitionGroup>
  );
}