/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';

import { hasConfigOrEntityChanged, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import {
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  PropertyValues,
  TemplateResult,
} from 'lit-element';

import {
  CARD_VERSION,
  DEFAULT_ACTION,
  DEFAULT_ALIGNMENT,
  DEFAULT_BAR,
  DEFAULT_CLIP,
  DEFAULT_COLOR,
  DEFAULT_CONFIG,
  DEFAULT_INIT,
  DEFAULT_SHOW,
  DEFAULT_TOOLTIP,
} from './const';
import style from './style';
import { CardConfig } from './types/config';

function loadCSS(url): void {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
loadCSS('https://fonts.googleapis.com/css?family=Titillium+Web:700');

/* eslint no-console: 0 */
console.info(`%c gcclock-words \n   ${CARD_VERSION}    `, 'color: white; background-color: #C6B145; font-weight: 700;');

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'gcclock-words',
  name: 'Time in Words',
  description: 'Clock displaying Time in Words.',
});

@customElement('gcclock-words')
export class GcClockWords extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('uptime-card-editor');
  }

  @property({ attribute: false }) public _hass!: HomeAssistant;
  @internalProperty() private config!: CardConfig;
  @internalProperty() private sensor?: HassEntity;

  @internalProperty() private lastUpdateMinutes = 0;
  @internalProperty() private currentTime!: number[];

  dateTime = new Date();

  /**
   * Called when the state of Home Assistant changes (frequent).
   * @param config The new hass.
   */
  public set hass(hass: HomeAssistant) {
    this.updateData();

    if (this.currentTime[1] == this.lastUpdateMinutes) return;

    this._hass = hass;
    this.lastUpdateMinutes = this.currentTime[1];
  }

  /**
   * The list of clickable actions
   */
  public get actions(): string[] {
    return ['more-info', 'url', 'navigate', 'toggle', 'call-service', 'fire-dom-event'];
  }

  /**
   * Called when the configuration change (rare).
   * @param config The new config.
   */
  public setConfig(config: CardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration !');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      color: { ...DEFAULT_COLOR, ...config.color },
      alias: { ...config.alias },
      show: { ...DEFAULT_SHOW, ...config.show },
      bar: { ...DEFAULT_BAR, ...config.bar },
      tooltip: { ...DEFAULT_TOOLTIP, ...config.tooltip },
      tap_action: { ...DEFAULT_ACTION, ...config.tap_action },
      alignment: { ...DEFAULT_ALIGNMENT, ...config.alignment },
      init: { ...DEFAULT_INIT, ...config.init },
      clip: { ...DEFAULT_CLIP, ...config.clip },
    };

    if (typeof this.config.ok == 'string') this.config.ok = [this.config.ok];
    if (typeof this.config.ko == 'string') this.config.ko = [this.config.ko];

    if (this.config.ok != undefined) this.config.ok = this.config.ok.map(s => s.toString());
    if (this.config.ko != undefined) this.config.ko = this.config.ko.map(s => s.toString());

    this.updateData();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    changedProps;

    this.updateData();
  }

  private updateData(): void {
    this.currentTime = [this.dateTime.getHours(), this.dateTime.getMinutes()];
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private isHour(hour: number): string {
    let timeHour = this.currentTime[0] % 12;
    if (timeHour == 0) timeHour = 12;

    if (this.currentTime[1] > 32) timeHour++;

    return timeHour == hour ? 'active' : '';
  }

  private isDirection(direction: string): string {
    const minutes = this.currentTime[1];

    if (direction == 'past' && minutes > 2 && minutes < 28) return 'active';
    if (direction == 'to' && minutes > 32 && minutes < 58) return 'active';

    return '';
  }

  private isMinute(minute: number): string {
    const time = this.currentTime[1];

    if (this.between(time, 0, 2) && minute == 0) return 'active';
    if (this.between(time, 3, 8) && minute == 5) return 'active';
    if (this.between(time, 9, 13) && minute == 10) return 'active';
    if (this.between(time, 14, 18) && minute == 15) return 'active';
    if (this.between(time, 19, 23) && minute == 20) return 'active';
    if (this.between(time, 24, 27) && (minute == 20 || minute == 5)) return 'active';
    if (this.between(time, 28, 32) && minute == 30) return 'active';
    if (this.between(time, 33, 37) && (minute == 20 || minute == 5)) return 'active';
    if (this.between(time, 38, 42) && minute == 20) return 'active';
    if (this.between(time, 42, 47) && minute == 15) return 'active';
    if (this.between(time, 48, 53) && minute == 10) return 'active';
    if (this.between(time, 54, 57) && minute == 5) return 'active';
    if (this.between(time, 58, 60) && minute == 0) return 'active';

    return '';
  }

  private between(x, min, max): boolean {
    return x >= min && x <= max;
  }

  /**
   * Rendering
   */
  protected render(): TemplateResult {
    return html`
      <div class="gcclock-words">
        <div class="line">
          <span class="word active">it's</span><span class="word ${this.isMinute(15)}">quarter</span
          ><span class="word ${this.isMinute(30)}">half</span>
        </div>
        <div class="line">
          <span class="word ${this.isMinute(10)}">ten</span><span class="word ${this.isMinute(20)}">twenty</span
          ><span class="word ${this.isMinute(5)}">five</span>
        </div>
        <div class="line">
          <span class="word ${this.isDirection('to')}">to</span
          ><span class="word ${this.isDirection('past')}">past</span><span class="word ${this.isHour(1)}">one</span
          ><span class="word ${this.isHour(2)}">two</span>
        </div>
        <div class="line">
          <span class="word ${this.isHour(3)}">three</span><span class="word ${this.isHour(4)}">four</span
          ><span class="word ${this.isHour(5)}">five</span>
        </div>
        <div class="line">
          <span class="word ${this.isHour(6)}">six</span><span class="word ${this.isHour(7)}">seven</span
          ><span class="word ${this.isHour(8)}">eight</span>
        </div>
        <div class="line">
          <span class="word ${this.isHour(9)}">nine</span><span class="word ${this.isHour(10)}">ten</span
          ><span class="word ${this.isHour(11)}">eleven</span>
        </div>
        <div class="line">
          <span class="word ${this.isHour(12)}">twelve</span><span class="word ${this.isMinute(0)}">o'clock</span>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return style;
  }
}
