import { households } from "../data/households";
import { guardians } from "../data/guardians";
import { players } from "../data/players";

import type { Household } from "../types/household";
import type { Guardian } from "../types/guardian";
import type { Player } from "../types/player";

/**
 * 仮ログインユーザー
 * Ver1では固定。
 * 将来は認証情報から取得する。
 */
const LOGIN_GUARDIAN_ID = "tojima-a1";

export function getLoginGuardian(): Guardian | undefined {
  return guardians.find((guardian) => guardian.id === LOGIN_GUARDIAN_ID);
}

export function getLoginHousehold(): Household | undefined {
  const guardian = getLoginGuardian();

  if (!guardian) {
    return undefined;
  }

  return households.find(
    (household) => household.id === guardian.householdId
  );
}

export function getHouseholdPlayers(
  householdId: string
): Player[] {
  return players
    .filter(
      (player) =>
        player.householdId === householdId &&
        player.isActive
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getLoginPlayers(): Player[] {
  const household = getLoginHousehold();

  if (!household) {
    return [];
  }

  return getHouseholdPlayers(household.id);
}

export function getLoginPlayerIds(): string[] {
  return getLoginPlayers().map((player) => player.id);
}

export function getLoginGradeIds(): string[] {
  return [
    ...new Set(
      getLoginPlayers().map((player) => player.gradeId)
    ),
  ];
}