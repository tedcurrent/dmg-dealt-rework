"use strict";

import test from "tape";
import DateTimeUtils from "../../../src/js/util/dateTimeUtils";

test("Date conversion to string", (t) => {
	let parsedDate = DateTimeUtils.parseDate(1444670102143);

	t.equal(parsedDate, "12 October, 2015", "Should have parsed correctly");
	t.end();
});

test("Minute format conversion", (t) => {
	let parsedString = DateTimeUtils.parseDuration(709);
	t.equal(parsedString, "11:49", "Should have parsed correctly");

	parsedString = DateTimeUtils.parseDuration();
	t.equal(parsedString, "00:00", "Should have parsed correctly");

	t.end();
});