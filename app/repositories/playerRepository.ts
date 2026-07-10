import { grades } from "../data/grades";
import { players } from "../data/players";

export function getPlayer(playerId: string) {
  return players.find((player) => player.id === playerId);
}

export function getPlayers() {
  return [...players].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

export function getActivePlayers() {
  return getPlayers().filter((player) => player.isActive);
}

export function getPlayersByGrade(gradeId: string) {
  return getActivePlayers().filter(
    (player) => player.gradeId === gradeId
  );
}

export function getPlayersByHousehold(
  householdId: string
) {
  return getActivePlayers().filter(
    (player) => player.householdId === householdId
  );
}

export function getPlayerLabel(playerId: string) {
  const player = getPlayer(playerId);

  if (!player) {
    return playerId;
  }

  const grade = grades.find(
    (item) => item.id === player.gradeId
  );

  return `${player.firstName}（${
    grade?.name ?? player.gradeId
  }）`;
}

export function getGradeName(gradeId: string) {
  if (gradeId === "all") {
    return "全学年";
  }

  const grade = grades.find(
    (item) => item.id === gradeId
  );

  return grade?.name ?? gradeId;
}