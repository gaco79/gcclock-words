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
      zwanzig: { m: [20, 25, 35, 40] },
    },
    {
      halb: { m: [30] },
      vor: { m: [35, 40, 45, 50, 55] },
      nach: { m: [5, 10, 15, 20, 25] },
    },
    {
      ein: { h: [1], next_h_from_minute: 16 },
      zwei: { h: [2], next_h_from_minute: 16 },
      drei: { h: [3], next_h_from_minute: 16 },
      vier: { h: [4], next_h_from_minute: 16 },
    },
    {
      fünf: { h: [5], next_h_from_minute: 16 },
      sechs: { h: [6], next_h_from_minute: 16 },
      sieben: { h: [7], next_h_from_minute: 16 },
    },
    {
      acht: { h: [8], next_h_from_minute: 16 },
      neun: { h: [9], next_h_from_minute: 16 },
      zehn: { h: [10], next_h_from_minute: 16 },
    },
    {
      elf: { h: [11], next_h_from_minute: 16 },
      zwölf: { h: [0], next_h_from_minute: 16 },
      uhr: { m: [0] },
    },
  ],
};
