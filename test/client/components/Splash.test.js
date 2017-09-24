"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Splash from "../../../src/js/components/Splash/";

test("<Splash />", (t) => {
  const wrapper = shallow(<Splash />);

  t.ok(wrapper.find(".splash").length, "Should render splash page");
  t.ok(wrapper.find(".text-container").length, "Should render a text container");

  t.end();
});