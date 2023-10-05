/* eslint-disable no-prototype-builtins */

const moment = require('moment');
// a library designed to parse, validate, manipulate and display dates and times
// in Javascript. work well in browsers or Node.js

function DisplayDateTime(stringOfDate, objOfDateTime) {
  const dateTimeFormat = 'DD-MMMM-YYYY HH:mm:ss';

  // check if input values are empty or undefined
  if (!stringOfDate || !objOfDateTime || !objOfDateTime.date || !objOfDateTime.time) {
    return 'Params cannot be undefined or empty!';
  }

  // check if input types are valid
  if (typeof stringOfDate !== 'string' || typeof objOfDateTime !== 'object') {
    return 'Params must be a string and an object!';
  }

  // check if all properties of objOfDateTime are strings
  for (const key in objOfDateTime) {
    if (objOfDateTime.hasOwnProperty(key)) {
      const element = objOfDateTime[key];
      if (typeof element !== 'string') {
        return 'All properties of objOfDateTime must be strings!';
      }
    }
  }

  // validate the input date string
  const strIsValid = moment(stringOfDate, 'DD-MM-YYYY', true).isValid();
  if (!strIsValid) {
    return 'Invalid date format in dateStr! Must be DD-MM-YYYY';
  }

  // validate the input date string in objOfDateTime
  const parseToFormat = moment(`${objOfDateTime.date} ${objOfDateTime.time}`, 'DD-MM-YYYY HH:mm:ss', true);
  if (!parseToFormat.isValid()) {
    return 'Invalid date format in objOfDateTime! Must be DD-MM-YYYY HH:mm:ss';
  }

  const currentDate = moment().format(dateTimeFormat);
  const dateTimeFromString = moment(stringOfDate, 'DD-MM-YYYY').format(dateTimeFormat);
  const dateTimeFromObj = parseToFormat.format(dateTimeFormat);
  const currentDateUTC = moment.utc().format(dateTimeFormat); // Coordinated Universal Time
  // timezone handling

  return {
    currentDate,
    dateTimeFromString,
    dateTimeFromObj,
    currentDateUTC,
    strIsValid,
  };
}

const dateStr = '02-07-2023';
const dateTimeObj = {
  date: '02-07-2023',
  time: '18:53:17',
};

console.log(DisplayDateTime(dateStr, dateTimeObj));

// date parsing and formatting
// easily parse dates from s in various formats and format dates and times ac t spec patterns
// const date = moment('2023-10-05T14:30:00');
// console.log(date.format('MMMM Do YYYY, h:mm:ss a')); // "October 5th 2023, 2:30:00 pm"

// date manipulationto add or subtract time intervals
// const date = moment('2023-10-05');
// console.log(date.add(7, 'days').format('MMMM Do YYYY'));

// relative time
// to display relative time in a human-readable format
// const date = moment('2023-10-05T14:30:00');
// console.log(date.fromNow()); // "a few seconds ago"
