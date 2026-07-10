import Link from "next/link";

import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import GradeBadge from "../components/schedule/GradeBadge";

import { schedules } from "../data/schedules";
import { grades } from "../data/grades";
import { scheduleTypes } from "../data/scheduleTypes";

function getGradeNames(gradeIds: string[]) {
  if (gradeIds.includes("all")) return ["全学年"];

  return gradeIds.map((gradeId) => {
    const grade = grades.find((item) => item.id === gradeId);
    return grade?.name ?? gradeId;
  });
}

function getScheduleType(scheduleTypeId: string) {
  return scheduleTypes.find((item) => item.id === scheduleTypeId);
}

function isPastSchedule(eventDate: string) {
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const scheduleDate = new Date(`${eventDate}T00:00:00`);
  return scheduleDate < todayOnly;
}

function isPastAnswerDeadline(answerDeadline?: string) {
  if (!answerDeadline) return false;

  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const deadline = new Date(`${answerDeadline}T00:00:00`);
  return deadline < todayOnly;
}

function formatDateLabel(dateText?: string) {
  if (!dateText) return "";

  const date = new Date(`${dateText}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function NewsPage() {
  const todoSchedules = schedules.filter(
    (schedule) => !isPastSchedule(schedule.eventDate)
  );

  return (
    <PageContainer>
      <AppHeader
        title="お知らせ"
        subtitle="クラブからのお知らせ・やること"
      />

      <section className="space-y-6 px-4 py-5">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <div className="text-xl">⚠️</div>
            <div className="text-lg font-black text-slate-900">やること</div>
          </div>

          <div className="space-y-3">
            {todoSchedules.length > 0 ? (
              todoSchedules.map((schedule) => {
                const scheduleType = getScheduleType(schedule.scheduleTypeId);
                const gradeNames = getGradeNames(schedule.targetGradeIds);
                const deadlineLabel = formatDateLabel(schedule.answerDeadline);
                const deadlineOver = isPastAnswerDeadline(
                  schedule.answerDeadline
                );

                return (
                  <Card key={schedule.id}>
                    <div className="text-base font-black text-orange-600">
                      出欠を回答してください
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <div className="text-xl font-black">
                        {schedule.dateLabel}
                      </div>

                      {gradeNames.map((grade) => (
                        <GradeBadge
                          key={grade}
                          label={grade}
                          variant={grade === "全学年" ? "all" : "grade"}
                        />
                      ))}

                      {schedule.joint && (
                        <GradeBadge label="合同" variant="joint" />
                      )}
                    </div>

                    <div className="mt-3 text-lg font-black text-green-700">
                      {scheduleType?.icon ?? "⚽"} {schedule.title}
                    </div>

                    <div className="mt-2 text-sm font-bold text-slate-700">
                      🕘 {schedule.time}
                    </div>

                    <div className="text-sm font-bold text-slate-700">
                      📍 {schedule.place}
                    </div>

                    {deadlineLabel && (
                      <div className="mt-2 text-sm font-black text-red-600">
                        ⏰ 回答期限：{deadlineLabel}
                      </div>
                    )}

                    {deadlineOver && (
                      <div className="mt-3 rounded-xl bg-orange-50 p-3 text-sm font-black text-orange-700">
                        <div>⚠️ 回答期限を過ぎています</div>
                        <div>回答はまだ可能です</div>
                      </div>
                    )}

                    <Link href="/attendance">
                      <Button className="mt-4" fullWidth>
                        回答する
                      </Button>
                    </Link>
                  </Card>
                );
              })
            ) : (
              <Card>
                <div className="text-center text-sm font-black text-slate-600">
                  現在やることはありません
                </div>
              </Card>
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <div className="text-xl">📢</div>
            <div className="text-lg font-black text-slate-900">
              クラブからのお知らせ
            </div>
          </div>

          <div className="space-y-3">
            <Card>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-600">
                  未読
                </span>

                <span className="text-xs font-bold text-slate-500">
                  2026/7/8
                </span>
              </div>

              <div className="mt-3 text-lg font-black text-slate-900">
                夏休みイベントのお知らせ
              </div>

              <div className="mt-2 text-sm font-bold leading-6 text-slate-700">
                7月21日に地区会館で夏休みイベントを開催します。
                BINGO大会やかき氷など楽しいイベントを予定しています。
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                  既読
                </span>

                <span className="text-xs font-bold text-slate-500">
                  2026/7/1
                </span>
              </div>

              <div className="mt-3 text-lg font-black text-slate-900">
                暑さ対策について
              </div>

              <div className="mt-2 text-sm font-bold leading-6 text-slate-700">
                熱中症対策として、飲み物を多めに持参してください。
              </div>
            </Card>
          </div>
        </section>
      </section>
    </PageContainer>
  );
}