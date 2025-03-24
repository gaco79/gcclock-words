import './editor';
import { LINE_DEFS } from './lang';

import { version } from '../package.json';

import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { customElement, property, state } from 'lit/decorators.js';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';

import { DEFAULT_CONFIG } from './const';
import styles from './style';
import { GcclockWordsCardConfig } from './types/config';

function loadCSS(url): void {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}
loadCSS('https://fonts.googleapis.com/css2?family=Rubik:wght@500');

/* eslint no-console: 0 */
console.info(
  `%c gcclock-words ${version}`,
  'color: white; background-color:rgb(34, 110, 197); font-weight: 700;'
);

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
    this.updateLanguageStyles();
  }

  private updateLanguageStyles(): void {
    // Remove old language attribute
    const oldLang = this.dataset.lang;
    if (oldLang) {
      this.removeAttribute(`data-lang`);
    }

    // Set new language attribute
    const newLang = this._language.split('-')[0].toLowerCase();
    this.dataset.lang = newLang;

    const lineDefs = LINE_DEFS[this._language] || LINE_DEFS['en-GB'];

    if (lineDefs.styles && this.shadowRoot) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(lineDefs.styles);
      this.shadowRoot.adoptedStyleSheets.push(sheet);
    }
  }

  private updateData(): void {
    if (this.config.hour !== undefined && this.config.minute !== undefined) {
      this.currentTime = [this.config.hour, this.config.minute];
    } else {
      const dateTime = new Date();
      this.currentTime = [dateTime.getHours(), dateTime.getMinutes()];
    }

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

  private isHour(hour?: number[], shift?: number): boolean {
    if (hour === undefined) return true;

    const currentHour = this.currentTime[0];
    const shouldShift = shift !== undefined && this.min5 >= shift;
    const adjustedHour = (currentHour + (shouldShift ? 1 : 0)) % 12;

    return hour.includes(adjustedHour);
  }

  private isMinute(minute?: number[]): boolean {
    if (minute === undefined) return true;
    return minute.includes(this.min5 % 60);
  }

  /**
   * Rendering
   */
  private renderWords(
    words: Record<string, { h?: number[]; m?: number[]; next_h_from_minute?: number }>
  ): TemplateResult[] {
    return Object.entries(words).map(([word, condition]) => {
      const isActive =
        this.isHour(condition.h, condition.next_h_from_minute) && this.isMinute(condition.m);

      return html`<div class="word" style="${isActive ? this.activeStyle : this.inactiveStyle}">
        ${word}
      </div>`;
    });
  }

  protected render(): TemplateResult {
    if (!LINE_DEFS[this._language] && this.config.language) {
      return html`
        <ha-card class="gcclock-words">
          <div>Language '${this._language}' not supported.</div>
          <div>Supported languages: ${Object.keys(LINE_DEFS).join(', ')}</div>
          <div>Please set the correct language in the card configuration.</div>
          <div>
            Consider
            <a href="https://github.com/gaco79/gcclock-words/issues">submitting an issue</a> to
            support your language.
          </div>
        </ha-card>
      `;
    }

    const lineDefs = LINE_DEFS[this._language] || LINE_DEFS['en-GB'];

    return html`
      <ha-card class="gcclock-words">
        ${lineDefs.lines.map(
          (line, index) => html`<div class="line" key=${index}>${this.renderWords(line)}</div>`
        )}
      </ha-card>
    `;
  }

  get min5(): number {
    return 5 * Math.round(this.currentTime[1] / 5);
  }

  get _highlightTextColor(): string {
    return this.config.highlight_text_color ?? DEFAULT_CONFIG.highlight_text_color;
  }

  get _mutedTextBrightness(): number {
    return this.config.muted_text_brightness ?? DEFAULT_CONFIG.muted_text_brightness;
  }

  get _language(): string {
    const lang = this.config.language ?? document.documentElement.lang ?? 'en-GB';
    return lang;
  }

  static styles: CSSResult = styles;
}
