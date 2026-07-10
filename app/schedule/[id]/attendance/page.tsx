import Link from "next/link";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import AttendanceForm from "../../../components/attendance/AttendanceForm";

import { scheduleTypes } from "../../../data/scheduleTypes";

import { getLoginPlayers } from "../../../repositories/householdRepository";
import { getGradeName, getPlayerLabel } from "../../../repositories/playerRepository";
import { getSchedule } from "../../../repositories/scheduleRepository";

import {
  formatDeadline,
  isAttendanceTarget,
  isPastLimitDate,
} from "../../../utils/schedule";

type AttendancePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getScheduleType(scheduleTypeId: string) {
  return scheduleTypes.find((item) => item.id === scheduleTypeId);
}

function getGradeNames(gradeIds: string[]) {
  if (gradeIds.includes("all")) {
    return ["全学年"];
  }

  return gradeIds.map((gradeId) => getGradeName(gradeId));
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

export default async function AttendancePage({
  params,
}: AttendancePageProps) {
  const { id } = await params;
  const schedule = getSchedule(id);

  if (!schedule) {
    return (
      <PageContainer>
        <AppHeader title="出欠入力" subtitle="予定が見つかりません" />

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
  const locked = isPastLimitDate(schedule);
  const deadlineLabel = formatDeadline(schedule.answerDeadline);
  const deadlineOver = isPastAnswerDeadline(schedule.answerDeadline);

  const loginPlayers = getLoginPlayers();

  const attendancePlayers = loginPlayers.filter((player) =>
    isAttendanceTarget(schedule, player.id, player.gradeId)
  );

  const playerOptions = attendancePlayers.map((player) => ({
    id: player.id,
    label: getPlayerLabel(player.id),
  }));

  return (
    <PageContainer>
      <AppHeader title="出欠入力" subtitle={schedule.dateLabel} />

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

        {locked ? (
          <Card>
            <div className="text-lg font-black text-slate-900">
              出欠入力不可
            </div>

            <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm font-bold leading-6 text-slate-700">
              この予定は終了しているため、出欠は変更できません。
            </div>
          </Card>
        ) : !schedule.takesAttendance ? (
          <Card>
            <div className="text-lg font-black text-slate-900">
              出欠登録対象外
            </div>

            <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm font-bold leading-6 text-slate-700">
              この予定は出欠登録が不要です。
            </div>
          </Card>
        ) : playerOptions.length > 0 ? (
          <Card>
            <AttendanceForm players={playerOptions} />
          </Card>
        ) : (
          <Card>
            <div className="text-lg font-black text-slate-900">
              出欠登録対象外
            </div>

            <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm font-bold leading-6 text-slate-700">
              この予定は、ログイン中の家庭の選手は出欠対象ではありません。
            </div>
          </Card>
        )}

        <Link href={`/schedule/${schedule.id}`}>
          <Button variant="secondary" fullWidth>
            予定詳細へ戻る
          </Button>
        </Link>
      </section>
    </PageContainer>
  );
}