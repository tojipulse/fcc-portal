import { households } from "../data/households";
import { guardians } from "../data/guardians";
import { players } from "../data/players";

const LOGIN_GUARDIAN_ID = "tojima-a1";

export function getLoginGuardian() {
  return guardians.find(
    (guardian) => guardian.id === LOGIN_GUARDIAN_ID
  );
}

export function getLoginHousehold() {
  const guardian = getLoginGuardian();

  if (!guardian) {
    return undefined;
  }

  return households.find(
    (household) => household.id === guardian.householdId
  );
}

export function getLoginPlayers() {
  const household = getLoginHousehold();

  if (!household) {
    return [];
  }

  return players
    .filter(
      (player) =>
        player.householdId === household.id &&
        player.isActive
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);
}