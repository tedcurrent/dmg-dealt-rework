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
					ApiResponseActions.updateSummonerSearchResult(JSON.parse(err.response.text));
				} else {
					ApiResponseActions.updateSummonerSearchResult(JSON.parse(result.text));
				}
				NProgress.done();
			});
	}
};

module.exports = APIRequests;

