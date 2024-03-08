/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  css,
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import {
  DEFAULT_ACTION,
  DEFAULT_ALIGNMENT,
  DEFAULT_CLIP,
  DEFAULT_COLOR,
  DEFAULT_CONFIG,
  DEFAULT_INIT,
  DEFAULT_SHOW,
  DEFAULT_TOOLTIP,
} from './const';
import { CardConfig } from './types/config';
import {
  DropdownProperty,
  InputProperty,
  NumberProperty,
  Option,
  Property,
  SwitchProperty,
  UnionProperty,
} from './types/editor';

@customElement('gcclock-words-editor')
export class GcclockWordsEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: CardConfig;
  @internalProperty() private _toggle?: boolean;
  @internalProperty() private _helpers?: any;
  @internalProperty() private options?: { [id: string]: Option };
  private _initialized = false;

  public setConfig(config: CardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._helpers || !this.options) {
      return html``;
    }

    this._helpers.importMoreInfoControl('climate');

    return html`
      <div class="card-config">
        ${Object.entries(this.options).map(option => this.renderOption(option[0], option[1]))}
      </div>
    `;
  }

  private renderOption(key: string, option: Option): TemplateResult {
    return html`
      <div class="option" @click=${this._toggleOption} .option=${key}>
        <div class="row">
          <ha-icon .icon=${`mdi:${option.icon}`}></ha-icon>
          <div class="title">${option.name}</div>
        </div>
        <div class="secondary">${option.description}</div>
      </div>

      ${option.show
        ? html`
            <div class="values">
              ${option.properties.map(property => this.renderProperty(property))}
            </div>
          `
        : ''}
    `;
  }

  private renderProperty(property: UnionProperty): TemplateResult {
    if (property.type == 'input') return this.renderInputProperty(property);
    if (property.type == 'number') return this.renderNumberProperty(property);
    if (property.type == 'dropdown') return this.renderDropdownProperty(property);
    if (property.type == 'switch') return this.renderSwitchProperty(property);
    return html``;
  }

  private renderInputProperty(property: InputProperty): TemplateResult {
    return html`
      <paper-input
        label=${property.label}
        placeholder=${property.default || ''}
        .value=${this.getPropertyValue(property)}
        .configValue=${property.name}
        .configSection=${property.section}
        @value-changed=${this._valueChanged}
      ></paper-input>
    `;
  }

  private renderNumberProperty(property: NumberProperty): TemplateResult {
    return html`
      <paper-input
        label=${property.label}
        placeholder=${property.default || ''}
        .value=${this.getPropertyValue(property)}
        .configValue=${property.name}
        .configSection=${property.section}
        .number=${true}
        @value-changed=${this._valueChanged}
        min=${property.min}
        max=${property.max}
        type="number"
      ></paper-input>
    `;
  }

  private renderSwitchProperty(property: SwitchProperty): TemplateResult {
    const checked = this.getPropertyValue(property);
    return html`
      <br />
      <ha-formfield .label=${property.label}>
        <ha-switch
          .checked=${checked != undefined ? checked : property.default != undefined ? property.default : false}
          .configValue=${property.name}
          .configSection=${property.section}
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  private renderDropdownProperty(property: DropdownProperty): TemplateResult {
    return html`
      <paper-dropdown-menu
        label=${property.label}
        .value=${this.getPropertyValue(property) || property.default || ''}
        @value-changed=${this._valueChanged}
        .configValue=${property.name}
        .configSection=${property.section}
      >
        <paper-listbox slot="dropdown-content" .selected=${property.selected}>
          ${property.items.map(item => {
            return html`
              <paper-item>${item}</paper-item>
            `;
          })}
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }

  private getPropertyValue(property: Property): any {
    if (this._config == undefined) return undefined;
    const parent = property.section ? this._config[property.section] : this._config;
    if (parent == undefined) return undefined;
    return parent[property.name];
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;

    const entities = Object.keys(this.hass.states);
    const actions = ['more-info', 'url', 'navigate', 'toggle', 'call-service', 'fire-dom-event'];
    const haptics = ['success', 'warning', 'failure', 'light', 'medium', 'heavy', 'selection'];
    const alignments = ['center', 'right', 'left', 'spaced'];
    const effects = ['fade', 'shadow'];
    const targets = ['card', 'status', 'title', 'icon'];
    const animations = ['none', 'raise', 'reveal', 'slide'];

    this.options = {
      mandatory: {
        icon: 'tune',
        name: 'Mandatory',
        description: 'Required options for this card to function',
        show: true,
        properties: [
          {
            type: 'input',
            name: 'icon',
            label: 'Icon',
          },
        ],
      },
    };
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _toggleOption(ev): void {
    if (this.options == undefined) return undefined;

    const show = !this.options[ev.target.option].show;
    for (const [key] of Object.entries(this.options)) {
      this.options[key].show = false;
    }
    this.options[ev.target.option].show = show;
    this._toggle = !this._toggle;
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const section = target.configSection;
    const config = { ...this._config };
    const parent = (section ? { ...config[section] } : config) || {};

    if (target.configValue) {
      if ((target.value === undefined && target.checked === undefined) || target.value === '') {
        delete parent[target.configValue];
        if (section) this._config = { ...config, [section]: parent };
        else this._config = { ...parent };
      } else {
        const key = target.configValue;
        const rawValue = target.checked !== undefined ? target.checked : target.value;
        const value = target.number ? parseFloat(rawValue) : rawValue;

        if (section) {
          this._config = {
            ...config,
            [section]: { ...config[section], [key]: value },
          };
        } else {
          this._config = {
            ...config,
            [key]: value,
          };
        }
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `;
  }
}
