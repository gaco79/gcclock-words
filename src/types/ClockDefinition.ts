/** Condition for when to show a word (empty object means always show */
interface WordCondition {
  /** Hour condition */
  h?: number[];
  /** Array of minute values (multiples of 5) */
  m?: number[];
}

/** Definition for a single line in the clock */
interface ClockLine {
  [word: string]: WordCondition;
}

/** Complete clock definition for a language */
export type ClockDefinition = {
  styles?: string;
  lines: ClockLine[];
  /** Minute threshold to start using next hour */
  next_h_from_minute: number;
};
