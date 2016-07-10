"use strict";

var test = require("tape");
var Utils = require("../../src/js/util/utils");

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

test("Chart damage format conversion", function(t) {
	var expectedArray = [
		{name: "Physical damage", y: 123},
		{name: "Magic damage", y: 321},
		{name: "True damage", y: 111}
	];
	var parsedArray = Utils.getChartDamages({physicalDamage: 123, magicDamage: 321, trueDamage: 111});
	t.deepEqual(expectedArray, parsedArray, "Should have parsed correctly");

	expectedArray = [
		{name: "Physical damage", y: 0},
		{name: "Magic damage", y: 1337},
		{name: "True damage", y: 0}
	];
	parsedArray = Utils.getChartDamages({magicDamage: 1337});
	t.deepEqual(expectedArray, parsedArray, "Should have parsed correctly");

	expectedArray = [
		{name: "Physical damage", y: 0},
		{name: "Magic damage", y: 0},
		{name: "True damage", y: 0}
	];
	parsedArray = Utils.getChartDamages({});
	t.deepEqual(expectedArray, parsedArray, "Should have parsed correctly");

	t.end();
});

test("Champion name formatting", function(t) {
	var expectedString = "LeeSin";
	var parsedString = Utils.championNameForUrl("Lee Sin");
	t.equal(expectedString, parsedString, "Should have parsed correctly");

	var expectedString = "RekSai";
	var parsedString = Utils.championNameForUrl("Rek'Sai");
	t.equal(expectedString, parsedString, "Should have parsed correctly");

	var expectedString = "FiddleSticks";
	var parsedString = Utils.championNameForUrl("Fiddlesticks");
	t.equal(expectedString, parsedString, "Should have parsed correctly");

	var expectedString = "Khazix";
	var parsedString = Utils.championNameForUrl("Kha'Zix");
	t.equal(expectedString, parsedString, "Should have parsed correctly");

	t.end();
});

test("Clean empty damages", function(t) {
	var expectedArray = [{dmgDealt: 1}];
	var parsedArray = Utils.cleanEmptyDamages([{dmgDealt: 1}, {dmgDealt: ""}, {dmgDealt: 0}, {testMaster: ""}]);
	t.deepEqual(expectedArray, parsedArray, "Should have cleaned all emptyish objects");

	t.end();
});

test("Get highest dmg game", function(t) {
	var expectedObject = {dmgDealt: 666};
	var parsedObject = Utils.getHighestDamageGame([{dmgDealt: 1}, {dmgDealt: 666}, {dmgDealt: ""}, {dmgDealt: "derp"}]);
	t.deepEqual(expectedObject, parsedObject, "Should have gotten only one object with the largest value");

	t.end();
});

test("Sort games by dmg", function(t) {
	var expectedArray = [{dmgDealt: 6}, {dmgDealt: 3}, {dmgDealt: -1}];
	var parsedArray = Utils.sortGamesByDmg([{dmgDealt: 3}, {dmgDealt: -1}, {dmgDealt: 6}]);
	t.deepEqual(expectedArray, parsedArray, "Should have sorted correctly");

	t.end();
});



