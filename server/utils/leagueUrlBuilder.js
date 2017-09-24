"use strict";

const AppConfig = require("../../appconfig");

const regionProxies = {
  br: "br1",
  eune: "eun1",
  euw: "euw1",
  jp: "jp1",
  kr: "kr",
  lan: "la1",
  las: "la2",
  na: "na1",
  oce: "oc1",
  tr: "tr1",
  ru: "ru",
  pbe: "pbe1"
};

module.exports = class LeagueUrlBuilder {
  static getRegionProxy(region) {
    return regionProxies[region.toLowerCase()];
  }

  static constructUrl(details, region, weird) {
    return `https://${this.getRegionProxy(region)}.api.riotgames.com/lol/${details}${weird ? "&" : "?"}api_key=${AppConfig.LOL_API.API_KEY}`;
  }
};