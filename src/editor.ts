/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, state } from 'lit/decorators';

import { GcclockWordsCardConfig } from './types/config';

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

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <ha-card>
        <div>
          <h1 class="card-header">Colors</h1>
          <input
            type="color"
            .value=${this._highlight_text_color}
            .configValue=${'highlight_text_color'}
            @input=${this._valueChanged}
          />
          <ha-textfield
            .value=${this._highlight_text_color}
            .configValue=${'highlight_text_color'}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
      </ha-card>
    `;
  }

  static styles: CSSResultGroup = css``;

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target;

    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          //[target.configValue]: target.checked !== undefined ? target.checked : target.value,
          [target.configValue]: target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }
}
