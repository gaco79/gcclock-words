import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  styles: `
    .gcclock-words .line {
      --base-font-size: 10.5cqw;
    }
  `,
  next_h_from_minute: 31,
  lines: [
    {
      'il est': {},
      cinq: { m: [5, 25, 35, 55] },
      quart: { m: [15, 45] },
    },
    {
      dix: { m: [10, 50] },
      vingt: { m: [20, 25, 35, 40] },
      demie: { m: [30] },
    },
    {
      moins: { m: [35, 40, 45, 50, 55] },
      et: { m: [5, 10, 15, 20, 25, 30] },
      quatre: { h: [4] },
    },
    {
      une: { h: [1] },
      deux: { h: [2] },
      trois: { h: [3] },
    },
    {
      cinq: { h: [5] },
      six: { h: [6] },
      sept: { h: [7] },
      dix: { h: [10] },
    },
    {
      huit: { h: [8] },
      neuf: { h: [9] },
      onze: { h: [11] },
    },
    {
      douze: { h: [0] },
      heures: { m: [0] },
    },
  ],
};
