/* eslint-disable @typescript-eslint/no-explicit-any */
import './color_hex';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators.js';

import { GcclockWordsCardConfig } from './types/config';

@customElement('gcclock-words-editor')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GcclockWordsEditor
  extends ScopedRegistryHost(LitElement)
  implements LovelaceCardEditor
{
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

  get _muted_text_brightness(): number {
    return this._config?.muted_text_brightness ?? 0.2;
  }

  SCHEMA = [
    {
      name: '',
      type: 'grid',
      title: 'expandable',
      iconPath: 'test',
      schema: [
        {
          name: 'highlight_text_color',
          selector: { color_hex: {} },
        },
        { name: 'show_highlight_glow', selector: { boolean: {} } },
      ],
    },
    {
      name: 'muted_text_brightness',
      selector: {
        number: {
          min: 0,
          max: 1,
          step: 0.01,
        },
      },
    },
  ];

  private _computeLabel(schema): string {
    //console.log('schema', schema);

    switch (schema.name) {
      case 'highlight_text_color':
        return 'Text Colour';
      case 'show_highlight_glow':
        return 'Text Glow?';
      case 'muted_text_brightness':
        return 'Muted Text Brightness';
    }

    return 'aubergine';
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
    //console.log('ev', ev);
    const config = ev.detail.value;
    fireEvent(this, 'config-changed', { config });
  }

  static styles: CSSResultGroup = css``;
}
