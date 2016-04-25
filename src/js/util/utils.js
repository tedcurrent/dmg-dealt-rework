"use strict";

var AppConstants = require("../constants/AppConstants");
var _ = require("lodash");

Date.prototype.customFormat = function(formatString){
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	var dateObject = this;
	YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
	MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
	MMM = (MMMM = ["January","February","March","April","May","June","July","August","September","October","November","December"][M - 1]).substring(0, 3);
	DD = (D = dateObject.getDate()) < 10 ? ("0" + D) : D;
	DDD = (DDDD = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0, 3);
	th=(D >= 10 && D <= 20) ? "th" : ((dMod = D % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

	h = (hhh = dateObject.getHours());
	if (h == 0) h = 24;
	if (h > 12) h -= 12;
	hh = h < 10 ? ("0" + h) : h;
	AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
	mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
	ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
	return formatString.replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};

String.prototype.capitalize = function(){
	return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

module.exports = {
	fixDateToString: function(unformattedDate) {
		var formattedDate = new Date(unformattedDate);
		return formattedDate.customFormat("#DD# #MMMM#, #YYYY#").toString();
	},

	cleanEmptyDamages: function(gameArray) {
		return _.remove(gameArray, function(game) {
			return game.dmgDealt;
		});
	},

	buildProfileIconUrl: function(iconId) {
		return AppConstants.LOL_STATIC_BASE_URL + "/" + AppConstants.LOL_API_VERSION + "/img/profileicon/" + iconId + ".png";
	},

	championNameForUrl: function(championName) {
		switch (championName) {
			case "Kog'Maw":
				return "KogMaw";
			case "Rek'Sai":
				return "RekSai";
			case "Jarvan IV":
				return "JarvanIV";
			default:
				return championName.toLowerCase().replace("'", "").replace(".", "").capitalize().replace(" ", "");
		}
	},

	championSquareUrl: function(championName) {
		var fullUrl = AppConstants.LOL_STATIC_BASE_URL + "/" + AppConstants.LOL_API_VERSION + "/img/champion/";
		var championNameUrlified = this.championNameForUrl(championName) + ".png";
		return fullUrl + championNameUrlified;
	},

	championSplashUrl: function(championName) {
		var fullUrl = AppConstants.LOL_STATIC_BASE_URL + "/img/champion/splash/";
		var championNameUrlified = this.championNameForUrl(championName);
		var skinSelection = "_0.jpg";
		return fullUrl + championNameUrlified + skinSelection;
	}
};