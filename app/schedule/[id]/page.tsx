import Link from "next/link";

import AppHeader from "../../components/layout/AppHeader";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { schedules } from "../../data/schedules";
import { grades } from "../../data/grades";
import { scheduleTypes } from "../../data/scheduleTypes";
import { players } from "../../data/players";

type ScheduleDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
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

function getTargetPlayers(gradeIds: string[], playerIds: string[]) {
  if (gradeIds.includes("all")) {
    return players;
  }

  const gradeTargetPlayers = players.filter((player) =>
    gradeIds.includes(player.gradeId)
  );

  const playerTargetPlayers = players.filter((player) =>
    playerIds.includes(player.id)
  );

  return [...new Set([...gradeTargetPlayers, ...playerTargetPlayers])];
}

function getLimitDate(schedule: { eventDate: string }) {
  return schedule.eventDate;
}

function isPastLimitDate(schedule: { eventDate: string }) {
  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const limitDate = new Date(`${getLimitDate(schedule)}T00:00:00`);

  return limitDate < todayOnly;
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

export default async function ScheduleDetailPage({
  params,
}: ScheduleDetailPageProps) {
  const { id } = await params;

  const schedule = schedules.find((item) => item.id === id);

  if (!schedule) {
    return (
      <PageContainer>
        <AppHeader title="予定詳細" subtitle="予定が見つかりません" />

        <section className="px-4 py-5">
          <Card>
            <div className="text-lg font-black text-slate-900">
              予定が見つかりません
            </div>

            <Link href="/">
              <Button className="mt-4" fullWidth>
                スケジュールへ戻る
              </Button>
            </Link>
          </Card>
        </section>
      </PageContainer>
    );
  }

  const scheduleType = getScheduleType(schedule.scheduleTypeId);
  const gradeNames = getGradeNames(schedule.targetGradeIds);
  const targetPlayers = getTargetPlayers(
    schedule.attendanceGradeIds,
    schedule.attendancePlayerIds
  );

  const canRegisterAttendance =
    schedule.takesAttendance && targetPlayers.length > 0;

  const locked = isPastLimitDate(schedule);
  const deadlineLabel = formatDateLabel(schedule.answerDeadline);
  const deadlineOver = isPastAnswerDeadline(schedule.answerDeadline);

  return (
    <PageContainer>
      <AppHeader title="予定詳細" subtitle={schedule.dateLabel} />

      <section className="space-y-4 px-4 py-5">
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            {gradeNames.map((grade) => (
              <span
                key={grade}
                className="rounded-md bg-blue-600 px-2 py-1 text-xs font-black text-white"
              >
                {grade}
              </span>
            ))}

            {schedule.joint && (
              <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-black text-slate-800">
                合同
              </span>
            )}

            {!schedule.takesAttendance && (
              <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-black text-slate-700">
                出欠不要
              </span>
            )}

            {locked && (
              <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-black text-slate-700">
                受付終了
              </span>
            )}
          </div>

          <div className="mt-4 text-3xl font-black text-slate-900">
            {scheduleType?.icon ?? "⚽"} {schedule.title}
          </div>

          <div className="mt-5 space-y-3 text-base font-black text-slate-800">
            <div>📅 {schedule.dateLabel}</div>
            <div>🏷️ {scheduleType?.name ?? schedule.scheduleTypeId}</div>
            <div>🕘 {schedule.time}</div>
            <div>📍 {schedule.place}</div>

            {deadlineLabel && schedule.takesAttendance && (
              <div className="text-red-600">⏰ 回答期限：{deadlineLabel}</div>
            )}
          </div>

          {deadlineOver && !locked && schedule.takesAttendance && (
            <div className="mt-4 rounded-xl bg-orange-50 p-3 text-sm font-black leading-6 text-orange-700">
              ⚠️ 回答期限を過ぎています。回答はまだ可能です。
            </div>
          )}
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">持ち物</div>

          <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm font-bold leading-6 text-slate-800">
            {schedule.belongings ?? "持ち物は未登録です。"}
          </div>
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">連絡事項</div>

          <div className="mt-3 rounded-xl bg-gray-50 p-4 text-sm font-bold leading-6 text-slate-800">
            {schedule.note ?? "連絡事項はありません。"}
          </div>
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">出欠</div>

          {locked ? (
            <>
              <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm font-bold leading-6 text-slate-700">
                この予定は終了しているため、出欠は変更できません。
              </div>

              <Button
                className="mt-4 bg-gray-300 text-gray-500"
                fullWidth
                disabled
              >
                出欠を入力する
              </Button>
            </>
          ) : canRegisterAttendance ? (
            <>
              <div className="mt-3 text-sm font-bold text-slate-700">
                出欠は別画面で入力します。
              </div>

              <Link href={`/schedule/${schedule.id}/attendance`}>
                <Button className="mt-4" fullWidth>
                  出欠を入力する
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm font-bold leading-6 text-slate-700">
                この予定は出欠登録の対象外です。
              </div>

              <Button
                className="mt-4 bg-gray-300 text-gray-500"
                fullWidth
                disabled
              >
                出欠を入力する
              </Button>
            </>
          )}
        </Card>

        <Link href="/">
          <Button variant="secondary" fullWidth>
            スケジュールへ戻る
          </Button>
        </Link>
      </section>
    </PageContainer>
  );
}