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

  get _show_highlight_glow(): boolean {
    return this._config?.show_highlight_glow ?? true;
  }

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div>
        <h1 class="card-header">Colors</h1>

        <div>
          <label>Highlight Colour</label>
          <input
            type="color"
            .value=${this._highlight_text_color}
            .configValue=${'highlight_text_color'}
            @input=${this._valueChanged}
          />
        </div>

        <div>
          <label>Show Highlight Text Glow?</label>

          <ha-checkbox
            .checked=${this._show_highlight_glow}
            .configValue=${'show_highlight_glow'}
            @change=${this._checkboxChanged}
          ></ha-checkbox>
        </div>
      </div>
    `;
  }

  static styles: CSSResultGroup = css``;

  private _checkboxChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target;
    console.log('chckbox chgd: target.checked', target.checked);

    if (this[`_${target.configValue}`] === target.checked) {
      return;
    }

    if (target.configValue) {
      this._config = {
        ...this._config,
        [target.configValue]: target.checked,
      };
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }

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
