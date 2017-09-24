"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { searchActionConstants } from "../constants/ActionConstants";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";
let _store = {
  results: {
    summoner: {},
    errors: 0
  },
  input: {
    region: "euw",
    summoner: ""
  },
  queryLengthOk: true,
  resultSelected: false
};

// Store for all summoner search related items
class SearchStore extends EventEmitter {
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
    return _store;
  }
}

const searchStore = new SearchStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case searchActionConstants.SUMMONER_FOUND:
      _store.results.summoner = action.data;
      _store.results.errors = 0;
      searchStore.emitChange();
      break;
    case searchActionConstants.ERROR:
      _store.results.summoner = {};
      ++_store.results.errors;
      searchStore.emitChange();
      break;
    case searchActionConstants.CHANGE_REGION:
      _store.input.region = action.data;
      searchStore.emitChange();
      break;
    case searchActionConstants.CHANGE_SUMMONER:
      _store.input.summoner = action.data;
      searchStore.emitChange();
      break;
    case searchActionConstants.CHANGE_QRYLEN:
      _store.queryLengthOk = action.data;
      searchStore.emitChange();
      break;
    case searchActionConstants.CHANGE_ARROWNAV:
      _store.resultSelected = action.data;
      searchStore.emitChange();
      break;
    case searchActionConstants.RESET:
      _store.results.summoner = {};
      _store.results.errors = 0;
      _store.resultSelected = false;
      _store.queryLengthOk = true;
      searchStore.emitChange();
      break;
    default:
  }
});

export default searchStore;