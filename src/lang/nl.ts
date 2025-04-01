import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  styles: `
    .gcclock-words .line {
      --base-font-size: 11.7cqw;
    }
  `,
  next_h_from_minute: 16,
  lines: [
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
      een: { h: [1] },
    },
    {
      twee: { h: [2] },
      drie: { h: [3] },
      vier: { h: [4] },
    },
    {
      vijf: { h: [5] },
      zes: { h: [6] },
      zeven: { h: [7] },
    },
    {
      acht: { h: [8] },
      negen: { h: [9] },
      tien: { h: [10] },
    },
    {
      elf: { h: [11] },
      twaalf: { h: [0] },
      uur: { m: [0] },
    },
  ],
};
