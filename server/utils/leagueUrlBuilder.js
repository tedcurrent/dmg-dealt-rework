"use strict";

const AppConfig = require("../../appconfig");

module.exports = class LeagueUrlBuilder {
  static formatRegion(region) {
    return region != "kr" && region != "ru" ? region + "1" : region;
  }

  static constructUrl(details, region, weird) {
    return `https://${this.formatRegion(region)}.api.riotgames.com/lol/${details}${weird ? "&" : "?"}api_key=${AppConfig.LOL_API.API_KEY}`;
  }
};