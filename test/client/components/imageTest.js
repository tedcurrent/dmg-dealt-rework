"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import Image from "../../../src/js/components/Common/Image";

test("<Image />", (t) => {
	const props = {
		src: "http://ddragon.leagueoflegends.com/cdn/6.14.2/img/profileicon/588.png",
		defaultImage: "http://ddragon.leagueoflegends.com/cdn/6.14.2/img/profileicon/587.png"
	};
	const wrapper = shallow(<Image {...props}/>);

	t.equal(wrapper.props().src, props.src, "Should have image URL");

	wrapper.find("img").simulate("error");
	t.equal(wrapper.props().src, props.defaultImage, "Should have default image URL on error");

	t.end();
});