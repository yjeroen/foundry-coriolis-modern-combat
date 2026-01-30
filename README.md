![LOGO](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/logo.jpg?raw=true)

# Foundry VTT - Coriolis Modern Combat 

![Coriolis Modern Combat Module](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/yjeroen/foundry-coriolis-modern-combat/refs/heads/main/module.json&label=Coriolis%20Modern%20Combat%20Module&query=$.version&colorB=blue&logo=sega&logoColor=white)
![FoundryVTT Verified](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/yjeroen/foundry-coriolis-modern-combat/refs/heads/main/module.json&label=FoundryVTT%20Verified&query=$.compatibility.verified&colorB=green&logo=roll20)
![FoundryVTT Supported](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https://raw.githubusercontent.com/yjeroen/foundry-coriolis-modern-combat/refs/heads/main/module.json&label=FoundryVTT%20Supported&colorB=green)

![GitHub Release Date](https://img.shields.io/github/release-date/yjeroen/foundry-coriolis-modern-combat?color=blue)
[![GitHub commits](https://img.shields.io/github/commits-since/yjeroen/foundry-coriolis-modern-combat/latest)](https://github.com/xyjeroen/foundry-coriolis-modern-combat/commits/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
![GitHub contributors](https://img.shields.io/github/contributors/yjeroen/foundry-coriolis-modern-combat)

![FoundryVTT Installs Latest](https://img.shields.io/github/downloads/yjeroen/foundry-coriolis-modern-combat/coriolis-modern-combat-release-1.0.3.zip?label=FoundryVTT%20Installs%20Latest&displayAssetName=false)
![FoundryVTT Installs Previous](https://img.shields.io/github/downloads/yjeroen/foundry-coriolis-modern-combat/coriolis-modern-combat-release-1.0.2.zip?label=FoundryVTT%20Installs%20Previous&displayAssetName=false)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https://forge-vtt.com/api/bazaar/package/coriolis-modern-combat)

_Oye Zenithians and Firstcome!_ This is a module for the RPG System `Coriolis: The Third Horizon`, for [Foundry Virtual Tabletop](http://foundryvtt.com). This module implements the alternative `Modern Combat` rules. 

> _Welcome to the Third Horizon, traveler of the stars. Along your journey, you will experience marvelous things. Ahead lies intrigue and the Dark between the Stars. The struggle for the Horizon has started – only the Icons themselves know how it will end._

This expansion modernizes the `Coriolis: The Third Horizon` combat rules, drawing inspiration from other Year Zero Engine RPGs (such as ALIEN and Coriolis: The Great Dark), as well as community house rules. It remains fully compatible with the Core Rulebook and existing Talents. It expands on the 3-action system with inspirations from Shadowrun and Pathfinder 2E, changes Darkness with random events, adjusts character advancement options, and expands the stress mechanic with panic and mental trauma.

Also check out the (free) PDF at [DriveThruRPG > Free League Workshop > Coriolis - Modern Combat Rules](https://www.drivethrurpg.com/en/product/554761/coriolis-modern-combat-rules?affiliate_id=533040).

## Installation Instructions

To install and use the Coriolis Modern Combat module for Foundry Virtual Tabletop, simply paste the following URL into the 
**Install Module** dialog on the Setup menu of the application.

https://github.com/yjeroen/foundry-coriolis-modern-combat/releases/latest/download/module.json

If you wish to manually install the module, you may do this by cloning the repository or downloading a zip archive from the [Releases Page](https://github.com/yjeroen/foundry-coriolis-modern-combat/releases). Then extract it into your Foundry's `Data/modules/coriolis-modern-combat` folder. 

## Community Contribution

For friendly discussion and questions, you can reach out on the [Year Zero Worlds Discord](https://discord.gg/year-zero-worlds-398697411981344769). You can contribute simply by [reporting](https://github.com/yjeroen/foundry-coriolis-modern-combat/issues) bugs, vote on feature requests, or updating language translation files.

_Are you a data spider or scientist?_ If you have JavaScript, HTML and/or CSS skills, you can take ownership of one of the feature requests by replying on it (to let people know you work on this) and become a collaborator! See: [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request)

## Module Features
- Coriolis & Modern Combat Status Effects. If you have a Cover status effect, you see the Cover bonus options when rolling your armor gear. You automatically gain the Broken By Damage or Broken By Stress effects if your Health or Mind is at 0.
- Critical Injuries and Mental Trauma often have a linked Condition Item in their description. Drag the Condition to your character sheet if/when you are affected by them. Conditions that affect attributes will do this automatically.
- New equipment (E-dose, S-dose) and talents. These can be found in the Items Compendium.
- Near range added for Weapons
- Sheets and UI updated with the Modern Combat naming of things, like "Health" instead of "Health Points".
- Updated Initiative Roll rules.
- Included automated bonuses for your Weapon and if you're Surprise Attacking.
- Updated prettified Initiative chat message
- When Combat starts, a "Darkness" combatant is added to the Combat Tracker, with Initiative 0. When the turn of this combatant starts, an automatic event roll is made for the Darkness between the stars.
- Handy macro's for both the GM and for the Players.
- An Arabian style Google Font is added as Additional Fonts in FoundryVTT.
- The FoundryVTT Pause logo is updated

## Module Screenshots
> Modern Combat Status Effects are available in the Token HUD, and the ones often used in combat have handy toggle macro's.

![Status Effects](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/status-effects.jpg?raw=true)

> Initiative rolls are updated to the Modern Combat rules, with a pretty chat message for clarity.

![Initiative](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/initiative-chatmessage.jpg?raw=true)

> When you have the In Cover effect (you can add it when you use the Take Cover action), you will get an option for the new cover bonuses in the Armor Defense roll.

![Cover](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/cover-bonuses.jpg?raw=true)

> Darkness events can spontaneously appear at the end of a round in Modern Combat. This is completely automated within Foundry!

![Darkness](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/darkness-in-combat.jpg?raw=true)

> Multiple handy macro's have been added for both players and GM, to speed up your game.

![Macros](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/handy-macros.jpg?raw=true)

> One of your players got hit by a Critical Injury, Mental Trauma, or they need to roll for Panic? Use a macro to tell your players to roll with just a button press.

![Macros](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/.github/images/macros-for-player-rolls.jpg?raw=true)

## Patch Notes

See [CHANGELOG](https://github.com/yjeroen/foundry-coriolis-modern-combat/blob/main/CHANGELOG.md)

## Licenses

**Project Licensing:**

- All HTML, CSS and Javascript in this project is licensed under the GNU General Public License.
- Included icons are free-license “Designed by [Freepik](www.freepik.com)” images, edited & customized via Affinity Photo 2 and Affinity Designer 2.
- The included `DrSugiyama` Google Font is licensed under the [Open Font License](https://fonts.google.com/specimen/Dr+Sugiyama/license).

**Content Usage and Licensing:**

- The Coriolis The Third Horizon RPG is made by Free League. This product was created under license of **Free League Workshop**. Coriolis and its logo, are trademarks of Fria Ligan AB. This work contains material that is copyright Fria Ligan AB and/or other authors. Such material is used with permission under the Community Content Agreement for Free League Workshop. All other original material in this work is copyright 2026 by yeroon and published under the Community Content Agreement for Free League Workshop.
- The Cover art is made by AI and afterwards edited & customized via Affinity Photo 2. This will be replaced if I find a better free license artwork, or if the Pay What You Want PDF (DriveThruRPG) creates enough funds.

**Virtual Table Top Platform Licenses:**

- This Module for Foundry Virtual Tabletop is licensed under the [Limited License Agreement for module development 09/02/2020](https://foundryvtt.com/article/license/).

