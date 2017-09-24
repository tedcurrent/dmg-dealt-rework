"use strict";

// Turns a single digit number to a double digit string
Number.prototype.doubleDigitalize = function () {
  const numberString = this.toString();
  return numberString.length < 2 ? "0" + numberString : numberString;
};

class DateTimeUtils {
  static parseDate(unformattedDate) {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = new Date(unformattedDate);
    return date.getDate().doubleDigitalize() + " " + months[date.getMonth()] + ", " + date.getFullYear();
  }

  static parseDuration(fullSeconds) {
    const minutes = Math.floor(fullSeconds / 60).doubleDigitalize();
    const seconds = Math.floor(fullSeconds % 60).doubleDigitalize();
    return fullSeconds ? minutes + ":" + seconds : "00:00";
  }
}

export default DateTimeUtils;