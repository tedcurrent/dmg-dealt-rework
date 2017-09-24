"use strict";

const _ = require("lodash");
const champDataUtil = require("./champDataUtil");

// A collection of utility functions
module.exports = class Util {
  static formatLolGames(games, summonerId) {
    return games.map(game => {
      const participantIdentity = this.findParticipantIdentity(summonerId, game.participantIdentities);
      const participant = this.findParticipant(participantIdentity.participantId, game.participants);
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

  static findParticipantIdentity(accountId, participantIdentities) {
    return _.find(participantIdentities, identity => {
      if (identity.player.currentAccountId == accountId) return identity;
    });
  }

  static findParticipant(participantId, participants) {
    return _.find(participants, part => {
      if (part.participantId == participantId) return part;
    });
  }
}