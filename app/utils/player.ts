import { grades } from "../data/grades";

import {
  getPlayer,
  getPlayersByGrade,
} from "../repositories/playerRepository";

export function getPlayerById(playerId: string) {
  return getPlayer(playerId);
}

export function getPlayersInGrade(gradeId: string) {
  return getPlayersByGrade(gradeId);
}

export function getPlayerGradeId(playerId: string) {
  const player = getPlayerById(playerId);
  return player?.gradeId ?? "";
}

export function getGradeName(gradeId: string) {
  if (gradeId === "all") return "全学年";

  const grade = grades.find((item) => item.id === gradeId);
  return grade?.name ?? gradeId;
}

export function getPlayerLabel(playerId: string) {
  const player = getPlayerById(playerId);

  if (!player) return playerId;

  return `${player.firstName}（${getGradeName(player.gradeId)}）`;
}