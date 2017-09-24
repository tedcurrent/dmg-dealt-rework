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

      return callback(JSON.stringify(result.data));
    });
  }

  static championIdToChampionName(championId) {
    return championData[championId].name;
  }
}