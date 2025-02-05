import { ClockDefinition } from '../types/ClockDefinition';

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
 *
 * From Calude.ai:
 * 10:00 - десять часов ✓ (correct)
 * 10:05 - пять минут одиннадцатого (not первого)
 * 10:10 - десять минут одиннадцатого (not первого)
 * 10:15 - четверть одиннадцатого (not второго)
 * 10:20 - двадцать минут одиннадцатого (not второго)
 * 10:25 - двадцать пять минут одиннадцатого (not второго)
 * 10:30 - половина одиннадцатого (not третьего)
 * 10:35 - без двадцати пяти одиннадцать (not тридцать пять минут третьего)
 * 10:40 - без двадцати одиннадцать (not сорок минут третьего)
 * 10:45 - без четверти одиннадцать (not сорок пять минут третьего)
 * 10:50 - без десяти одиннадцать (not десять минут четвертого)
 * 10:55 - без пяти одиннадцать (not пять минут четвертого)
 * 11:00 - одиннадцать часов ✓ (correct)
 *
 * The main concept to understand is that in Russian, times are expressed in relation to the upcoming hour,
 * not the previous one. Also, after 30 minutes past the hour, it's more common to express the time as
 *  "without X minutes until the next hour" (без X минут).
 */
export const clockDefinition: ClockDefinition = [
  {
    сейчас: {}, // now
    четверть: { m: [15, 45] }, // quarter
  },
  {
    половина: { m: [30] }, // half
    десять: { m: [10, 50] }, // ten
  },
  {
    двадцать: { m: [20, 25, 35, 40] }, // twenty
    пять: { m: [5, 25, 35, 55] }, // five
    до: { m: [45, 50, 55] }, // before/to
  },
  {
    после: { m: [5, 10, 25] }, // after/past
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
];
