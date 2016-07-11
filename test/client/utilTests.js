"use strict";

import test from "tape";
import Utils from "../../src/js/util/utils";

test("KDA format conversion", (t) => {
	let parsed = Utils.getKDAFormat(9, 0, 6);
	t.equal(parsed, "9/0/6", "Should have parsed correctly");

	parsed = Utils.getKDAFormat("9", "0", "6");
	t.equal(parsed, "9/0/6", "Should have parsed correctly");

	parsed = Utils.getKDAFormat(0, 2);
	t.equal(parsed, "0/0/0", "Should have parsed correctly");

	t.end();
});

test("Multikill format conversion", (t) => {
	let parsed = Utils.getMultikillFormat(2);
	t.equal(parsed, "DOUBLE KILL", "Should have parsed correctly");

	parsed = Utils.getMultikillFormat("5");
	t.equal(parsed, "NONE", "Should have parsed correctly");

	parsed = Utils.getMultikillFormat(1);
	t.equal(parsed, "NONE", "Should have parsed correctly");

	parsed = Utils.getMultikillFormat();
	t.equal(parsed, "NONE", "Should have parsed correctly");

	t.end();
});

test("Chart damage format conversion", (t) => {
	let expected = [
		{name: "Physical damage", y: 123},
		{name: "Magic damage", y: 321},
		{name: "True damage", y: 111}
	];
	let parsed = Utils.getChartDamages({physicalDamage: 123, magicDamage: 321, trueDamage: 111});
	t.deepEqual(parsed, expected, "Should have parsed correctly");

	expected = [
		{name: "Physical damage", y: 0},
		{name: "Magic damage", y: 1337},
		{name: "True damage", y: 0}
	];
	parsed = Utils.getChartDamages({magicDamage: 1337});
	t.deepEqual(parsed, expected, "Should have parsed correctly");

	expected = [
		{name: "Physical damage", y: 0},
		{name: "Magic damage", y: 0},
		{name: "True damage", y: 0}
	];
	parsed = Utils.getChartDamages({});
	t.deepEqual(parsed, expected, "Should have parsed correctly");

	t.end();
});

test("Champion name formatting", (t) => {
	let parsed = Utils.championNameForUrl("Lee Sin");
	t.equal(parsed, "LeeSin", "Should have parsed correctly");

	parsed = Utils.championNameForUrl("Rek'Sai");
	t.equal(parsed, "RekSai", "Should have parsed correctly");

	parsed = Utils.championNameForUrl("Fiddlesticks");
	t.equal(parsed, "FiddleSticks", "Should have parsed correctly");

	parsed = Utils.championNameForUrl("Kha'Zix");
	t.equal(parsed, "Khazix", "Should have parsed correctly");

	t.end();
});

test("Clean empty damages", (t) => {
	let expected = [{dmgDealt: 1}];
	let parsed = Utils.cleanEmptyDamages([{dmgDealt: 1}, {dmgDealt: ""}, {dmgDealt: 0}, {testMaster: ""}]);
	t.deepEqual(parsed, [{dmgDealt: 1}], "Should have cleaned all emptyish objects");

	t.end();
});

test("Get highest dmg game", (t) => {
	let expected = {dmgDealt: 666};
	let parsed = Utils.getHighestDamageGame([{dmgDealt: 1}, {dmgDealt: 666}, {dmgDealt: ""}, {dmgDealt: "derp"}]);
	t.deepEqual(parsed, expected, "Should have gotten only one object with the largest value");

	t.end();
});

test("Sort games by dmg", (t) => {
	let expected = [{dmgDealt: 6}, {dmgDealt: 3}, {dmgDealt: -1}];
	let parsed = Utils.sortGamesByDmg([{dmgDealt: 3}, {dmgDealt: -1}, {dmgDealt: 6}]);
	t.deepEqual(parsed, expected, "Should have sorted correctly");

	t.end();
});