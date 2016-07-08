"use strict";

var test = require("tape");
var DateTimeUtils = require("../../src/js/util/dateTimeUtils");

test("Date conversion", function(t) {
	var expectedDate = "12 October, 2015";
	var parsedDate = DateTimeUtils.parseDate(1444670102143);

	t.equal(parsedDate, expectedDate, "Should have parsed correctly");
	t.end();
});

test("Minute format conversion", function(t) {
	var expectedString = "11:49";
	var parsedString = DateTimeUtils.parseDuration(709);
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	expectedString = "00:00";
	parsedString = DateTimeUtils.parseDuration();
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	t.end();
});