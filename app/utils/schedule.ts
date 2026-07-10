import type { Schedule } from "../types/schedule";

export function isSameMonth(eventDate: string, displayMonth: Date) {
  const date = new Date(`${eventDate}T00:00:00`);

  return (
    date.getFullYear() === displayMonth.getFullYear() &&
    date.getMonth() === displayMonth.getMonth()
  );
}

export function getLimitDate(schedule: Schedule) {
  return schedule.eventDate;
}

export function isPastLimitDate(schedule: Schedule) {
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const limitDate = new Date(`${getLimitDate(schedule)}T00:00:00`);

  return limitDate < todayOnly;
}

export function formatDeadline(deadline?: string) {
  if (!deadline) return "";

  const date = new Date(`${deadline}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function hasGradeTarget(targetGradeIds: string[], gradeIds: string[]) {
  if (targetGradeIds.includes("all")) {
    return true;
  }

  return targetGradeIds.some((gradeId) => gradeIds.includes(gradeId));
}

export function hasPlayerTarget(
  targetPlayerIds: string[],
  playerIds: string[]
) {
  return targetPlayerIds.some((playerId) => playerIds.includes(playerId));
}

export function isAttendanceTarget(
  schedule: Schedule,
  playerId: string,
  playerGradeId: string
) {
  if (!schedule.takesAttendance) {
    return false;
  }

  return (
    hasGradeTarget(schedule.attendanceGradeIds, [playerGradeId]) ||
    hasPlayerTarget(schedule.attendancePlayerIds, [playerId])
  );
}

export function isDefaultVisibleSchedule(
  schedule: Schedule,
  playerIds: string[],
  playerGradeIds: string[]
) {
  return (
    hasGradeTarget(schedule.attendanceGradeIds, playerGradeIds) ||
    hasPlayerTarget(schedule.attendancePlayerIds, playerIds)
  );
}

export function isGradeFilterVisibleSchedule(
  schedule: Schedule,
  playerIds: string[],
  gradeIds: string[]
) {
  return (
    hasGradeTarget(schedule.targetGradeIds, gradeIds) ||
    hasPlayerTarget(schedule.targetPlayerIds, playerIds)
  );
}