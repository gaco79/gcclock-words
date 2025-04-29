import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
  next_h_from_minute: 31,
  lines: [
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
      one: { h: [1] },
      two: { h: [2] },
    },
    {
      three: { h: [3] },
      four: { h: [4] },
      five: { h: [5] },
    },
    {
      six: { h: [6] },
      seven: { h: [7] },
      eight: { h: [8] },
    },
    {
      nine: { h: [9] },
      ten: { h: [10] },
      eleven: { h: [11] },
    },
    {
      twelve: { h: [0] },
      "o'clock": { m: [0] },
    },
  ],
};
