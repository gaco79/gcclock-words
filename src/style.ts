import { css } from 'lit-element';

const style = css`
  .gcclock-words {
    background-color: var(--ha-card-background, var(--card-background-color, #222));
    width: 100%;
    padding: 65px;
    position: relative;
    box-sizing: border-box;
    box-shadow: var(--ha-card-box-shadow, none);
    border-radius: var(--ha-card-border-radius, 12px);
    border-color: var(--ha-card-border-color, var(--divider-color, #e0e0e0));
    border-width: var(--ha-card-border-width, 1px);
    border-style: solid;
    container-type: inline-size;
  }
  .gcclock-words .line {
    display: flex;
    justify-content: space-between;
  }
  .gcclock-words .line .word {
    font-family: 'Titillium Web', sans-serif;
    font-size: 11.5cqw;
    line-height: 120%;
    color: var(--primary-text-color);
    text-transform: uppercase;
    display: block;
    opacity: 0.1;
    transition: all 0.3s;
  }
`;

export default style;
