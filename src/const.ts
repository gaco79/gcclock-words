/* eslint-disable @typescript-eslint/camelcase */
export const CARD_VERSION = '0.0.2';

export const DEFAULT_CONFIG = {
  hours_to_show: 24,
  severity: 100,
  update_interval: 30,
  title_template: '[[[ return entity.attributes.friendly_name; ]]]',
  average_template: '[[[ return variables.uptime.toFixed(2); ]]]%',
  status_template: '[[[ return variables.current; ]]]',
  title_adaptive_color: false,
  status_adaptive_color: false,
  icon_adaptive_color: false,
  tooltip_adaptive_color: false,
};
