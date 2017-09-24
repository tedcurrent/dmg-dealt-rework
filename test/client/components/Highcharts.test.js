"use strict";

import React from "react";
import test from "tape";
import { mount } from "enzyme";
import { spy } from "sinon";
import Highcharts from "../../../src/js/components/Common/Highcharts";

const mockChart = () => {
  const data = {
    series: [
      {
        name: "Mock series",
        data: [
          { name: "Mock value1", y: 0 },
          { name: "Mock value2", y: 1 },
          { name: "Mock value3", y: 2 }
        ]
      }
    ]
  };

  return (
    <Highcharts
      container={"mockChart"}
      options={data}
    />
  );
};

test("<Highcharts />", (t) => {
  spy(Highcharts.prototype, "componentDidMount");
  const wrapper = mount(mockChart());

  t.ok(Highcharts.prototype.componentDidMount.calledOnce, "Should have called 'componentDidMount' once");
  t.ok(wrapper.contains(<div id="mockChart" />), "Should have a '#mockChart' container");
  t.equals(wrapper.props().options.series.length, 1, "Should have one (1) series object")

  t.end();
});