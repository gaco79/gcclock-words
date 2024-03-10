import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export interface GcclockWordsCardConfig extends LovelaceCardConfig {
  type: string;
  highlight_text_color?: string;
}
