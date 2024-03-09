import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export interface GcclockWordsCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// TODO delete this once testing complete
export interface ComfortableEnvironmentCardConfig extends LovelaceCardConfig {
  type: string;
  room_name: string;
  temperature_sensor: string;
  humidity_sensor: string;
  show_index: string;
}
