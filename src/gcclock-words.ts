/* eslint-disable @typescript-eslint/no-explicit-any */
import './editor';
import { LINE_DEFS } from './lang';

import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { CSSResult, customElement, html, LitElement, property, state, TemplateResult } from 'lit-element';

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

    //for testing
    //this.currentTime = [0, 30];

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

  private isHour(hour: boolean | number | undefined, shift?: number): boolean {
    if (hour === true || hour === undefined) return true;

    const currentHour = this.currentTime[0];
    const shouldShift = shift !== undefined && this.currentTime[1] >= shift;
    const adjustedHour = (currentHour + (shouldShift ? 1 : 0)) % 12;

    return hour === adjustedHour;
  }

  private isMinute(minute: number[] | undefined): boolean {
    if (minute === undefined) return true;

    const now5: number = this.currentTime[1] > 57 ? 0 : 5 * Math.round(this.currentTime[1] / 5);
    return minute.includes(now5);
  }

  /**
   * Rendering
   */
  private renderWords(
    words: Record<string, { h?: number | boolean; m?: number[]; next_h_from_minute?: number }>,
  ): TemplateResult[] {
    return Object.entries(words).map(([word, condition]) => {
      const isActive = this.isHour(condition.h, condition.next_h_from_minute) && this.isMinute(condition.m);

      return html` <div class="word" style="${isActive ? this.activeStyle : this.inactiveStyle}">${word}</div> `;
    });
  }

  protected render(): TemplateResult {
    console.log(this._language);
    const lineDefs = LINE_DEFS[this._language];

    return html`
      <ha-card class="gcclock-words">
        ${lineDefs.map((line, index) => html`<div class="line" key=${index}>${this.renderWords(line)}</div>`)}
      </ha-card>
    `;
  }

  get _highlightTextColor(): string {
    return this.config.highlight_text_color ?? DEFAULT_CONFIG.highlight_text_color;
  }

  get _mutedTextBrightness(): number {
    return this.config.muted_text_brightness ?? DEFAULT_CONFIG.muted_text_brightness;
  }

  get _language(): string {
    return this.config.language ?? document.documentElement.lang ?? 'en-GB';
  }

  static get styles(): CSSResult {
    return style;
  }
}
