"use strict";

var test = require("tape");
var Utils = require("../../src/js/util/utils");

test("Date conversion", function(t) {
	var expectedDate = "12 October, 2015";
	var parsedDate = Utils.fixDateToString(1444670102143);

	t.equal(parsedDate, expectedDate, "Should have correctly parsed");
	t.end();
});
