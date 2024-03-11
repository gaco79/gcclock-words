/*
Custom HA selector. The default color_rgb selector returns an array for [r,g,b].. I just want hex codes

Almost completely copied from:
https://github.com/home-assistant/frontend/blob/9e81055070da9b3b75513524d61bc3f965eb3fd1/src/components/ha-selector/ha-selector-color-rgb.ts
 */

import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';

export interface ColorRGBSelector {
  // eslint-disable-next-line @typescript-eslint/ban-types
  color_rgb: {} | null;
}

@customElement('ha-selector-color_hex')
export class ColorHexSelector extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public selector!: ColorRGBSelector;

  @property() public value?: string;

  @property() public label?: string;

  @property() public helper?: string;

  @property({ type: Boolean, reflect: true }) public disabled = false;

  @property({ type: Boolean }) public required = true;

  protected render(): TemplateResult | void {
    return html`
      <ha-textfield
        type="color"
        helperPersistent
        .value=${this.value || ''}
        .label=${this.label || ''}
        .required=${this.required}
        .helper=${this.helper}
        .disalbled=${this.disabled}
        @change=${this._valueChanged}
      ></ha-textfield>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = (ev.target as any).value;
    fireEvent(this, 'value-changed', {
      value: value,
    });
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    ha-textfield {
      --text-field-padding: 8px;
      min-width: 75px;
      flex-grow: 1;
      margin: 0 4px;
    }
  `;
}
