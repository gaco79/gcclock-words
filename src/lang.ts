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
export const LINE_DEFS = {
  'en-GB': [
    {
      "it's": {},
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
      'het is': {},
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
  de: [
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
  ],
  /**
   * RUSSIAN TRANSLATION - Work in progress, may be incorrect
   *
   * Russian grammatical rules:
   * 10:00 - десять часов
   * 10:05 - пять минут первого
   * 10:10 - десять минут первого
   * 10:15 - четверть второго
   * 10:20 - двадцать минут второго
   * 10:25 - двадцать пять минут второго
   * 10:30 - половина третьего
   * 10:35 - тридцать пять минут третьего
   * 10:40 - сорок минут третьего
   * 10:45 - сорок пять минут третьего
   * 10:50 - десять минут четвертого
   * 10:55 - пять минут четвертого
   * 11:00 - одиннадцать часов
   */
  ru: [
    {
      сейчас: {}, // now
      четверть: { m: [15, 45] }, // quarter
    },
    {
      половина: { m: [30] }, // half
      пять: { m: [5, 25, 35, 55] }, // five
    },
    {
      десять: { m: [10, 50] }, // ten
      двадцать: { m: [20, 40] }, // twenty
      до: { m: [45, 50, 55] }, // before/to
    },
    {
      после: { m: [5, 10, 15, 20, 25] }, // after/past
      один: { h: 1, next_h_from_minute: 30 }, // one
      два: { h: 2, next_h_from_minute: 30 }, // two
    },
    {
      три: { h: 3, next_h_from_minute: 30 }, // three
      четыре: { h: 4, next_h_from_minute: 30 }, // four
      пять: { h: 5, next_h_from_minute: 30 }, // five
    },
    {
      шесть: { h: 6, next_h_from_minute: 30 }, // six
      семь: { h: 7, next_h_from_minute: 30 }, // seven
      восемь: { h: 8, next_h_from_minute: 30 }, // eight
    },
    {
      девять: { h: 9, next_h_from_minute: 30 }, // nine
      десять: { h: 10, next_h_from_minute: 30 }, // ten
    },
    {
      одиннадцать: { h: 11, next_h_from_minute: 30 }, // eleven
    },
    {
      двенадцать: { h: 0, next_h_from_minute: 30 }, // twelve
      часов: { m: [0] }, // hours/o'clock
    },
  ],
};
