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

### HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=gaco79&repository=gcclock-words&category=plugin)

### Manual install (Not recommended)

1. Download and copy `gcclock-words.js` from the [latest release](https://github.com/gaco79/gcclock-words/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` 
```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/gcclock-words.js
      type: module
```

## 📐 Configuration

In Home Assistant click `Edit Dashboard`, then `Add Card` and scroll down to find "Custom: Time In Words". 

## Alternatives

I've also got an analogue clock Home Assistant card available [here](https://github.com/gaco79/clock-simple)

## Development

To develop the card:
 * Clone this repository
 * Run `docker compose up -d` from the cloned directory
 * Run `npm start`
 * Browse to `http://localhost:8123/` and configure your home assistant development build
 * Add the card to a dashboard as described above

### Inspiration

This repository is inspired by [chrisdothtml's codepen](https://codepen.io/chrisdothtml/pen/BQbzoQ) and was initially based on code and development environment from [uptime-card](https://github.com/dylandoamaral/uptime-card).
