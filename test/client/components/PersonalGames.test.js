"use strict";

import React from "react";
import test from "tape";
import { shallow } from "enzyme";
import sinon from "sinon";
import mockApiResults from "../mockApiResults";
import PersonalGames from "../../../src/js/components/PersonalGames/";
import ApiRequestActions from "../../../src/js/actions/ApiRequestActions";

test("<PersonalGames />", (t) => {
	let getPersonalGames = sinon.stub(ApiRequestActions, "getPersonalGames");
	const wrapper = shallow(<PersonalGames params={{id: 51520537, region: "euw"}} />);

	t.ok(!wrapper.find("div").children().length, "Should render empty <div /> initially");
	t.ok(getPersonalGames.calledWith({id: 51520537, region: "euw"}), "API called with correct parameters");

	wrapper.setState({gameResults: mockApiResults()});
	t.ok(wrapper.find("PersonalContainer").length, "Should render <PersonalContainer /> if results");

	wrapper.setState({gameResults: mockApiResults({errors: 1})});
	t.ok(wrapper.find("ErrorPage").length, "Should render <ErrorPage /> if errors length > 0");

	getPersonalGames.restore();
	t.end();
});