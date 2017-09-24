"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import GamesContainer from "../../../src/js/components/common/GamesContainer";

test("<GamesContainer />", (t) => {
  const wrapper = shallow(<GamesContainer><div className="dummyDiv" /></GamesContainer>);

  t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");

  t.end();
});