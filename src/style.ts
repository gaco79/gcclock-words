import { css } from 'lit-element';

const style = css`
  :host {
    --word-spacing: 0.5cqw;
    --line-height: 1.2em;
    --base-font-size: 10cqw;
  }

  .gcclock-words {
    background-color: var(--ha-card-background, var(--card-background-color, #222));
    width: 100%;
    padding: 3rem;
    position: relative;
    box-sizing: border-box;
    box-shadow: var(--ha-card-box-shadow, none);
    border-radius: var(--ha-card-border-radius, 12px);
    border-color: var(--ha-card-border-color, var(--divider-color, #e0e0e0));
    border-width: var(--ha-card-border-width, 1px);
    border-style: solid;
    container-type: inline-size;
    font-family: "Russo One", serif;
    font-weight: 400;
    font-style: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gcclock-words .line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    line-height: var(--line-height);
    width: 100%;
  }

  .gcclock-words .line .word {
    font-size: var(--base-font-size);
    line-height: 120%;
    color: var(--primary-text-color);
    text-transform: uppercase;
    display: block;
    transition:
      opacity 0.2s ease-in-out,
      color 0.2s ease-in-out;
    margin: 0 var(--word-spacing);
  }

  /* Language specific adjustments */
  :host([data-lang='nl']) .gcclock-words .line .word {
    --base-font-size: 11.2cqw;
  }

  :host([data-lang='ru']) .gcclock-words .line .word {
    --base-font-size: 7.5cqw;
  }

  :host([data-lang='de']) .gcclock-words .line .word {
    --base-font-size: 9cqw;
  }

  /* Container queries for responsive sizing */
  @container (max-width: 300px) {
  }
`;

export default style;
