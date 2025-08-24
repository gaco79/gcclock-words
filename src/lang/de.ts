import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  next_h_from_minute: 29,
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
      ein: { h: [1] },
      zwei: { h: [2] },
      drei: { h: [3] },
      vier: { h: [4] },
    },
    {
      fünf: { h: [5] },
      sechs: { h: [6] },
      sieben: { h: [7] },
    },
    {
      acht: { h: [8] },
      neun: { h: [9] },
      zehn: { h: [10] },
    },
    {
      elf: { h: [11] },
      zwölf: { h: [0] },
      uhr: { m: [0] },
    },
  ],
};
