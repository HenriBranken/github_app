// Take a number, say 2 (number), and convert it to 02 (string).
// Pad with the necessary amount of zeros.
function padTo2Digits(digit) {
  return digit.toString().padStart(2, "0");
}

module.exports.formattedDate = function prettyDate(datetimeString) {
  // Create a Date Object from a DateTime String.
  let dateObject = new Date(datetimeString);

  // Extract the year, month, and day. Invoke `padTo2Digits` for `mm` and `dd`.
  const yyyy = dateObject.getFullYear();
  const mm = padTo2Digits(dateObject.getMonth() + 1);
  const dd = padTo2Digits(dateObject.getDay() + 1);

  // Join the three strings with "/" to form a date in the format of "yyyy/mm/dd".
  return [yyyy, mm, dd].join("/");
};
