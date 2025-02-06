import { clockDefinition as enGB } from './lang/en-GB';
import { clockDefinition as nl } from './lang/nl';
import { clockDefinition as fr } from './lang/fr';
import { clockDefinition as de } from './lang/de';
import { clockDefinition as ru } from './lang/ru';

import { ClockDefinition } from './types/ClockDefinition';

/*
  The clock definition for a specific language is an array of objects, one for each line of the clock.
  Each object has as keys the words to show on that line, and as values an array with one or more
  conditions to be true for the word to light up.

  Each condition is an object with one or more of the following keys:
    - h: hour condition
    - next_h_from_minute: minute threshold for next hour
    - m: minute condition

  The `h` condition checks against the current hour.

  The `m` condition is an array of values that is checked against the current minute rounded to the nearest multiple of five.

  The `next_h_from_minute` value is used in conjunction with `h` conditions. If present, the hour check will 
  use the next hour when the current minute is >= this value. For example, "ten to five" at 4:50PM uses 
  next_h_from_minute: 31 to reference the next hour (5) after 31 minutes past the current hour.

  A condition with none of these keys (e.g. just {}) will show the word to always show.
 */
export const LINE_DEFS: Record<string, ClockDefinition> = {
  'en-GB': enGB,
  nl,
  fr,
  de,
  ru,
};
