import CMCCONFIG from "./config.mjs"
import STATUSEFFECTS from "./components/status-effects.mjs"
import * as darkness from "./components/darkness.mjs";
import * as utils from "./components/utils.mjs";

// Import Modules
import * as documents from "./documents/_module.mjs";

Hooks.once("init", () => {
    console.log(`Coriolis Modern Combat | Initializing`);
    foundry.utils.mergeObject(CONFIG, CMCCONFIG);
    CONFIG.statusEffects = STATUSEFFECTS.map(status => ({...status, _id: utils.staticId(status.id) }));
    CONFIG.specialStatusEffects.DEFEATED = 'brokendamage';
    CONFIG.YZECORIOLIS.ranges = {
        contact: "YZECORIOLIS.ContactRange",
        short: "YZECORIOLIS.ShortRange",
        near: "CORIOLISMODERNCOMBAT.NearRange", // Adding Near range in correct position
        close: "YZECORIOLIS.CloseRange",
        medium: "YZECORIOLIS.MediumRange",
        long: "YZECORIOLIS.LongRange",
        extreme: "YZECORIOLIS.ExtremeRange",
    };

    game.CMC = {};
    game.CMC.CONFIG = CONFIG.CoriolisModernCombat;
    game.CMC.documents = documents;
    game.CMC.darkness = darkness;
    game.CMC.utils = utils;
    
    // Updating Initiative
    CONFIG.Combatant.documentClass = documents.CMCCombatant;

});

Hooks.once("setup", function () {
    console.log(`Coriolis Modern Combat | Setup`);
    game.CMC.utils.systemTranslationErrata();
    game.CMC.utils.registerSystemSettings();
});

Hooks.on("ready", () => {
    console.log(`Coriolis Modern Combat | Ready checks`);
    const supportedLang = game.modules.get("coriolis-modern-combat").languages;
    if (!Array.from(supportedLang).some(l => l.lang === game.i18n.lang)) {
        console.warn(`Coriolis Modern Combat  | Module doesn't support your current language | Defaulting to English`);
        console.warn(`Coriolis Modern Combat  | Raise a ticket on Github with a translation json file`);
    }
    game.CMC.utils.importAndShowJournals();
});

Hooks.on("preCreateChatMessage", async function (chatMessage, data) {
	if (chatMessage.flags.core?.initiativeRoll && chatMessage.speakerActor) {
        const actor = chatMessage.speakerActor;
		let weaponBonus = 0
		let weaponName;
		let weaponFlavor = "";
		actor.items?.forEach((item) => {
			if (item.type === "weapon" && item.system.equipped) {
				if (item.system.initiative > weaponBonus) {
					weaponBonus = item.system.initiative;
					weaponName = item.name;
				}
			}
		});
		if (weaponBonus) {
            weaponFlavor = game.i18n.format("CORIOLISMODERNCOMBAT.InitiativeBonus", { weaponName: weaponName, weaponBonus: weaponBonus });
        }
		data.flavor = `<p>${data.flavor}</p>${weaponFlavor}`;

        const isSurpriseAttacking = [];
        for ( const effect of actor.effects ) {
            const statuses = effect.statuses;
            if ( (statuses.size === 1) && statuses.has('surprise') ) isSurpriseAttacking.push(effect.id);
        }
        if ( isSurpriseAttacking.length ) {
		    data.flavor += game.i18n.format("CORIOLISMODERNCOMBAT.SurpriseAttacking", { actor: actor.name });
        }

		chatMessage.updateSource({'flavor': data.flavor});
	}
});

Hooks.on("combatStart", async function (combat, data) {
	if (data.round === 1 && data.turn === 0) {
		// Add Placeholder Combatant for Darkness
        await combat.createEmbeddedDocuments("Combatant", [{
            name: game.i18n.localize("CORIOLISMODERNCOMBAT.Darkness"),
            'flags.darkness': 1,
            initiative: 0,
            img: "modules/coriolis-modern-combat/assets/images/stars-white-7.webp"
        }])
	}
});

// currentTurn.turn starts at 0
Hooks.on("combatTurnChange", async function (combat, prevTurn, currentTurn) {
    const combatant = combat.combatant;
    // Only trigger by the GM client
    // Only trigger if moving the encounter tracker forward in the same round
    // Only trigger on the start of a turn
    // Only trigger if its the special Darkness combatant
	if (
        game.user.isActiveGM 
        && prevTurn.round === currentTurn.round
        && currentTurn.turn > prevTurn.turn
        && combatant.actorId === null && combatant.flags.darkness
    ) {
        const headline = game.i18n.localize("CORIOLISMODERNCOMBAT.ChaoticDark");
        let diceCount = game.CMC.darkness.getPoints();

        // Roll
        let roll = await (new Roll(`${diceCount}d6`)).evaluate();
        const values = roll.dice[0].results.map(r => r.result);
        const successes = values.filter(r => r === 6).length;

        // Outcome flags ## CUSTOM FOR CHAOS DARKNESS
        let limitedSuccess = false;
        let criticalSuccess = successes >= 2; // Roll Chaos Darkness on 2+ successes
        let failure = successes < 2;

        // Build results object
        const results = {
          successes: successes,
          limitedSuccess: limitedSuccess,
          criticalSuccess: criticalSuccess,
          failure: failure,
          rollData: {}
        };

        // Build tooltip with system-style dice HTML
        const diceLis = values.map(v => {
          return `<li class="roll die d6 dice-${v} dice-face">&nbsp;</li>`;
        }).join("");

        const tooltip = `
          <div class="coriolis-results">
            <section class="tooltip-part">
              <ol class="dice-rolls">
                ${diceLis}
              </ol>
            </section>
          </div>`;

        // Data shaped like a normal attribute roll
        const data = {
          title: headline,
          rollType: "attribute",
          actorType: "character",
          attributeName: game.i18n.localize("CORIOLISMODERNCOMBAT.Darkness"),
          attribute: diceCount,
          modifier: null,
          bonus: 0,
          skillName: null,
          skill: null,
          totalDice: diceCount,
          results: results,
          canPush: false,
          tooltip: tooltip
        };

        const templatePath = "systems/yzecoriolis/templates/sidebar/roll.html";
        const content = await foundry.applications.handlebars.renderTemplate(templatePath, data);

        // Prepare chat message data
        const msgData = {
          user: game.user.id,
          speaker: ChatMessage.getSpeaker({alias: game.i18n.localize("CORIOLISMODERNCOMBAT.DarknessBetweenStars")}),
          type: CONST.CHAT_MESSAGE_STYLES.OTHER,
          sound: CONFIG.sounds.dice
        };
        msgData.content = `<p style="text-align: center; font-style: italic;">${game.i18n.localize("CORIOLISMODERNCOMBAT.DarknessBetweenStars")}..</p>
                           <p style="text-align: center; font-style: italic;">${game.i18n.localize("CORIOLISMODERNCOMBAT.MightManifest")}...</p>`;
        await ChatMessage.create(msgData);
        msgData.content = content;

        // If Dice So Nice is active, add the roll for 3D dice
        if (game.modules.get("dice-so-nice")?.active) {
          msgData.rolls = [roll];
          msgData.flags = { "dice-so-nice": { showRoll: true, blind: true } };
        }

        const msg = await ChatMessage.create(msgData, {rollMode: CONST.DICE_ROLL_MODES.PRIVATE});

        if (game.modules.get("dice-so-nice")?.active) {
            game.dice3d.waitFor3DAnimationByMessageID(msg.id).then(()=> {
                if (criticalSuccess) {
                    game.CMC.darkness.drawTable();
                }
            });
        } else if (criticalSuccess) {
            game.CMC.darkness.drawTable();
        }

    }
});

Hooks.on('renderCoriolisModifierDialog', async (coriolisModifierDialog, html, data) => {
    console.log(`Coriolis Modern Combat | renderCoriolisModifierDialog Hook`);
    if (coriolisModifierDialog.chatOptions?.title === "armor") {
        const actor = ChatMessage.implementation.getSpeakerActor(coriolisModifierDialog.chatOptions.speaker);
        const hasCover = [];
        for ( const effect of actor.effects ) {
            const statuses = effect.statuses;
            if ( (statuses.size === 1) && statuses.has('cover') ) hasCover.push(effect.id);
        }

        if ( hasCover.length ) {
            coriolisModifierDialog.rollData.armorRating = coriolisModifierDialog.rollData.armorRating ?? coriolisModifierDialog.rollData.bonus;
            if (!coriolisModifierDialog.rollData.cover) {
                coriolisModifierDialog.rollData.cover = "4";
                coriolisModifierDialog.rollData.bonus = coriolisModifierDialog.rollData.armorRating + 4;
            }
            const data = {
                groupName: "coverType",
                choices: game.CMC.CONFIG.cover,
                chosen: coriolisModifierDialog.rollData.cover
            }
            const coverHtml = await renderTemplate('modules/coriolis-modern-combat/templates/roll-coverModifiers.hbs', data);
            const buttonsHtml = html.find('div:has(button)').last();
            // Add Cover before the form buttons
            buttonsHtml.before(coverHtml);
            // Save the cover on a change, as it triggers a rerender of the formAppv1
            html.find('input[type=radio]').on('change', e => {
                coriolisModifierDialog.rollData.cover = e.target.value;
                const cover = Number.parseInt(coriolisModifierDialog.rollData.cover) || 0;
                coriolisModifierDialog.rollData.bonus = coriolisModifierDialog.rollData.armorRating + cover;
            });
            coriolisModifierDialog.setPosition();
        }
    }
});

Hooks.on('renderTokenHUD', async (tokenHUD, html, data, options) => {
    html.querySelectorAll("img.effect-control").forEach(img => {
        const label = img.dataset.tooltipText;

        // Prevent double-processing
        if (img.closest(".effect-item")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "effect-item";

        const span = document.createElement("span");
        span.className = "effect-label";
        span.textContent = label;

        // Wrap img
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(span);
    });
    html.querySelectorAll(".effect-item").forEach(wrapper => {
        const img = wrapper.querySelector("img.effect-control");
        if (!img) return;

        wrapper.addEventListener("click", e => {
        if (e.target === img) return;
        img.click();
        });
    });


});

Hooks.on('renderChatMessageHTML', async (chatMessage, html) => {
    html.querySelectorAll("div.dice-formula").forEach(formula => {
        const raw = formula.textContent;              // safer than innerHTML here
        const terms = raw.split(" + ");          // ["1d6", "4[Agility]", "1[Vulcan pistol]", ...]

        const htmlParts = terms.map((t, i) => {
            // color only inner bracket text
            const termHtml = t.replace(/\[([^\]]+)\]/g, '[<span class="formula-tag">$1</span>]');
            // prefix operator for all but first
            const prefix = i === 0 ? "" : '+&nbsp;';
            return `<span class="formula-part">${prefix}${termHtml}</span>`;
        });

        formula.innerHTML = htmlParts.join(" ");
    });
});

Hooks.on('updateActor', async (actor, updates) => {
    if (updates.system?.hitPoints?.value === 0) {
        actor.toggleStatusEffect('brokendamage', {active: true});
    } else if (updates.system?.hitPoints?.value > 0) {
        actor.toggleStatusEffect('brokendamage', {active: false});
    }
    if (updates.system?.mindPoints?.value === 0) {
        actor.toggleStatusEffect('brokenstress', {active: true});
    } else if (updates.system?.mindPoints?.value > 0) {
        actor.toggleStatusEffect('brokenstress', {active: false});
    }
});

Hooks.on('preCreateActiveEffect', async (activeEffect) => {
    if (activeEffect._id === 'dead000000000000') {
        activeEffect.updateSource({"flags.core.overlay": true});
    }
});

// TODO: Possibly add extra behavior so e.g. prone AE is also removed when unconcious is removed
Hooks.on('createActiveEffect', async (activeEffect) => {
    const statusEffect = CONFIG.statusEffects.find(e => e._id === activeEffect._id);
    if (statusEffect && statusEffect.statuses?.length) {
        for (const status of statusEffect.statuses) {
            activeEffect.parent.toggleStatusEffect(status, {active: true});
        }
    }
});