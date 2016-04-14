"use strict";

var ApiResponseActions = require("../actions/ApiResponseActions");
var request = require("superagent");
var NProgress = require("nprogress");

var APIRequests = {
	getSummoner: function(query) {
		NProgress.start();
		request
			.get("/api/getSummoner/" + query.summonerName + "/" + query.summonerRegion)
			.end(function(err, result) {
				if (err) {
					// needs handling
				}
				var parsedResult = JSON.parse(result.text);
				ApiResponseActions.updateSummonerSearchResult(parsedResult);
				NProgress.done();
			});
	}
};

module.exports = APIRequests;

