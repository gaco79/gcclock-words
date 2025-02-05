import { LovelaceCardConfig } from 'custom-card-helpers';

export interface GcclockWordsCardConfig extends LovelaceCardConfig {
  type: string;
  highlight_text_color?: string;
  show_highlight_glow?: boolean;
  muted_text_brightness?: number;
  language?: string;
}
