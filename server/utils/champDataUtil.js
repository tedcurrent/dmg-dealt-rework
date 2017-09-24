"use strict";

const LolApiController = require("../controllers/lolApiController");
const championData = require("../data/static/championData");
const fs = require("fs");

// A wrapper for several champion related functions
module.exports = class ChampDataUtil {
  static writeChampsToPath(writePath) {
    this.readChampsFromApi((str) => {
      this.writeStringToFile(writePath, str);
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

  static writeStringToFile(path, str) {
    try {
      fs.writeFileSync(path, str, "utf8");
    } catch (err) {
      console.log(err.message);
    }
  }
}