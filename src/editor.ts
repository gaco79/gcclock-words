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

  get _room_name(): string {
    return this._config?.room_name ?? '';
  }

  get _temperature_sensor(): string {
    return this._config?.temperature_sensor ?? '';
  }

  get _humidity_sensor(): string {
    return this._config?.humidity_sensor ?? '';
  }

  get _degree_fahrenheit(): boolean {
    return this._config?.degree_fahrenheit ?? false;
  }

  get _show_index(): string {
    return this._config?.show_index ?? 'ALL';
  }

  protected render(): TemplateResult | void {
    if (!this.hass) {
      return html``;
    }

    const hass_devices = this.hass.states;
    const tempSensors: string[] = [];
    Object.keys(hass_devices)
      .filter(eid => eid.startsWith('sensor', 0))
      .sort((a, b) => a.localeCompare(b))
      .forEach(function(k) {
        if (hass_devices[k].attributes.device_class === 'temperature') {
          tempSensors.push(k);
        }
      });
    const humSensors: string[] = [];
    Object.keys(hass_devices)
      .filter(eid => eid.startsWith('sensor', 0))
      .sort((a, b) => a.localeCompare(b))
      .forEach(function(k) {
        if (hass_devices[k].attributes.device_class === 'humidity') {
          humSensors.push(k);
        }
      });

    return html`
      <ha-textfield
        label="Room name"
        .value=${this._room_name}
        .configValue=${'room_name'}
        @input=${this._valueChanged}
      ></ha-textfield>

      <ha-select
        naturalMenuWidth
        fixedMenuPosition
        label="Temp Sensor"
        .configValue=${'temperature_sensor'}
        .value=${this._temperature_sensor}
        @selected=${this._valueChanged}
        @closed=${ev => ev.stopPropagation()}
      >
        ${tempSensors.map(entity => {
          return html`
            <mwc-list-item .value=${entity}>${entity}</mwc-list-item>
          `;
        })}
      </ha-select>

      <ha-select
        naturalMenuWidth
        fixedMenuPosition
        label="Humidity sensor"
        .configValue=${'humidity_sensor'}
        .value=${this._humidity_sensor}
        @selected=${this._valueChanged}
        @closed=${ev => ev.stopPropagation()}
      >
        ${humSensors.map(entity => {
          return html`
            <mwc-list-item .value=${entity}>${entity}</mwc-list-item>
          `;
        })}
      </ha-select>

      <ha-select
        naturalMenuWidth
        fixedMenuPosition
        label="show index"
        .configValue=${'show_index'}
        .value=${this._show_index}
        @selected=${this._valueChanged}
        @closed=${ev => ev.stopPropagation()}
      >
        ${['ALL', 'HI', 'DI'].map(entity => {
          return html`
            <mwc-list-item .value=${entity}>${entity}</mwc-list-item>
          `;
        })}
      </ha-select>
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
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }
}
