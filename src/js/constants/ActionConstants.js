import keyMirror from "keymirror";

const searchActionConstants = keyMirror({
	SUMMONER_FOUND: null,
	ERROR: null,
	CHANGE_REGION: null,
	CHANGE_SUMMONER: null,
	CHANGE_QRYLEN: null,
	CHANGE_ARROWNAV: null,
	RESET: null
});

const apiActionConstants = keyMirror({
	API_REQUEST: null,
	GAMES_FOUND: null,
	GAMES_SEARCH_ERROR: null,
	GAMES_CLEAN_UP: null,
	REGIONALS_FOUND: null,
	REGIONALS_ERROR: null
});

export { searchActionConstants, apiActionConstants };