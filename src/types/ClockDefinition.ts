/** Condition for when to show a word */
interface WordCondition {
  /** Hour condition (true means always show) */
  h?: number;
  /** Minute threshold to start using next hour */
  next_h_from_minute?: number;
  /** Array of minute values (multiples of 5) */
  m?: number[];
}

/** Definition for a single line in the clock */
interface ClockLine {
  [word: string]: WordCondition;
}

/** Complete clock definition for a language */
export type ClockDefinition = ClockLine[];
