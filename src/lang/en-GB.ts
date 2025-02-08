import { ClockDefinition } from '../types/ClockDefinition';

export const clockDefinition: ClockDefinition = {
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
      one: { h: [1], next_h_from_minute: 31 },
      two: { h: [2], next_h_from_minute: 31 },
    },
    {
      three: { h: [3], next_h_from_minute: 31 },
      four: { h: [4], next_h_from_minute: 31 },
      five: { h: [5], next_h_from_minute: 31 },
    },
    {
      six: { h: [6], next_h_from_minute: 31 },
      seven: { h: [7], next_h_from_minute: 31 },
      eight: { h: [8], next_h_from_minute: 31 },
    },
    {
      nine: { h: [9], next_h_from_minute: 31 },
      ten: { h: [10], next_h_from_minute: 31 },
      eleven: { h: [11], next_h_from_minute: 31 },
    },
    {
      twelve: { h: [0], next_h_from_minute: 31 },
      "o'clock": { m: [0] },
    },
  ],
};
