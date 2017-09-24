"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Image from "../../../src/js/components/Common/Image";

test("<Image />", (t) => {
  const props = {
    src: "http://ddragon.leagueoflegends.com/cdn/6.14.2/img/profileicon/588.png",
    defaultImage: "http://ddragon.leagueoflegends.com/cdn/6.14.2/img/profileicon/587.png",
    alt: "dummy image"
  };
  const wrapper = shallow(<Image {...props} />);

  t.ok(!wrapper.state().loaded, "Should not have loaded image on initalization");
  t.equal(wrapper.props().src, props.src, "Should have image URL");

  wrapper.simulate("load");
  t.equal(wrapper.props().className, "image loaded", "Should have 'loaded' class after load event");

  wrapper.simulate("error");
  t.equal(wrapper.props().src, props.defaultImage, "Should have default image URL on error");

  t.end();
});