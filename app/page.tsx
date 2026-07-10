"use client";

import Link from "next/link";
import { useState } from "react";

import AppHeader from "./components/layout/AppHeader";
import PageContainer from "./components/layout/PageContainer";
import Card from "./components/ui/Card";
import Calendar from "./components/schedule/Calendar";
import FilterSummary from "./components/schedule/FilterSummary";
import ScheduleList from "./components/schedule/ScheduleList";
import FilterSheet, {
  type FilterValues,
} from "./components/filter/FilterSheet";

import { schedules } from "./data/schedules";
import { grades } from "./data/grades";
import { players } from "./data/players";

import {
  isDefaultVisibleSchedule,
  isGradeFilterVisibleSchedule,
  isPastLimitDate,
} from "./utils/schedule";

const loginPlayerIds = players.map((player) => player.id);

const defaultGradeIds = [
  ...new Set(
    players
      .map((player) => player.gradeId)
      .filter((gradeId) => gradeId !== "")
  ),
];

const initialFilterValues: FilterValues = {
  gradeIds: defaultGradeIds,
};

function getGradeLabel(gradeId: string) {
  const grade = grades.find((item) => item.id === gradeId);
  return grade?.name ?? gradeId;
}

function getFilterChips(gradeIds: string[]) {
  if (gradeIds.includes("all")) {
    return ["全学年"];
  }

  return gradeIds.map((gradeId) => {
    const suffix = defaultGradeIds.includes(gradeId) ? "（所属）" : "";
    return `${getGradeLabel(gradeId)}${suffix}`;
  });
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(12);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValues, setFilterValues] =
    useState<FilterValues>(initialFilterValues);

  const activeGradeIds = filterValues.gradeIds;

  const showAllSchedules = activeGradeIds.includes("all");
  const hasGradeFilter = filterValues.gradeIds.length > 0;

  const filteredSchedules = schedules.filter((schedule) => {
    if (showAllSchedules) {
      return true;
    }

    if (hasGradeFilter) {
      return isGradeFilterVisibleSchedule(
        schedule,
        loginPlayerIds,
        activeGradeIds
      );
    }

    return isDefaultVisibleSchedule(
      schedule,
      loginPlayerIds,
      defaultGradeIds
    );
  });

  const selectedSchedules = filteredSchedules.filter(
    (schedule) => schedule.date === selectedDate
  );

  const eventDates = [
    ...new Set(filteredSchedules.map((schedule) => schedule.date)),
  ];

  const filterChips = getFilterChips(activeGradeIds);

  const answerRequiredCount = filteredSchedules.filter(
    (schedule) => schedule.takesAttendance && !isPastLimitDate(schedule)
  ).length;

  const unreadNewsCount = 1;

  return (
    <PageContainer>
      <AppHeader title="スケジュール" subtitle="予定を確認できます" />

      <section className="space-y-4 px-4 py-5">
        {(answerRequiredCount > 0 || unreadNewsCount > 0) && (
          <div className="space-y-2">
            {answerRequiredCount > 0 && (
              <Link
                href="/attendance"
                className="block rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-black text-orange-700"
              >
                ⚠️ 出欠回答が必要な予定が {answerRequiredCount} 件あります ＞
              </Link>
            )}

            {unreadNewsCount > 0 && (
              <Link
                href="/news"
                className="block rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700"
              >
                📢 未読のお知らせが {unreadNewsCount} 件あります ＞
              </Link>
            )}
          </div>
        )}

        <FilterSummary
          chips={filterChips}
          onOpenFilter={() => setFilterOpen(true)}
        />

        <Card>
          <Calendar
            selectedDate={selectedDate}
            eventDates={eventDates}
            onSelect={setSelectedDate}
          />
        </Card>

        <Card>
          <ScheduleList
            selectedDate={selectedDate}
            schedules={selectedSchedules}
          />
        </Card>
      </section>

      <FilterSheet
        open={filterOpen}
        values={filterValues}
        defaultGradeIds={defaultGradeIds}
        onApply={setFilterValues}
        onClose={() => setFilterOpen(false)}
      />
    </PageContainer>
  );
}