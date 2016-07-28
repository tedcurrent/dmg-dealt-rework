"use strict";

export default function mockApiRegionalResults(overrides) {
	let results = {
		games:  [
			{
				_id: "global",
				highScore: {
					game: {
						summoner: {
						id: 51520537,
						},
					    gameId: 2337165087,
					    dmgDealt: 2,
					    stats: {
					    	timePlayed: 2312
					    }
					}
			  	}
			},
			{
				_id: "euw",
				highScore: {
					game: {
						summoner: {
							id: 51520537,
						},
					    gameId: 2337165087,
					    dmgDealt: 2,
					    stats: {
					    	timePlayed: 2312
					    }
					}
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