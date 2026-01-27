function getPointsForUserID(userID) {
  const user = game.users.get(userID);
  let dPoints = user.getFlag("yzecoriolis", "darknessPoints");
  if (!dPoints) {
    dPoints = {
      value: 0,
    };
  }
  return dPoints;
}

export function getPoints() {
  let total = 0;
  for (const userID of game.users.keys()) {
    let dPoints = getPointsForUserID(userID);
    total += dPoints.value;
  }
  return total;
}

export async function drawTable() {
  const table = await fromUuid(game.CMC.CONFIG.darknessTableUuid);
  const draw = await table.draw({displayChat: false});

  const dPoints = getPoints();
  let content = `${await draw.results[0].getHTML()}`;
  content    += `<p><strong>${game.i18n.localize("CORIOLISMODERNCOMBAT.CurrentDarkness")}</strong>: ${dPoints}</p>`;
  content    += `<div class="cmc-adjust-dp">(<em>${game.i18n.localize("CORIOLISMODERNCOMBAT.AdjustDarkness")}</em>)</div>`;

  await ChatMessage.create({
    content: content,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    sound: CONFIG.sounds.dice,
    speaker: ChatMessage.getSpeaker({alias: game.i18n.localize("CORIOLISMODERNCOMBAT.DarknessBetweenStars")}),
    whisper: game.user.id
  });
}