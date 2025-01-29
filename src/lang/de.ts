import { ClockDefinition } from '../types/ClockDefinition';
/*
  The clock definition for a specific language is an array of objects, one for each line of the clock.
  Each object has as keys the words to show on that line, and as values an array with one or more
  conditions to be true for the word to light up.

  Each condition is an object with one or more of the following keys:
    - h: hour condition
    - next_h_from_minute: minute threshold for next hour
    - m: minute condition

  The `h` condition checks against the current hour. If set to `true`, it means the word is always shown.

  The `m` condition is an array of values that is checked against the current minute rounded to the nearest multiple of five.

  The `next_h_from_minute` value is used in conjunction with `h` conditions. If present, the hour check will 
  use the next hour when the current minute is >= this value. For example, "ten to five" at 4:50PM uses 
  next_h_from_minute: 31 to reference the next hour (5) after 31 minutes past the current hour.
 */
export const clockDefinition: ClockDefinition = [
  {
    'es ist': {},
    viertel: { m: [15, 45] },
    halb: { m: [30] },
  },
  {
    fünf: { m: [5, 25, 35, 55] },
    zehn: { m: [10, 50] },
    zwanzig: { m: [20, 25, 35, 40] },
  },
  {
    vor: { m: [35, 40, 45, 50, 55] },
    nach: { m: [5, 10, 15, 20, 25] },
    ein: { h: 1, next_h_from_minute: 16 },
    zwei: { h: 2, next_h_from_minute: 16 },
  },
  {
    drei: { h: 3, next_h_from_minute: 16 },
    vier: { h: 4, next_h_from_minute: 16 },
    fünf: { h: 5, next_h_from_minute: 16 },
  },
  {
    sechs: { h: 6, next_h_from_minute: 16 },
    sieben: { h: 7, next_h_from_minute: 16 },
    acht: { h: 8, next_h_from_minute: 16 },
  },
  {
    neun: { h: 9, next_h_from_minute: 16 },
    zehn: { h: 10, next_h_from_minute: 16 },
    elf: { h: 11, next_h_from_minute: 16 },
  },
  {
    zwölf: { h: 0, next_h_from_minute: 16 },
    uhr: { m: [0] },
  },
];
