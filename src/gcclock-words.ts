import './editor';
import { LINE_DEFS } from './lang';

import { version } from '../package.json';

import { HomeAssistant, LovelaceCardEditor, navigate } from 'custom-card-helpers';
import { customElement, property, state } from 'lit/decorators.js';
import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';

import { DEFAULT_CONFIG } from './const';
import styles from './style';
import { GcclockWordsCardConfig } from './types/config';

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

  _dblClickTimeout: NodeJS.Timeout | null = null;
  _dblClickDuration = 250;
  _holdTimeout: NodeJS.Timeout | null = null;
  _holdDuration = 500;

  // #region Setup

  /**
   * Called when the state of Home Assistant changes (frequent).
   * @param hass The new hass.
   */
  public set hass(hass: HomeAssistant) {
    this.updateData();
    this._hass = hass;
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

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this._setupEventHandlers();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    this._removeEventHandlers();
  }

  // #endregion

  // #region Event Handlers

  _setupEventHandlers() {
    const card = this.shadowRoot?.querySelector('ha-card');
    if (!card) return;

    card.addEventListener('click', this._onClick.bind(this));

    card.addEventListener('mousedown', this._onMouseDown.bind(this));
    card.addEventListener('mouseup', this._onMouseUp.bind(this));
    card.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
    card.addEventListener('touchend', this._onTouchEnd.bind(this));
  }

  _onClick() {
    if (this._dblClickTimeout) {
      // This is a double click
      clearTimeout(this._dblClickTimeout);
      this._dblClickTimeout = null;
      if (this.config.actions.double_tap_action) {
        this._handleActionConfig(this.config.actions.double_tap_action);
      }
    } else {
      // This might be a single click or first click of a double click
      this._dblClickTimeout = setTimeout(async () => {
        this._dblClickTimeout = null;
        if (this.config.actions.tap_action) {
          await this._handleActionConfig(this.config.actions.tap_action);
        }
      }, this._dblClickDuration); // Wait for potential second click
    }
  }

  _onMouseDown() {
    this._startHoldTimer();
  }

  _onMouseUp() {
    this._clearHoldTimer();
  }

  _onTouchStart() {
    this._startHoldTimer();
  }

  _onTouchEnd() {
    this._clearHoldTimer();
  }

  _startHoldTimer() {
    this._clearHoldTimer();
    this._holdTimeout = setTimeout(() => {
      console.log('hold');
      this._holdTimeout = null;
      if (this.config.hold_action) {
        this._handleActionConfig(this.config.actions.hold_action);
      }
    }, this._holdDuration);
  }

  _clearHoldTimer() {
    if (this._holdTimeout) {
      clearTimeout(this._holdTimeout);
      this._holdTimeout = null;
    }
  }

  async _handleActionConfig(actionConfig) {
    if (!actionConfig) return;
    //console.log('_handleActionConfig', actionConfig);

    switch (actionConfig.action) {
      case 'perform-action':
        if (actionConfig.perform_action) {
          const [domain, service] = actionConfig.perform_action.split('.');
          await this._hass.callService(
            domain,
            service,
            actionConfig.data || {},
            actionConfig.target || {}
          );
        }
        break;
      case 'url':
        if (actionConfig.url_path) {
          window.open(actionConfig.url_path);
        }
        break;
      case 'navigate':
        if (actionConfig.navigation_path) {
          navigate(this, actionConfig.navigation_path);
        }
        break;
      // Add other action handlers as needed
    }
  }

  _removeEventHandlers() {
    const card = this.shadowRoot?.querySelector('ha-card');
    if (!card) return;

    card.removeEventListener('click', this._onClick.bind(this));
    card.removeEventListener('mousedown', this._onMouseDown.bind(this));
    card.removeEventListener('mouseup', this._onMouseUp.bind(this));
    card.removeEventListener('touchstart', this._onTouchStart.bind(this));
    card.removeEventListener('touchend', this._onTouchEnd.bind(this));
  }

  // #endregion

  // #region Clock functions

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

  get min5(): number {
    return 5 * Math.round(this.currentTime[1] / 5);
  }

  // #endregion

  // #region output

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

  // #endregion

  // #region Getters

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

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize(): number {
    return 7;
  }

  // #endregion
}

// Add this type declaration to fix TypeScript error re customCard
declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}

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
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'gcclock-words',
  name: 'Time in Words',
  description: 'Clock displaying Time in Words.',
});
