"use strict";

// Turns a single digit number to a double digit string
Number.prototype.doubleDigitalize = function() {
	var numberString = this.toString();
	return numberString.length < 2 ? "0" + numberString : numberString;
};

module.exports = {
	parseDate: function(unformattedDate) {
		var months = ["January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December"];
		var date = new Date(unformattedDate);
		return date.getDate().doubleDigitalize() + " " + months[date.getMonth()] + ", " + date.getFullYear();
	},

	parseDuration: function(fullSeconds) {
		var minutes = Math.floor(fullSeconds / 60).doubleDigitalize();
		var seconds = Math.floor(fullSeconds % 60).doubleDigitalize();
		return fullSeconds ? minutes + ":" + seconds : "00:00";
	}
};