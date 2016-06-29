"use strict";

var test = require("tape");
var Utils = require("../../src/js/util/utils");

test("Date conversion", function(t) {
	var expectedDate = "12 October, 2015";
	var parsedDate = Utils.fixDateToString(1444670102143);

	t.equal(parsedDate, expectedDate, "Should have parsed correctly");
	t.end();
});

test("Minute format conversion", function(t) {
	var expectedString = "11:49";
	var parsedString = Utils.getMinuteFormat(709);
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	expectedString = "00:00";
	parsedString = Utils.getMinuteFormat();
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	t.end();
});

test("KDA format conversion", function(t) {
	var expectedString = "9/0/6";
	var parsedStringFromNumber = Utils.getKDAFormat(9, 0, 6);
	var parsedStringFromString = Utils.getKDAFormat("9", "0", "6");
	t.equal(parsedStringFromNumber, expectedString, "Should have parsed correctly");
	t.equal(parsedStringFromString, expectedString, "Should have parsed correctly");

	expectedString = "0/0/0";
	var parsedStringFromUndefined = Utils.getKDAFormat(0, 2);
	t.equal(parsedStringFromUndefined, expectedString, "Should have parsed correctly");

	t.end();
});

test("Multikill format conversion", function(t) {
	var expectedString = "DOUBLE KILL";
	var parsedString = Utils.getMultikillFormat(2);
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	expectedString = "NONE";
	parsedString = Utils.getMultikillFormat("5");
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	expectedString = "NONE";
	parsedString = Utils.getMultikillFormat(1);
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	expectedString = "NONE";
	parsedString = Utils.getMultikillFormat();
	t.equal(parsedString, expectedString, "Should have parsed correctly");

	t.end();
});
