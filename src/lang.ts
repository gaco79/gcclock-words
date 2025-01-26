/*
  The clock definition for a specific language is an array of objects, one for each line of the clock.
  Each Objects has as keys the words to show on that line, and as values an array with one or more
  conditions to be true for the word to light up.

  Each conditions can be one of:
  - the boolean TRUE - always show the word
  - an object with one or more of the following keys:
    - h
    - next_h_from_minute
    - m

  The `h` condition checks against the current hour, and can either be a single value, or an array of hours
  (hours are between 0 and 11)

  The `m` condition checks against the current minute rounded to the nearest multiple of five. As for the hours,
  the value can either be a single value to check, or an array of values.

  The `next_h_from_minute` value is used in conjuction with `h` conditions, and if used will not check against the
  hour-value given in the `h` condition, but the next hour if the current minute is >= than the `next_h_from_minute`
  value. This is used in languages where for example values in the second half hour refer to the next hour
  (e.g. "It's ten to five" if the time is 4:50PM)
 */
export const LINE_DEFS = {
  en: [
    {
      "it's": { h: true },
      quarter: { m: [15, 45] },
      half: { m: [30] },
    },
    {
      ten: { m: [10, 50] },
      twenty: { m: [20, 25, 35, 40] },
      five: { m: [5, 25, 35, 55] },
    },
    {
      to: { m: [35, 40, 45, 50, 55] },
      past: { m: [5, 10, 15, 20, 25, 30] },
      one: { h: 1, next_h_from_minute: 31 },
      two: { h: 2, next_h_from_minute: 31 },
    },
    {
      three: { h: 3, next_h_from_minute: 31 },
      four: { h: 4, next_h_from_minute: 31 },
      five: { h: 5, next_h_from_minute: 31 },
    },
    {
      six: { h: 6, next_h_from_minute: 31 },
      seven: { h: 7, next_h_from_minute: 31 },
      eight: { h: 8, next_h_from_minute: 31 },
    },
    {
      nine: { h: 9, next_h_from_minute: 31 },
      ten: { h: 10, next_h_from_minute: 31 },
      eleven: { h: 11, next_h_from_minute: 31 },
    },
    {
      twelve: { h: 0, next_h_from_minute: 31 },
      "o'clock": { m: [0] },
    },
  ],
  nl: [
    {
      'het is': { h: true },
      vijf: { m: [5, 25, 35, 55] },
      tien: { m: [10, 20, 40, 50] },
    },
    {
      kwart: { m: [15, 45] },
      voor: { m: [20, 25, 45, 50, 55] },
    },
    {
      over: { m: [5, 10, 15, 35, 40] },
      half: { m: [20, 25, 30, 35, 40] },
      een: { h: 1, next_h_from_minute: 16 },
    },
    {
      twee: { h: 2, next_h_from_minute: 16 },
      drie: { h: 3, next_h_from_minute: 16 },
      vier: { h: 4, next_h_from_minute: 16 },
    },
    {
      vijf: { h: 5, next_h_from_minute: 16 },
      zes: { h: 6, next_h_from_minute: 16 },
      zeven: { h: 7, next_h_from_minute: 16 },
    },
    {
      acht: { h: 8, next_h_from_minute: 16 },
      negen: { h: 9, next_h_from_minute: 16 },
      tien: { h: 10, next_h_from_minute: 16 },
    },
    {
      elf: { h: 11, next_h_from_minute: 16 },
      twaalf: { h: 0, next_h_from_minute: 16 },
      uur: { m: [0] },
    },
  ],
};
