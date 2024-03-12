import { LovelaceCardEditor } from 'custom-card-helpers';

import { ColorHexSelector } from '../color_hex';

declare global {
  interface HTMLElementTagNameMap {
    'gcclock-words-editor': LovelaceCardEditor;
    'ha-selector-color_hex': ColorHexSelector;
  }
}
