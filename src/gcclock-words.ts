/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';

import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import {
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';

import { CARD_VERSION, DEFAULT_CONFIG } from './const';
import style from './style';
import { GcclockWordsCardConfig } from './types/config';

function loadCSS(url): void {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
loadCSS('https://fonts.googleapis.com/css?family=Titillium+Web:700');

/* eslint no-console: 0 */
console.info(`%c gcclock-words ${CARD_VERSION}`, 'color: white; background-color:rgb(34, 110, 197); font-weight: 700;');

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
    return document.createElement('gcclock-words-editor');
  }

  @property({ attribute: false }) public _hass!: HomeAssistant;
  @state() private config!: GcclockWordsCardConfig;

  @state() private lastUpdateMinutes = 0;
  @state() private currentTime!: number[];

  private timer?: number;
  @state() activeStyle!: string;
  @state() inactiveStyle!: string;

  /**
   * Called when the state of Home Assistant changes (frequent).
   * @param hass The new hass.
   */
  public set hass(hass: HomeAssistant) {
    this.updateData();
    this._hass = hass;
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
  public setConfig(config: GcclockWordsCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration !');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    this.activeStyle = `color: ${this._highlightTextColor}; opacity: 1;`;

    if (this.config.show_highlight_glow) {
      this.activeStyle += ` text-shadow: 0px 0px 10px ${this._highlightTextColor};`;
    }

    this.inactiveStyle = `opacity: ${this._mutedTextBrightness};`;

    this.updateData();
  }

  private updateData(): void {
    const dateTime = new Date();
    this.currentTime = [dateTime.getHours(), dateTime.getMinutes()];

    // Only request update if minutes changed
    if (this.currentTime[1] != this.lastUpdateMinutes) {
      this.lastUpdateMinutes = this.currentTime[1];

      this.requestUpdate();
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Update time every 20 seconds
    this.timer = window.setInterval(() => {
      this.updateData();
    }, 20000);

    // Initial update
    this.updateData();
  }

  public disconnectedCallback(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    super.disconnectedCallback();
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize(): number {
    return 7;
  }

  private isHour(hour: number): string {
    let timeHour = this.currentTime[0] % 12;
    if (this.currentTime[1] > 32) timeHour++;
    if (timeHour == 0) timeHour = 12;

    return timeHour == hour ? this.activeStyle : this.inactiveStyle;
  }

  private isDirection(direction: string): string {
    const minutes = this.currentTime[1];

    if (direction == 'past' && minutes > 2 && minutes < 28) return this.activeStyle;
    if (direction == 'to' && minutes > 32 && minutes < 58) return this.activeStyle;

    return this.inactiveStyle;
  }

  private isMinute(minute: number): string {
    const time = this.currentTime[1];

    if (this.between(time, 0, 2) && minute == 0) return this.activeStyle;
    if (this.between(time, 3, 8) && minute == 5) return this.activeStyle;
    if (this.between(time, 9, 13) && minute == 10) return this.activeStyle;
    if (this.between(time, 14, 18) && minute == 15) return this.activeStyle;
    if (this.between(time, 19, 23) && minute == 20) return this.activeStyle;
    if (this.between(time, 24, 27) && (minute == 20 || minute == 5)) return this.activeStyle;
    if (this.between(time, 28, 32) && minute == 30) return this.activeStyle;
    if (this.between(time, 33, 37) && (minute == 20 || minute == 5)) return this.activeStyle;
    if (this.between(time, 38, 42) && minute == 20) return this.activeStyle;
    if (this.between(time, 43, 47) && minute == 15) return this.activeStyle;
    if (this.between(time, 48, 53) && minute == 10) return this.activeStyle;
    if (this.between(time, 54, 57) && minute == 5) return this.activeStyle;
    if (this.between(time, 58, 60) && minute == 0) return this.activeStyle;

    return this.inactiveStyle;
  }

  private between(x, min, max): boolean {
    return x >= min && x <= max;
  }

  /**
   * Rendering
   */
  protected render(): TemplateResult {
    return html`
      <ha-card class="gcclock-words">
        <div class="line">
          <span class="word" style="${this.activeStyle}">it's</span
          ><span class="word" style="${this.isMinute(15)}">quarter</span
          ><span class="word" style="${this.isMinute(30)}">half</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isMinute(10)}">ten</span
          ><span class="word" style="${this.isMinute(20)}">twenty</span
          ><span class="word" style="${this.isMinute(5)}">five</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isDirection('to')}">to</span
          ><span class="word" style="${this.isDirection('past')}">past</span>
          <span class="word" style="${this.isHour(1)}">one</span>
          <span class="word" style="${this.isHour(2)}">two</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isHour(3)}">three</span>
          <span class="word" style="${this.isHour(4)}">four</span
          ><span class="word" style="${this.isHour(5)}">five</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isHour(6)}">six</span
          ><span class="word" style="${this.isHour(7)}">seven</span
          ><span class="word" style="${this.isHour(8)}">eight</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isHour(9)}">nine</span>
          <span class="word" style="${this.isHour(10)}">ten</span
          ><span class="word" style="${this.isHour(11)}">eleven</span>
        </div>
        <div class="line">
          <span class="word" style="${this.isHour(12)}">twelve</span>
          <span class="word" style="${this.isMinute(0)}">o'clock</span>
        </div>
      </ha-card>
    `;
  }

  get _highlightTextColor(): string {
    return this.config.highlight_text_color ?? DEFAULT_CONFIG.highlight_text_color;
  }

  get _mutedTextBrightness(): number {
    return this.config.muted_text_brightness ?? DEFAULT_CONFIG.muted_text_brightness;
  }

  static get styles(): CSSResult {
    return style;
  }
}
