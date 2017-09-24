"use strict";

const _ = require("lodash");
const fs = require("fs");
const champDataUtil = require("./champDataUtil");

// A collection of utility functions
module.exports = class Util {
  static formatLolGames(games, summonerId) {
    return _.map(games, game => {
      const participantIdentity = _.find(game.participantIdentities, identity => {
        if (identity.player.accountId == summonerId) return identity;
      });

      const participant = _.find(game.participants, part => {
        if (part.participantId == participantIdentity.participantId) return part;
      });

      const stats = participant.stats;

      return {
        gameId: game.gameId,
        gameMode: game.gameMode,
        champion: champDataUtil.championIdToChampionName(participant.championId),
        gameDate: game.gameCreation,
        dmgDealt: stats.totalDamageDealtToChampions,
        stats: {
          timePlayed: game.gameDuration,
          kills: stats.kills,
          deaths: stats.deaths,
          assists: stats.assists,
          largestMultiKill: stats.largestMultiKill,
          physicalDamage: stats.physicalDamageDealtToChampions,
          magicDamage: stats.magicDamageDealtToChampions,
          trueDamage: stats.trueDamageDealtToChampions
        }
      };
    });
  }

  static writeStringToFile(path, str) {
    try {
      fs.writeFileSync(path, str, "utf8");
    } catch (err) {
      console.log(err.message);
    }

  }
}