import { gradeFilters } from "./constants";

import type {
  DateScheduleGroup,
  JointDateSelection,
  JointValidationResult,
  ScheduleItem,
} from "./types";

export function buildDateGroups(
  items: ScheduleItem[]
): DateScheduleGroup[] {
  const groupMap = new Map<string, DateScheduleGroup>();

  items.forEach((schedule) => {
    const currentGroup = groupMap.get(schedule.date);

    if (currentGroup) {
      currentGroup.schedules.push(schedule);
      return;
    }

    groupMap.set(schedule.date, {
      date: schedule.date,
      dateLabel: schedule.dateLabel,
      schedules: [schedule],
    });
  });

  return Array.from(groupMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

export function validateJointSchedules(
  selectedSchedules: ScheduleItem[]
): JointValidationResult {
  if (selectedSchedules.length < 2) {
    return {
      canCreate: false,
      messages: ["異なる学年の予定を2件以上選択してください。"],
    };
  }

  const base = selectedSchedules[0];
  const messages: string[] = [];

  if (new Set(selectedSchedules.map((item) => item.gradeId)).size < 2) {
    messages.push("異なる学年の予定を選択してください。");
  }

  if (selectedSchedules.some((item) => item.jointGroupId)) {
    messages.push("すでに合同化されている予定が含まれています。");
  }

  if (selectedSchedules.some((item) => item.typeId !== base.typeId)) {
    messages.push("予定種別が一致していません。");
  }

  if (selectedSchedules.some((item) => item.subTypeId !== base.subTypeId)) {
    messages.push("大会名・リーグ名・イベント名が一致していません。");
  }

  if (selectedSchedules.some((item) => item.placeId !== base.placeId)) {
    messages.push("場所が一致していません。");
  }

  if (selectedSchedules.some((item) => item.startTime !== base.startTime)) {
    messages.push("開始時間が一致していません。");
  }

  if (selectedSchedules.some((item) => item.endTime !== base.endTime)) {
    messages.push("終了時間が一致していません。");
  }

  if (selectedSchedules.some((item) => item.status !== base.status)) {
    messages.push("開催・中止状態が一致していません。");
  }

  return {
    canCreate: messages.length === 0,
    messages,
  };
}

export function buildDateSelections(
  groups: DateScheduleGroup[],
  selectedIds: string[]
): JointDateSelection[] {
  return groups.map((group) => {
    const selectedSchedules = group.schedules.filter((schedule) =>
      selectedIds.includes(schedule.id)
    );

    return {
      date: group.date,
      selectedIds: selectedSchedules.map((schedule) => schedule.id),
      selectedSchedules,
      validation: validateJointSchedules(selectedSchedules),
    };
  });
}

export function getGradeBadgeClassName(gradeId: string) {
  return (
    gradeFilters.find((grade) => grade.id === gradeId)
      ?.selectedClassName ?? "bg-slate-600 text-white"
  );
}