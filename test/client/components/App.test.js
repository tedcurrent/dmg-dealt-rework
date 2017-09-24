"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import App from "../../../src/js/components/App/";

test("<App />", (t) => {
  const wrapper = shallow(<App><div className="dummyDiv" /></App>);

  t.ok(wrapper.contains(<div className="dummyDiv" />), "Should have 'dummyDiv' as a child");

  t.end();
});