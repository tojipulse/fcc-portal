"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import PageBackButton from "../../../../components/ui/PageBackButton";

type ScheduleStatus = "scheduled" | "canceled";

type ScheduleItem = {
  id: string;
  date: string;
  dateLabel: string;
  gradeId: string;
  gradeLabel: string;
  type: string;
  subType: string;
  place: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
};

type DateScheduleGroup = {
  date: string;
  dateLabel: string;
  schedules: ScheduleItem[];
};

const gradeFilters = [
  {
    id: "all",
    label: "すべて",
    selectedClassName: "bg-slate-800 text-white",
  },
  {
    id: "kids",
    label: "キッズ",
    selectedClassName: "bg-pink-500 text-white",
  },
  {
    id: "1",
    label: "1年",
    selectedClassName: "bg-red-500 text-white",
  },
  {
    id: "2",
    label: "2年",
    selectedClassName: "bg-orange-500 text-white",
  },
  {
    id: "3",
    label: "3年",
    selectedClassName: "bg-yellow-400 text-slate-900",
  },
  {
    id: "4",
    label: "4年",
    selectedClassName: "bg-green-500 text-white",
  },
  {
    id: "5",
    label: "5年",
    selectedClassName: "bg-blue-500 text-white",
  },
  {
    id: "6",
    label: "6年",
    selectedClassName: "bg-purple-500 text-white",
  },
];

const schedules: ScheduleItem[] = [
  {
    id: "schedule-1",
    date: "2026-07-04",
    dateLabel: "7月4日（土）",
    gradeId: "1",
    gradeLabel: "1年",
    type: "通常練習",
    subType: "",
    place: "瑞光小中庭",
    startTime: "08:00",
    endTime: "10:00",
    status: "scheduled",
  },
  {
    id: "schedule-2",
    date: "2026-07-04",
    dateLabel: "7月4日（土）",
    gradeId: "2",
    gradeLabel: "2年",
    type: "通常練習",
    subType: "",
    place: "瑞光小",
    startTime: "08:00",
    endTime: "10:00",
    status: "scheduled",
  },
  {
    id: "schedule-3",
    date: "2026-07-05",
    dateLabel: "7月5日（日）",
    gradeId: "3",
    gradeLabel: "3年",
    type: "TRM",
    subType: "",
    place: "東尾久グラウンド",
    startTime: "09:00",
    endTime: "12:00",
    status: "scheduled",
  },
  {
    id: "schedule-4",
    date: "2026-07-05",
    dateLabel: "7月5日（日）",
    gradeId: "4",
    gradeLabel: "4年",
    type: "大会",
    subType: "トーマス",
    place: "あらスポ",
    startTime: "08:30",
    endTime: "13:30",
    status: "canceled",
  },
];

function buildDateGroups(items: ScheduleItem[]): DateScheduleGroup[] {
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

function getGradeBadgeClassName(gradeId: string) {
  return (
    gradeFilters.find((grade) => grade.id === gradeId)?.selectedClassName ??
    "bg-slate-600 text-white"
  );
}

export default function ScheduleEditListPage() {
  const [selectedGradeId, setSelectedGradeId] = useState("all");

  const filteredSchedules = useMemo(() => {
    if (selectedGradeId === "all") {
      return schedules;
    }

    return schedules.filter(
      (schedule) => schedule.gradeId === selectedGradeId
    );
  }, [selectedGradeId]);

  const dateGroups = useMemo(
    () => buildDateGroups(filteredSchedules),
    [filteredSchedules]
  );

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/schedules" />
      </section>

      <AppHeader
        title="予定個別修正"
        subtitle="修正する予定を選択してください"
      />

      <section className="space-y-6 px-4 py-5">
        <Card>
          <div className="mb-3 text-sm font-black text-slate-700">
            学年フィルター
          </div>

          <div className="flex flex-wrap gap-2">
            {gradeFilters.map((grade) => {
              const selected = selectedGradeId === grade.id;

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setSelectedGradeId(grade.id)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    selected
                      ? grade.selectedClassName
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {grade.label}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-black text-slate-600">
            {dateGroups.length}日分・{filteredSchedules.length}件の予定
          </div>

          {selectedGradeId !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedGradeId("all")}
              className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition active:bg-slate-200"
            >
              フィルター解除
            </button>
          )}
        </div>

        <div className="space-y-6">
          {dateGroups.map((group) => (
            <section
              key={group.date}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="text-lg font-black text-slate-900">
                  📅 {group.dateLabel}
                </div>

                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  {group.schedules.length}件
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {group.schedules.map((schedule) => (
                  <article
                    key={schedule.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${getGradeBadgeClassName(
                              schedule.gradeId
                            )}`}
                          >
                            {schedule.gradeLabel}
                          </span>

                          <span className="text-base font-black text-slate-900">
                            {schedule.type}
                            {schedule.subType
                              ? `（${schedule.subType}）`
                              : ""}
                          </span>
                        </div>

                        <div className="mt-3 text-sm font-bold text-slate-700">
                          📍 {schedule.place}
                        </div>

                        <div className="mt-1 text-sm font-bold text-slate-700">
                          🕘 {schedule.startTime}
                          {schedule.endTime
                            ? `〜${schedule.endTime}`
                            : ""}
                        </div>

                        {schedule.status === "canceled" && (
                          <div className="mt-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
                            ⛔ 中止
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/admin/schedules/edit/${schedule.id}`}
                        className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-black text-white transition active:bg-blue-700"
                      >
                        ✏️ 修正
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {dateGroups.length === 0 && (
            <Card>
              <div className="py-8 text-center">
                <div className="text-3xl">📅</div>

                <div className="mt-3 text-sm font-black text-slate-700">
                  条件に一致する予定はありません
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedGradeId("all")}
                  className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white"
                >
                  すべての予定を表示
                </button>
              </div>
            </Card>
          )}
        </div>
      </section>
    </PageContainer>
  );
}