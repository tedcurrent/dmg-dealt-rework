"use strict";

const Util = require("./util");
const LolApiController = require("../controllers/lolApiController");
const _ = require("lodash");
const championData = require("../static/championData");

// A wrapper for several champion related functions
module.exports = class ChampDataUtil {
  static writeChampsToPath(writePath) {
    this.readChampsFromApi((str) => {
      Util.writeStringToFile(writePath, str);
    });
  }

  static readChampsFromApi(callback) {
    LolApiController.getAllChampions((err, result) => {
      if (err)
        return console.log(err.message);

      const champions = this.formatChampData(result.data);
      const strChampions = Util.formatObjectToString(champions);
      callback(strChampions);
    });
  }

  static formatChampData(champions) {
    return _.map(champions, (champion) => {
      return { id: champion.id, name: champion.name };
    });
  }

  static championIdToChampionName(championId) {
    return _.find(championData, (champion) => {
      return champion.id == championId;
    }).name;
  }
}