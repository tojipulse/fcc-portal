import Link from "next/link";

import ScheduleCard from "./ScheduleCard";
import { grades } from "../../data/grades";
import { scheduleTypes } from "../../data/scheduleTypes";
import type { Schedule } from "../../types/schedule";

type ScheduleListProps = {
  selectedDate: number;
  schedules: Schedule[];
};

function getGradeNames(gradeIds: string[]) {
  if (gradeIds.includes("all")) {
    return ["全学年"];
  }

  return gradeIds.map((gradeId) => {
    const grade = grades.find((item) => item.id === gradeId);
    return grade?.name ?? gradeId;
  });
}

function getScheduleType(scheduleTypeId: string) {
  return scheduleTypes.find((item) => item.id === scheduleTypeId);
}

export default function ScheduleList({
  selectedDate,
  schedules,
}: ScheduleListProps) {
  return (
    <>
      <div className="text-lg font-black text-slate-900">
        7/{selectedDate} の予定
      </div>

      <div className="mt-4 space-y-3">
        {schedules.length > 0 ? (
          schedules.map((schedule) => {
            const scheduleType = getScheduleType(schedule.scheduleTypeId);

            return (
              <Link
                key={schedule.id}
                href={`/schedule/${schedule.id}`}
                className="block"
              >
                <ScheduleCard
                  date={schedule.dateLabel}
                  grades={getGradeNames(schedule.targetGradeIds)}
                  title={schedule.title}
                  icon={scheduleType?.icon ?? "⚽"}
                  time={schedule.time}
                  place={schedule.place}
                  joint={schedule.joint}
                />
              </Link>
            );
          })
        ) : (
          <div className="rounded-xl bg-gray-50 p-4 text-center text-sm font-black text-slate-700">
            この日の予定はありません
          </div>
        )}
      </div>
    </>
  );
}