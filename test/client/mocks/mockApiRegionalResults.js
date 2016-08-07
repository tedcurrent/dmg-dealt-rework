"use strict";

export default function mockApiRegionalResults(overrides) {
	let results = {
		games:  [
			{
				_id: "global",
				highScore: {
					game: {
					    gameId: 2337165087,
					    dmgDealt: 2,
					    stats: {
					    	timePlayed: 2312
					    }
					},
					summoner: {
						id: 51520537,
					},
			  	}
			},
			{
				_id: "euw",
				highScore: {
					game: {
					    gameId: 2337165087,
					    dmgDealt: 2,
					    stats: {
					    	timePlayed: 2312
					    }
					},
					summoner: {
						id: 51520537,
					},
			  	},
			}
		],
	  	errors: 0
	};

	if (overrides) {
		Object.keys(overrides).forEach((key) => {
			results[key] = overrides[key];
		});
	}

	return results;
};