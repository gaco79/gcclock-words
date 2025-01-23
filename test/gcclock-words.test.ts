import { expect } from 'chai';
import { GcClockWords } from '../src/gcclock-words';
import { DEFAULT_CONFIG } from '../src/const';
import { GcclockWordsCardConfig } from '../src/types/config';

describe('GcClockWords', () => {
  let component: GcClockWords;

  beforeEach(() => {
    component = new GcClockWords();
  });

  describe('Configuration', () => {
    it('should use default config when no config provided', () => {
      component.setConfig({});
      expect(component.config).to.deep.equal(DEFAULT_CONFIG);
    });

    it('should throw error when config is invalid', () => {
      expect(() => component.setConfig(null)).to.throw('Invalid configuration !');
    });

    it('should merge provided config with defaults', () => {
      const customConfig:GcclockWordsCardConfig = {
          highlight_text_color: '#FF0000',
          show_highlight_glow: false,
          type: 'test'
      };
      component.setConfig(customConfig);
      expect(component['config']).to.deep.include(customConfig);
    });
  });

  describe('Time calculations', () => {
    it('should correctly identify hour matches', () => {
      component['currentTime'] = [3, 30];
      expect(component['isHour'](3, undefined)).to.be.true;
      expect(component['isHour'](4, undefined)).to.be.false;
      expect(component['isHour']([2, 3, 4], undefined)).to.be.true;
    });

    it('should handle hour shifts correctly', () => {
      component.currentTime = [3, 35];
      expect(component['isHour'](3, 30)).to.be.false;
      expect(component['isHour'](4, 30)).to.be.true;
    });

    it('should correctly identify minute matches', () => {
      component.currentTime = [3, 25];
      expect(component['isMinute'](25)).to.be.true;
      expect(component['isMinute'](30)).to.be.false;
      expect(component['isMinute']([20, 25, 30])).to.be.true;
    });

    it('should round minutes to nearest 5', () => {
      component.currentTime = [3, 28];
      expect(component['isMinute'](30)).to.be.true;
      component.currentTime = [3, 32];
      expect(component['isMinute'](30)).to.be.true;
    });
  });

  describe('Lifecycle', () => {
    it('should start update timer on connect', () => {
      component.connectedCallback();
      expect(component['timer']).to.not.be.undefined;
    });

    it('should clear timer on disconnect', () => {
      component.connectedCallback();
      component.disconnectedCallback();
      expect(component['timer']).to.be.undefined;
    });
  });

  describe('Rendering', () => {
    it('should return correct card size', () => {
      expect(component.getCardSize()).to.equal(7);
    });
  });
});
