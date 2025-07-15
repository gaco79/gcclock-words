import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  lines: [
    {
      'es ist': {},
      fünf: { m: [5, 25, 35, 55] },
      zehn: { m: [10, 50] },
    },
    {
      viertel: { m: [15, 45] },
      zwanzig: { m: [20, 40] },
    },
    {
      vor: { m: [25, 40, 45, 50, 55] },
      nach: { m: [5, 10, 15, 20, 35] },
      halb: { m: [25, 30, 35] },
    },
    {
      eins: { h: [1], next_h_from_minute: 24 },
      zwei: { h: [2], next_h_from_minute: 24 },
      drei: { h: [3], next_h_from_minute: 24 },
      vier: { h: [4], next_h_from_minute: 24 },
    },
    {
      fünf: { h: [5], next_h_from_minute: 24 },
      sechs: { h: [6], next_h_from_minute: 24 },
      sieben: { h: [7], next_h_from_minute: 24 },
    },
    {
      acht: { h: [8], next_h_from_minute: 24 },
      neun: { h: [9], next_h_from_minute: 24 },
      zehn: { h: [10], next_h_from_minute: 24 },
    },
    {
      elf: { h: [11], next_h_from_minute: 24 },
      zwölf: { h: [0], next_h_from_minute: 24 },
      uhr: { m: [0] },
    },
  ],
};
