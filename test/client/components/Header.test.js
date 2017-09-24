"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Header from "../../../src/js/components/Header/";

test("<Header />", (t) => {
  const wrapper = shallow(<Header />);

  t.ok(wrapper.find("header").length, "Should have header element");
  t.ok(wrapper.find(".logo").length, "Should have logo element");
  t.ok(wrapper.find("Search").length, "Should have <Search /> component");
  t.ok(wrapper.find("Link[to='/regions']").length, "Should have a Link to /regions");

  t.end();
});