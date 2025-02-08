import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  styles: `
    .gcclock-words .line {
      --base-font-size: 10.5cqw;
    }
  `,
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
      quatre: { h: [4], next_h_from_minute: 31 },
    },
    {
      une: { h: [1], next_h_from_minute: 31 },
      deux: { h: [2], next_h_from_minute: 31 },
      trois: { h: [3], next_h_from_minute: 31 },
    },
    {
      cinq: { h: [5], next_h_from_minute: 31 },
      six: { h: [6], next_h_from_minute: 31 },
      sept: { h: [7], next_h_from_minute: 31 },
      dix: { h: [10], next_h_from_minute: 31 },
    },
    {
      huit: { h: [8], next_h_from_minute: 31 },
      neuf: { h: [9], next_h_from_minute: 31 },
      onze: { h: [11], next_h_from_minute: 31 },
    },
    {
      douze: { h: [0], next_h_from_minute: 31 },
      heures: { m: [0] },
    },
  ],
};
