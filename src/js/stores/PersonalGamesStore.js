"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { apiActionConstants } from "../constants/ActionConstants";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _results = {
  summoner: {},
  games: [],
  highScore: {},
  newHighScore: false,
  errors: 0
};

// Store for all individual score related items
class PersonalScoresStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return _results;
  }

}

const personalScoresStore = new PersonalScoresStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case apiActionConstants.GAMES_FOUND:
      _results.summoner = action.data.hs.highScore.summoner;
      _results.games = action.data.games;
      _results.highScore = action.data.hs.highScore.game;
      _results.newHighScore = action.data.hs.newHighScore;
      _results.errors = 0;
      personalScoresStore.emitChange();
      break;
    case apiActionConstants.GAMES_SEARCH_ERROR:
      _results.summoner = {};
      _results.games = [];
      _results.highScore = {};
      _results.newHighScore = false;
      ++_results.errors;
      personalScoresStore.emitChange();
      break;
    case apiActionConstants.GAMES_CLEAN_UP:
      _results.summoner = {};
      _results.games = [];
      _results.highScore = {};
      _results.newHighScore = false;
      _results.errors = 0;
      break;
    default:
  }
});

export default personalScoresStore;