# Word Clock

![GitHub Release](https://img.shields.io/github/v/release/gaco79/gcclock-words?style=for-the-badge)
![Downloads](https://img.shields.io/github/downloads/gaco79/gcclock-words/total?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gaco79/gcclock-words?style=for-the-badge)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gaco79/gcclock-words/cd.yml?style=for-the-badge)
[![BuyMeACoffee](https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/gaco79)

<p align="center">A clock for Home Assistant to show the time in words.</p>

<p align="center">
  <img height="200px" src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock-en.png" />
  <img height="200px" src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock-de.png" />
  <img height="200px" src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock-nl.png" />
  <img height="200px" src="https://raw.githubusercontent.com/gaco79/gcclock-words/master/images/words-clock-fr.png" />
</p>

## Installation

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

## Configuration

In Home Assistant click `Edit Dashboard`, then `Add Card` and scroll down to find "Custom: Time In Words". All options except language can be configured by the graphical editor.

#### Sample Configuration

```YAML
type: custom:gcclock-words
highlight_text_color: "#dd4b4b"
show_highlight_glow: false
muted_text_brightness: 0.07
```

| Name                    |  Type  |                      Default                      | Values                                                                                                                                                           |
| ----------------------- | :----: | :-----------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `highlight_text_color`  | string | The primary colour from your Home Assistant theme | Any valid hex colour eg "<span style="color:#3366bb">#3366bb</span>", "<span style="color:#00ff33">#00ff33</span>", "<span style="color:#6842a9">#6842a9</span>" |
| `show_highlight_glow`   |  bool  |                       true                        | `true` or `false`                                                                                                                                                |
| `muted_text_brightness` | number |                        0.1                        | Any decimal from 0.0 to 1.0. Sets brightness of "background" words                                                                                               |
| `language`              | string | Your local language, or English if not supported  | `de`, `en-GB`, `fr`, `nl`, `ru`                                                                                                                                  |

## Alternatives

I've also got an analogue clock Home Assistant card available [here](https://github.com/gaco79/clock-simple)

## Development

To develop the card:

- Clone this repository
- Run `docker compose up -d` from the cloned directory
- Run `npm start`
- Browse to `http://localhost:8123/` and configure your home assistant development build
- Add the card to a dashboard as described above

### Inspiration

This repository is inspired by [chrisdothtml's codepen](https://codepen.io/chrisdothtml/pen/BQbzoQ) and was initially based on code and development environment from [uptime-card](https://github.com/dylandoamaral/uptime-card).
