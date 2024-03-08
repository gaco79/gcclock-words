# Word Clock

<p align="center">
  <a href="https://github.com/custom-components/hacs">
    <img src="https://img.shields.io/badge/HACS-Default-orange.svg" />
  </a>
  <a href="https://github.com/gaco79/gcclock-words">
    <img src="https://img.shields.io/github/v/release/gaco79/gcclock-words" />
  </a>
  <a href="https://github.com/gaco79/gcclock-words">
    <img src="https://img.shields.io/github/commit-activity/m/gaco79/gcclock-words" />
  </a>
  <a href="https://www.buymeacoffee.com/gaco79">
    <img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow" />
  </a>
</p>

<p align="center">A clock for Home Assistant to show the time in words.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock.png" />
</p>

## Install 🏠

:warning: This card is under active development, is not very stable, and may still have many bugs. Please create an issue if you encounter a bug or have a feature request.

### HACS (recommended)

This card is available in [HACS](https://hacs.xyz/) (Home Assistant Community Store).

### Manual install

1. Download and copy `gcclock-words.js` from the [latest release](https://github.com/gaco79/gcclock-words/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` with URL `/local/gcclock-words.js` and type `module`.
3. Add the custom card to your panel and 🚀.

## Configuration ⚙️

### Inspiration

This repository is inspired by [chrisdothtml's codepen](https://codepen.io/chrisdothtml/pen/BQbzoQ) and was initially based on code and development environment from [uptime-card](https://github.com/dylandoamaral/uptime-card).
