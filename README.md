# Word Clock

![GitHub Release](https://img.shields.io/github/v/release/gaco79/gcclock-words) 
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gaco79/gcclock-words)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gaco79/gcclock-words/cd.yml)
[<img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow">](https://www.buymeacoffee.com/gaco79) 

<p align="center">A clock for Home Assistant to show the time in words.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock.png" />
</p>

## 💾 Install

:warning: This card is under active development and may still have bugs. Future versions may introduce breaking changes. Please create an issue if you encounter a bug or have a feature request.

### HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=gaco79&repository=gcclock-words&category=plugin)

I've submitted a PR to be included in the HACS default repository.

### Manual install

Not recommended.

1. Download and copy `gcclock-words.js` from the [latest release](https://github.com/gaco79/gcclock-words/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` with URL `/local/gcclock-words.js` and type `module`.
3. Add the custom card to your panel and 🚀.

## 📐 Configuration

In Home Assistant click `Edit Dashboard`, then `Add Card` and scroll down to find "Custom: Time In Words". 

### Inspiration

This repository is inspired by [chrisdothtml's codepen](https://codepen.io/chrisdothtml/pen/BQbzoQ) and was initially based on code and development environment from [uptime-card](https://github.com/dylandoamaral/uptime-card).
