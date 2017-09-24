"use strict";

import test from "tape";
import LeagueUrlBuilder from "../../../server/utils/leagueUrlBuilder";
import AppConfig from "../../../appconfig";

test("Region proxy formatting", (t) => {
  t.equal(LeagueUrlBuilder.getRegionProxy("BR"), "br1", "Should return correct value");
  t.equal(LeagueUrlBuilder.getRegionProxy("ASD"), undefined, "Should return undefined");
  t.end();
});

test("Url constructing", (t) => {
  AppConfig.LOL_API.API_KEY = "a-b-c-d";
  let url = LeagueUrlBuilder.constructUrl("details", "br", false);
  let expected = "https://br1.api.riotgames.com/lol/details?api_key=a-b-c-d";
  t.equal(url, expected, "Should parse correctly");

  url = LeagueUrlBuilder.constructUrl("details", "br", true);
  expected = "https://br1.api.riotgames.com/lol/details&api_key=a-b-c-d";
  t.equal(url, expected, "Should parse correctly");
  
  t.end();
});