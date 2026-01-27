/**
 * Create a unique id for a status condition.
 * @param {string} status     The primary status.
 * @returns {string}          A unique 16-character id.
 */
export function staticId(status) {
    if (status.length >= 16) return status.substring(0, 16);
    return status.padEnd(16, "0");
}

export function systemTranslationErrata() {
    game.i18n.translations.YZECORIOLIS.DarknessPoints = game.i18n.localize("CORIOLISMODERNCOMBAT.Darkness");
    game.i18n.translations.YZECORIOLIS.FatalInjury = game.i18n.localize("CORIOLISMODERNCOMBAT.FatalInjury");
    game.i18n.translations.YZECORIOLIS.HPBonus = game.i18n.localize("CORIOLISMODERNCOMBAT.HPBonus");
    game.i18n.translations.YZECORIOLIS.HitPoints = game.i18n.localize("CORIOLISMODERNCOMBAT.HitPoints");
    game.i18n.translations.YZECORIOLIS.MPBonus = game.i18n.localize("CORIOLISMODERNCOMBAT.MPBonus");
    game.i18n.translations.YZECORIOLIS.MindPoints = game.i18n.localize("CORIOLISMODERNCOMBAT.MindPoints");
    game.i18n.translations.YZECORIOLIS.MovementRate = game.i18n.localize("CORIOLISMODERNCOMBAT.MovementRate");
}

export const registerSystemSettings = () => {
    /**
     * Track the Rules journal version that was last updated
     */
    game.settings.register("coriolis-modern-combat", "rulesVersionImported", {
        name: "Last Coriolis Modern Combat Rules imported",
        scope: "world",
        config: false,
        type: Number,
        default: 0
    });
    /**
     * Track the Readme journal version that was read last
     */
    game.settings.register("coriolis-modern-combat", "readmeVersionRead", {
        name: "Last Readme Read",
        scope: "client",
        config: false,
        type: Number,
        default: 0
    });
}

export async function importAndShowJournals() {
    const pack = game.packs.get("coriolis-modern-combat.modern_combat_rules");
    if ( game.user.isGM ) {
        const cmcRulesJournal = await fromUuid('JournalEntry.'+CONFIG.CoriolisModernCombat.cmcRulesJournalId);

        if (!cmcRulesJournal || game.settings.get("coriolis-modern-combat", "rulesVersionImported") < CONFIG.CoriolisModernCombat.cmcRulesVersion) {
            await game.journal.importFromCompendium(pack, CONFIG.CoriolisModernCombat.cmcRulesJournalId, undefined, {keepId: true, clearOwnership: false});
            ui.notifications.info(game.i18n.localize("CORIOLISMODERNCOMBAT.RulesImported"));
            await game.settings.set("coriolis-modern-combat", "rulesVersionImported", CONFIG.CoriolisModernCombat.cmcRulesVersion)
            console.log(`Coriolis Modern Combat | Finished importing Coriolis Modern Combat Rules Journal`);
        }
    }
    if (game.settings.get("coriolis-modern-combat", "readmeVersionRead") < CONFIG.CoriolisModernCombat.cmcReadmeVersion) {
        const readme = await pack.getDocument(CONFIG.CoriolisModernCombat.cmcReadmeJournalId);
        await readme.sheet.render({force: true, expanded: false});
        await game.settings.set("coriolis-modern-combat", "readmeVersionRead", CONFIG.CoriolisModernCombat.cmcReadmeVersion)
        console.log(`Coriolis Modern Combat | Finished displaying Readme Journal`);
    }
}
