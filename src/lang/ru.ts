import { ClockDefinition } from '../types/ClockDefinition';

/* Used https://www.facebook.com/qlocktwo/photos/qlocktwo-touch-alarm-clock-creators-edition-rust-in-russian-can-you-read-time-in/1136953726344346/ as baseline */

export const clockDefinition: ClockDefinition = {
  styles: `
    .gcclock-words .line {
      justify-content: center;
    }
    
    .gcclock-words .line .word {
      letter-spacing: 1.7cqw;
    }
    `,
  lines: [
    {
      СЕИЧАС: {}, // it's
      Б: { h: [] }, // TBD
      ДВА: { h: [2] }, // two
      О: { h: [] }, // TBD
    },
    {
      ЧЕТЫРЕ: { h: [4] }, // four
      ДВЕ: { h: [0] }, // twelve1
      ПЯ: { h: [] }, // TBD
    },
    {
      ОДИН: { h: [1, 11] }, // one, eleven1
      НАДЦАТЬ: { h: [0, 11] }, // twelve2, eleven2
    },
    {
      ТРИ: { h: [3] }, // three
      ДЕ: { h: [9] }, // nine1
      В: { h: [8, 9] }, // eight1, nine2
      О: { h: [8] }, // eight2
      СЕМЬ: { h: [7, 8] }, // seven, eight3
    },
    {
      ДЕС: { h: [10] }, // ten2
      ЯТЬ: { h: [9, 10] }, // nine3, ten2
      Ф: { h: [] }, // TBD
      ПЯТЬ: { h: [5] }, // five
    },
    {
      ШЕСТЬ: { h: [6] }, // six
      О: { h: [] }, // TBD
      ЧАСОВ: { h: [0, 5, 6, 7, 8, 9, 10, 11] }, // hour=5..12
    },
    {
      ЧАС: { h: [1, 2, 3, 4] }, // hour=1, hour=2..4p1
      А: { h: [2, 3, 4] }, // hour=2..4p2
      Я: { h: [] }, // TBD
      ДВА: { m: [20, 25] }, // twenty1
      ТРИ: { m: [30] }, // thirty1
    },
    {
      ПЯТ: { m: [15, 50] }, // fifteen1, fifty2
      НА: { m: [15] }, // fifteen2, fifty1
      ДЦАТЬ: { m: [15, 20, 25, 30, 35] }, // twenty, fifteen3, twenty2, thirty2
      Л: { m: [15] }, // fifteen4
    },
    {
      ЬДЕСЯТ: { m: [10, 50] }, // ten, fifty2
      СОРОК: { m: [40, 45] }, // forty
    },
    {
      ПЯТЬ: { m: [5, 25, 35, 45, 55] }, // five
      ВФ: { h: [] }, // TBD
      МИНУТ: { m: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] }, // minutes
    },
  ],
};
