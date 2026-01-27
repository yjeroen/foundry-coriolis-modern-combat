/**
 * The client-side Combatant document which extends the common BaseCombatant model.
 *
 * @extends Combatant
 * @category Documents
 *
 * @see {@link foundry.documents.Combat}: The Combat document which contains Combatant embedded documents
 * @see {@link foundry.applications.sheets.CombatantConfig}: The application which configures a Combatant
 */
export default class CMCCombatant extends foundry.documents.Combatant {
    /**
     * Modern Combat Initiative
     * @override
     */
    _getInitiativeFormula() {
        let formula = "1d6";
        const agility = this.actor?.system.attributes.agility.value;
        const wits = this.actor?.system.attributes.wits.value;
        if (this.flags.darkness) return "0";
        if (agility <= wits && agility > 0 ) {
            formula += ` + ${agility}[${game.i18n.localize("YZECORIOLIS.AttrAgility")}]`;
        } else if (wits > 0) {
            formula += ` + ${wits}[${game.i18n.localize("YZECORIOLIS.AttrWits")}]`;
        }
        
        let weaponBonus = 0;
        let weaponName;
		this.actor.items.forEach((item) => {
			if (item.type === "weapon" && item.system.equipped) {
				if (item.system.initiative > weaponBonus) {
                    weaponBonus = item.system.initiative;
                    weaponName = item.name;
                }
			}
		});
        if (weaponBonus > 0) {
            formula += ` + ${weaponBonus}[${weaponName}]`;
        }

        const isSurpriseAttacking = [];
        for ( const effect of this.actor.effects ) {
            const statuses = effect.statuses;
            if ( (statuses.size === 1) && statuses.has('surprise') ) isSurpriseAttacking.push(effect.id);
        }
        if ( isSurpriseAttacking.length ) {
            formula += ` + 3[${game.i18n.localize("CORIOLISMODERNCOMBAT.EFFECT.SurpriseAttack")}]`;
        }

        if (this.actor.type === "npc") {
            formula += ` + 0.1[${game.i18n.localize("CORIOLISMODERNCOMBAT.NPC")}]`;
        }
        console.log(`Coriolis Modern Combat  | Calculating formula "${formula}"`);
        return formula;
    }

}