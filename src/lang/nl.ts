import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  styles: `
    .gcclock-words .line {
      --base-font-size: 11.7cqw;
    }
  `,
  lines: [
    {
      'het is': {},
      vijf: {m: [5, 25, 35, 55]},
      tien: {m: [10, 20, 40, 50]},
    },
    {
      kwart: {m: [15, 45]},
      voor: {m: [20, 25, 45, 50, 55]},
    },
    {
      over: {m: [5, 10, 15, 35, 40]},
      half: {m: [20, 25, 30, 35, 40]},
      een: {h: [1], next_h_from_minute: 16},
    },
    {
      twee: {h: [2], next_h_from_minute: 16},
      drie: {h: [3], next_h_from_minute: 16},
      vier: {h: [4], next_h_from_minute: 16},
    },
    {
      vijf: {h: [5], next_h_from_minute: 16},
      zes: {h: [6], next_h_from_minute: 16},
      zeven: {h: [7], next_h_from_minute: 16},
    },
    {
      acht: {h: [8], next_h_from_minute: 16},
      negen: {h: [9], next_h_from_minute: 16},
      tien: {h: [10], next_h_from_minute: 16},
    },
    {
      elf: {h: [11], next_h_from_minute: 16},
      twaalf: {h: [0], next_h_from_minute: 16},
      uur: {m: [0]},
    },
  ]
}