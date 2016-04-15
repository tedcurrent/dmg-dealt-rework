"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");

var APIRequests = {
	getSummoner: function(query) {
		if (query.summonerName === "") {
			return;
		}

		NProgress.start();
		request
			.get("/api/getSummoner/" + query.summonerName + "/" + query.summonerRegion)
			.end(function(err, result) {
				if (err) {
					ApiResponseActions.summonerSearchError(JSON.parse(err.response.text));
				} else {
					ApiResponseActions.updateSummonerSearchResult(JSON.parse(result.text));
				}
				NProgress.done();
			});
	}
};

module.exports = APIRequests;

