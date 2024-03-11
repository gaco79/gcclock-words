/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators';

import { GcclockWordsCardConfig } from './types/config';

import('./color_hex');

@customElement('gcclock-words-editor')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GcclockWordsEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: GcclockWordsCardConfig;

  public setConfig(config: GcclockWordsCardConfig): void {
    this._config = config;
  }

  get _highlight_text_color(): string {
    return this._config?.highlight_text_color ?? 'var(--mdc-theme-primary)';
  }

  get _show_highlight_glow(): boolean {
    return this._config?.show_highlight_glow ?? true;
  }

  SCHEMA = [
    {
      name: 'highlight_text_color',
      selector: { color_hex: {} },
    },
    { name: 'show_highlight_glow', selector: { boolean: {} } },
  ];

  private _computeLabel(): string {
    return 'computelabel';
  }

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    console.log('ev', ev);
    const config = ev.detail.value;
    fireEvent(this, 'config-changed', { config });
  }

  static styles: CSSResultGroup = css``;
}
