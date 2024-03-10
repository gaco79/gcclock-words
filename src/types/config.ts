import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export interface GcclockWordsCardConfig extends LovelaceCardConfig {
  type: string;
  highlight_text_color?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
