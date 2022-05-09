# Home Assistant NHL Card
A Home Assistant frontend custom card for the [ha-nhl](https://github.com/tj335/hacs-nhl) integration.

#### &nbsp;&nbsp;&nbsp;pre

![pre](https://user-images.githubusercontent.com/9123670/138403165-fe83a2f1-7ecd-4b47-8915-17c84d69a8e5.png)

#### &nbsp;&nbsp;&nbsp;in

![in](https://user-images.githubusercontent.com/9123670/138606167-0d6416e4-e58b-454f-8cc3-e67dcbf42372.png)

#### &nbsp;&nbsp;&nbsp;post

![post](https://user-images.githubusercontent.com/9123670/138403233-c61f13d8-6aad-43ac-ae45-213b767d7f96.png)

#### &nbsp;&nbsp;&nbsp;off

![off](https://user-images.githubusercontent.com/9123670/138403291-bbded2aa-c8d4-42f7-b7bf-1578436c1076.png)


## HACS Installation
 - In the HACS UI, click the 3 dots in the upper right
 - Click 'Add Custom Repository'
 - Fill in the repo url https://github.com/tj335/ha-nhl-card and choose 'Lovelace' category.
 - install the custom card
 - Add the following to your resources
```
url: /hacsfiles/ha-nhl-card/ha-nhl-card.js
type: module
```

## Manual Installation
 - Download [ha-nhl-card.js](https://raw.githubusercontent.com/tj335/ha-nhl-card/main/dist/ha-nhl-card.js)
 - Copy to www/community/ha-nhl-card/ (make the ha-nhl-card directory)
 - Add the following to your resources
```
url: /hacsfiles/ha-nhl-card/ha-nhl-card.js
type: module
```

## Options
| Name | Description | Default | Required |  Values |
| --- | --- | --- | --- | --- |
| `entity` | Name of ha-nhl sensor | `sensor.nhl` | Yes  | Valid sensor |
| `outline` | Outline team colors (helpful w/ dark themes) |`false` | No |  `true` `false` |
| `outline_color` | Specifies outline color. | `white` | No |  CSS color or hex value  |

## Examples
```
type: 'custom:nhl-card'
entity: sensor.nhl
outline: true
outline_color: deeppink
```
![example](https://user-images.githubusercontent.com/9123670/138405243-8e42db4f-7d69-40bc-8ea7-624c31a957a9.png)


```
type: 'custom:nhl-card'
entity: sensor.nhl
outline: true
outline_color: '#ffe500'
```
![example2](https://user-images.githubusercontent.com/9123670/138405612-8efbb117-4f4b-4eb9-8ef0-339e9b35c868.png)

## Minimal Required Configuration
```
type: 'custom:nhl-card'
entity: sensor.nhl
```
Where `sensor.nhl` is the sensor name from the [ha-nhl](https://github.com/tj335/hacs-nhl) integration.
