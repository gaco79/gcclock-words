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

  private isHour(hour: boolean | number | number[], shift: number | undefined): boolean {
    const now: number = (this.currentTime[0] + (shift && this.currentTime[1] >= shift ? 1 : 0)) % 12;
    return hour === undefined ? true : (hour instanceof Array ? hour.indexOf(now) !== -1 : hour === now);
  }

  private isMinute(minute: boolean | number | number[]): boolean {
    const now5: number = this.currentTime[1] > 57 ? 0 : 5 * Math.round(this.currentTime[1] / 5);
    return minute === undefined ? true : (minute instanceof Array ? minute.indexOf(now5) !== -1 : minute === now5);
  }

  /**
   * Rendering
   */
  private renderWords(words: object): TemplateResult[] {
    const rendered: TemplateResult[] = [];

    for(const w in words) {
      const conditions = words[w];

      let match = false;
      for(let c = 0; c < conditions.length; c++)
        match = match || conditions[c] === true || (this.isHour(conditions[c].h, conditions[c].minuteshift) && this.isMinute(conditions[c].m));

       rendered.push(html`<div class="word" style="${match ? this.activeStyle : this.inactiveStyle}">${w}</div>`);
    }
    return rendered;
  }

  protected render(): TemplateResult {
    return html`
      <ha-card class="gcclock-words">
        ${(LINE_DEFS[document.documentElement.lang || 'en'] || LINE_DEFS.en).map((line) => html`<div class="line">${
          this.renderWords(line)
        }</div>`)} 
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
