"use strict";

import test from "tape";
import Util from "../../../server/utils/util";

test("Find participantIdentity", (t) => {
  const participantIdentities = [
    {
      player: {
        currentAccountId: 102
      }
    },
    {
      player: {
        currentAccountId: 101
      }
    },
    {
      player: {
        currentAccountId: 103
      }
    }
  ];

  t.equal(Util.findParticipantIdentity(101, participantIdentities).player.currentAccountId, 101, "Should return correct object");
  t.equal(Util.findParticipantIdentity(104, participantIdentities), undefined, "Should return undefined");
  t.end();
});

test("Find participant", (t) => {
  const participants = [
    {
      participantId: 102
    },
    {
      participantId: 101
    },
    {
      participantId: 103
    }
  ];

  t.equal(Util.findParticipant(101, participants).participantId, 101, "Should return correct object");
  t.equal(Util.findParticipant(104, participants), undefined, "Should return undefined");
  t.end();
});