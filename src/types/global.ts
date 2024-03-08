import { LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'gcclock-words-editor': LovelaceCardEditor;
  }
}
