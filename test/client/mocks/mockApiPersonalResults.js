"use strict";

export default function mockApiPersonalResults(overrides) {
	let results = {
		summoner: {
			id: 51520537,
		},
		highScore: {
		    gameId: 2337165087,
		    dmgDealt: 2,
		    stats: {
		    	timePlayed: 2312
		    }
	  	},
		games:  [
			{
			    gameId: 2337165086,
			    dmgDealt: 1,
			    stats: {
			    	timePlayed: 2312
			    }
		  	},
		  	{
			    gameId: 2337165087,
			    dmgDealt: 2,
			    stats: {
			    	timePlayed: 2312
			    }
		  	}
		],
	  	errors: 0,
	  	newHighScore: false
	};

	if (overrides) {
		Object.keys(overrides).forEach((key) => {
			results[key] = overrides[key];
		});
	}

	return results;
};