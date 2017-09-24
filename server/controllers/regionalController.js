"use strict";

const LolApiController = require("./lolApiController");
const HighScoreAdapter = require("../data/adapters/highScoreAdapter");
const _ = require("lodash");

// Get the top players and their games from each region
module.exports = class RegionalController {
  static getRegionalScores(callback) {
    HighScoreAdapter.getRegionalTopScores((err, results) => {
      if (err || !results.length)
        return callback(err, {});

      const globalScore = _createGlobalScore(results);
      _setGlobalAsFirstInList(results, globalScore);
      callback(err, results);
    });
  }
};

function _createGlobalScore(scores) {
  const globalScore = _.maxBy(scores, (score) => { return score.highScore.game.dmgDealt });
  const cloneScore = _.clone(globalScore);
  cloneScore._id = "global";
  return cloneScore;
}

function _setGlobalAsFirstInList(scores, globalScore) {
  return scores.unshift(globalScore);
}