/*
  The clock definition for a specific language is an array of objects, one for each line of the clock.
  Each Objects has as keys the words to show on that line, and as values an array with one or more
  conditions to be true for the word to light up.

  Each conditions can be one of:
  - the boolean TRUE - always show the word
  - an object with one or more of the following keys:
    - h
    - minuteshift
    - m

  The `h` condition checks against the current hour, and can either be a single value, or an array of hours
  (hours are between 1 and 12)

  The `m` condition checks against the current minute rounded to the nearest multiple of five. As for the hours,
  the value can either be a single value to check, or an array of values.

  The `minuteshift` value is used in conjuction with `h` conditions, and if used will not check against the
  hour-value given in the `h` condition, but the next hour if the current minute is bigger than the `minuteshift`
  value. This is used in languages where for example values in the second half hour refer to the next hour
  (e.g. "It's ten to five" if the time is 4:50PM)
 */
export const LINE_DEFS = {
  en: [
    {
      "it's": [true],
      quarter: [{ m: [15, 45] }],
      half: [{ m: 30 }],
    },
    {
      ten: [{ m: [10, 50] }],
      twenty: [{ m: [20, 25, 35, 40] }],
      five: [{ m: [5, 25, 35, 55] }],
    },
    {
      to: [{ m: [35, 40, 45, 50, 55] }],
      past: [{ m: [5, 10, 15, 20, 25] }],
      one: [{ h: 1, minuteshift: 30 }],
      two: [{ h: 2, minuteshift: 30 }],
    },
    {
      three: [{ h: 3, minuteshift: -30 }],
      four: [{ h: 4, minuteshift: -30 }],
      five: [{ h: 5, minuteshift: -30 }],
    },
    {
      six: [{ h: 6, minuteshift: 30 }],
      seven: [{ h: 7, minuteshift: 30 }],
      eight: [{ h: 8, minuteshift: 30 }],
    },
    {
      nine: [{ h: 9, minuteshift: 31 }],
      ten: [{ h: 10, minuteshift: 31 }],
      eleven: [{ h: 11, minuteshift: -30 }],
    },
    {
      twelve: [{ h: 12, minuteshift: 30 }],
      "o'clock": [{ m: 0 }],
    },
  ],
  nl: [
    {
      'het is': [true],
      vijf: [{ m: [5, 25, 35, 55] }],
      tien: [{ m: [10, 20, 40, 50] }],
    },
    {
      kwart: [{ m: [15, 45] }],
      voor: [{ m: [20, 25, 45, 50, 55] }],
    },
    {
      over: [{ m: [5, 10, 15, 35, 40] }],
      half: [{ m: [20, 25, 30, 35, 40] }],
      een: [{ h: 1, minuteshift: 30 }],
    },
    {
      twee: [{ h: 2, minuteshift: 30 }],
      drie: [{ h: 3, minuteshift: 30 }],
      vier: [{ h: 4, minuteshift: -30 }],
    },
    {
      vijf: [{ h: 5, minuteshift: -30 }],
      zes: [{ h: 6, minuteshift: 30 }],
      zeven: [{ h: 7, minuteshift: 30 }],
    },
    {
      acht: [{ h: 8, minuteshift: 30 }],
      negen: [{ h: 9, minuteshift: 30 }],
      tien: [{ h: 10, minuteshift: 30 }],
    },
    {
      elf: [{ h: 11, minuteshift: 30 }],
      twaalf: [{ h: 12, minuteshift: 30 }],
      uur: [{ m: 0 }],
    },
  ],
};
